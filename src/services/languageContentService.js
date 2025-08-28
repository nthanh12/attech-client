import api from "../api";

// Cache categories để tránh gọi API nhiều lần
let cachedCategories = null;

// Get all language contents with pagination and filters
export async function fetchLanguageContents(pageNumber = 1, pageSize = 20, keyword = "", filters = {}, sortConfig = null) {
  try {
    const params = {
      pageNumber,
      pageSize,
      keyword
    };

    // Add sorting if provided
    if (sortConfig?.key) {
      params.sortBy = sortConfig.key;
      params.sortDirection = sortConfig.direction || 'desc';
    }

    // Add filters if provided
    if (filters.category) {
      // If category is a number (ID), use it directly
      // If category is a string (name), find the corresponding ID from categories API
      if (typeof filters.category === 'number') {
        params.categoryId = filters.category;
      } else if (typeof filters.category === 'string') {
        try {
          // Get categories to map name to ID (with caching)
          if (!cachedCategories) {
            cachedCategories = await fetchLanguageContentCategories();
          }
          console.log('🏷️ Available categories:', cachedCategories);
          console.log('🔍 Looking for category:', filters.category);
          
          const categoryItem = cachedCategories.find(cat => cat.name === filters.category);
          if (categoryItem && categoryItem.id) {
            params.categoryId = categoryItem.id;
            console.log('✅ Mapped category name to ID:', filters.category, '→', categoryItem.id);
          } else {
            console.warn('❌ Category not found:', filters.category);
          }
        } catch (err) {
          console.warn('Failed to map category, skipping filter:', err);
          // Skip category filter if mapping fails
        }
      }
    }

    const response = await api.get("/api/language-contents/find-all", { params });

    // Handle BE response format
    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      const dataObj = response.data.data;
      const result = {
        items: dataObj.items || [],
        totalItems: dataObj.totalItems || 0,
        totalPages: Math.ceil((dataObj.totalItems || 0) / pageSize),
        currentPage: dataObj.page || pageNumber,
        pageSize: dataObj.pageSize || pageSize,
      };
      return result;
    }

    throw new Error("Invalid response format");
  } catch (error) {
    throw error;
  }
}

// Get language content categories
export async function fetchLanguageContentCategories() {
  try {
    const response = await api.get("/api/language-content-categories/find-all");
    
    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data &&
      response.data.data.items
    ) {
      return response.data.data.items;
    }
    
    // Return default categories if API fails
    return [
      { id: 1, name: 'common', displayName: 'Common' },
      { id: 2, name: 'navigation', displayName: 'Navigation' },
      { id: 3, name: 'auth', displayName: 'Authentication' },
      { id: 4, name: 'admin', displayName: 'Admin' },
      { id: 5, name: 'frontend', displayName: 'Frontend' },
      { id: 6, name: 'validation', displayName: 'Validation' },
      { id: 7, name: 'errors', displayName: 'Errors' }
    ];
  } catch (error) {
    console.error("Error fetching language content categories:", error);
    // Return default categories on error
    return [
      { id: 1, name: 'common', displayName: 'Common' },
      { id: 2, name: 'navigation', displayName: 'Navigation' },
      { id: 3, name: 'auth', displayName: 'Authentication' },
      { id: 4, name: 'admin', displayName: 'Admin' },
      { id: 5, name: 'frontend', displayName: 'Frontend' },
      { id: 6, name: 'validation', displayName: 'Validation' },
      { id: 7, name: 'errors', displayName: 'Errors' }
    ];
  }
}

// Create new language content
export async function createLanguageContent(contentData) {
  try {
    const response = await api.post("/api/language-contents/create", contentData);
    
    if (response.data && response.data.status === 1) {
      return response.data.data;
    }
    
    throw new Error(response.data?.message || "Create failed");
  } catch (error) {
    throw error;
  }
}

// Update language content
export async function updateLanguageContent(id, contentData) {
  try {
    const response = await api.put(`/api/language-contents/update/${id}`, contentData);
    
    if (response.data && response.data.status === 1) {
      return response.data.data;
    }
    
    throw new Error(response.data?.message || "Update failed");
  } catch (error) {
    throw error;
  }
}

// Delete language content
export async function deleteLanguageContent(id) {
  try {
    const response = await api.delete(`/api/language-contents/delete/${id}`);
    
    if (response.data && response.data.status === 1) {
      return response.data.data;
    }
    
    throw new Error(response.data?.message || "Delete failed");
  } catch (error) {
    throw error;
  }
}

// Get single language content by ID
export async function fetchLanguageContentById(id) {
  try {
    const response = await api.get(`/api/language-contents/find-by-id/${id}`);
    
    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data
    ) {
      return response.data.data;
    }
    
    throw new Error("Language content not found");
  } catch (error) {
    throw error;
  }
}

// Get translations for i18next (export format)  
export async function fetchTranslationsForI18next(language = 'vi') {
  try {
    console.log(`🔄 Fetching ${language} translations from API...`);
    
    // Get all language contents with pagination (BE có limit pageSize)
    let allTranslations = {};
    let currentPage = 1;
    const pageSize = 100; // Safe pageSize
    let hasMorePages = true;
    
    while (hasMorePages) {
      const response = await api.get("/api/language-contents/find-all", { 
        params: { 
          pageNumber: currentPage, 
          pageSize: pageSize, 
          keyword: "" 
          // Không gửi categoryId để lấy tất cả
        } 
      });
      
      if (response.data && response.data.status === 1 && response.data.data) {
        const items = response.data.data.items || [];
        const totalItems = response.data.data.totalItems || 0;
        
        // Convert to nested object format for i18next
        items.forEach(item => {
          const value = language === 'vi' ? item.valueVi : item.valueEn;
          if (value) {
            // Handle nested keys like "auth.login" -> { auth: { login: "value" } }
            const keys = item.contentKey.split('.');
            let current = allTranslations;
            
            for (let i = 0; i < keys.length - 1; i++) {
              if (!current[keys[i]]) {
                current[keys[i]] = {};
              }
              current = current[keys[i]];
            }
            
            current[keys[keys.length - 1]] = value;
          }
        });
        
        // Check if there are more pages
        const totalPages = Math.ceil(totalItems / pageSize);
        hasMorePages = currentPage < totalPages;
        currentPage++;
        
        console.log(`📄 Loaded page ${currentPage - 1}/${totalPages}, ${items.length} items`);
      } else {
        hasMorePages = false;
        console.error("Invalid response format");
      }
    }
    
    console.log(`✅ Total ${language} translations loaded:`, Object.keys(allTranslations).length, 'categories');
    return allTranslations;
  } catch (error) {
    console.error("❌ Error fetching translations for i18next:", error);
    console.error("Request details:", error.config);
    console.error("Response details:", error.response?.data);
    
    // Return empty object on error to prevent i18next from breaking
    return {};
  }
}

// Get language content statistics
export async function fetchLanguageContentStats() {
  try {
    const response = await api.get("/api/language-contents/stats");
    
    if (response.data && response.data.status === 1) {
      return response.data.data;
    }
    
    return {
      total: 0,
      byCategory: {},
      completionRate: { vi: 0, en: 0 }
    };
  } catch (error) {
    console.error("Error fetching language content stats:", error);
    return {
      total: 0,
      byCategory: {},
      completionRate: { vi: 0, en: 0 }
    };
  }
}