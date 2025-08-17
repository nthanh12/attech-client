import api from "../api";
import { getApiBaseUrl } from "../config/apiConfig";

// Get all product with pagination - matches BE format exactly
export async function fetchProduct(pageIndex = 1, pageSize = 10) {
  try {
    const response = await api.get("/api/product/find-all", {
      params: { pageIndex, pageSize },
    });

    // Handle BE response format: camelCase
    if (response.data && response.data.status === 1 && response.data.data) {
      const dataObj = response.data.data;
      const result = {
        items: dataObj.items || [],
        totalCount: dataObj.totalItems || 0,
        totalPages: Math.ceil((dataObj.totalItems || 0) / pageSize),
        currentPage: pageIndex,
        pageSize,
      };
      return result;
    }

    throw new Error("Invalid response format");
  } catch (error) {
    throw error;
  }
}

// Get product categories - matches BE ProductCategoryController
export async function fetchProductCategories() {
  try {
    const response = await api.get("/api/product-category/find-all");

    if (
      response.data &&
      response.data.status === 1 &&
      response.data.data &&
      response.data.data.items
    ) {
      return response.data.data.items;
    }

    throw new Error("Invalid categories response");
  } catch (error) {
    console.error("❌ fetchProductCategories error:", error);
    throw error;
  }
}

// Get product by ID - for editing (returns DetailProductDto)
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/api/product/find-by-id/${id}`);

    // Handle API format
    if (response.data && response.data.status === 1 && response.data.data) {
      return response.data.data; // Return DetailProductDto directly
    }

    throw new Error("Invalid product detail response");
  } catch (error) {
    throw error;
  }
};

// Create product - UPDATED to use new attachment system
export const createProduct = async (productData) => {
  try {
    // Step 1: Prepare data to match CreateProductDto exactly
    const formData = new FormData();

    // Required fields
    formData.append("titleVi", productData.titleVi || "");
    formData.append("titleEn", productData.titleEn || "");
    formData.append(
      "productCategoryId",
      String(productData.productCategoryId || "")
    );
    formData.append("contentVi", productData.contentVi || "");
    formData.append("contentEn", productData.contentEn || "");
    formData.append("descriptionVi", productData.descriptionVi || "");
    formData.append("descriptionEn", productData.descriptionEn || "");
    formData.append("slugVi", productData.SlugVi || "");
    formData.append("slugEn", productData.SlugEn || "");
    formData.append(
      "isOutstanding",
      productData.isOutstanding ? "true" : "false"
    );

    // Ensure Status is a valid integer (1 for active, 0 for inactive)
    const statusValue =
      typeof productData.Status === "number"
        ? productData.Status
        : productData.Status === "active"
        ? 1
        : productData.Status === "inactive"
        ? 0
        : 1;
    formData.append("Status", String(statusValue));

    // Ensure timePosted is valid ISO string
    const timePosted = productData.timePosted || new Date().toISOString();
    formData.append("timePosted", timePosted);

    // Step 2: Handle attachments using new system
    if (productData.FeaturedImageId) {
      formData.append("FeaturedImageId", String(productData.FeaturedImageId));
    }

    const attachmentIds = productData.attachmentIds;
    if (attachmentIds && attachmentIds.length > 0) {
      attachmentIds.forEach((id) => {
        formData.append("attachmentIds", String(id));
      });
    }

    const response = await api.post("/api/product/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 300000, // 5 minutes
    });

    // Handle BE response format
    if (response.data && response.data.status === 1) {
      return response.data;
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update product - UPDATED to use new attachment system
export const updateProduct = async (id, productData) => {
  try {
    const formData = new FormData();

    // Required ID
    formData.append("Id", String(id));

    // All fields from UpdateProductDto
    formData.append("titleVi", productData.titleVi || "");
    formData.append("titleEn", productData.titleEn || "");
    formData.append(
      "productCategoryId",
      String(productData.productCategoryId || "")
    );
    formData.append("contentVi", productData.contentVi || "");
    formData.append("contentEn", productData.contentEn || "");
    formData.append("descriptionVi", productData.descriptionVi || "");
    formData.append("descriptionEn", productData.descriptionEn || "");
    formData.append("slugVi", productData.SlugVi || "");
    formData.append("slugEn", productData.SlugEn || "");
    formData.append(
      "isOutstanding",
      productData.isOutstanding ? "true" : "false"
    );

    // Ensure Status is a valid integer (1 for active, 0 for inactive)
    const statusValue =
      typeof productData.Status === "number"
        ? productData.Status
        : productData.Status === "active"
        ? 1
        : productData.Status === "inactive"
        ? 0
        : 1;
    formData.append("Status", String(statusValue));

    // Ensure timePosted is valid ISO string
    const timePosted = productData.timePosted || new Date().toISOString();
    formData.append("timePosted", timePosted);

    // Handle attachments
    if (productData.FeaturedImageId) {
      formData.append("FeaturedImageId", String(productData.FeaturedImageId));
    }

    const attachmentIds = productData.attachmentIds;
    if (attachmentIds && attachmentIds.length > 0) {
      attachmentIds.forEach((id) => {
        formData.append("attachmentIds", String(id));
      });
    }

    const response = await api.put("/api/product/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 300000,
    });

    // Handle BE response format
    if (response.data && response.data.status === 1) {
      return response.data;
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/api/product/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ============================================================
// ATTACHMENT API SERVICE - NEW: Using /api/attachments
// ============================================================

// Upload file temporarily - returns attachment ID
export const uploadFile = async (file, relationType = "image") => {
  try {
    const formData = new FormData();
    formData.append("File", file);
    formData.append("RelationType", relationType);

    const response = await api.post("/api/attachments/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 300000,
    });

    // Handle API format
    if (response.data && response.data.status === 1) {
      return response.data.data; // Returns {id, previewUrl, fileName, etc}
    }

    throw new Error("Upload failed");
  } catch (error) {
    throw error;
  }
};

// ============================================================
// CHUYÊN DỤNG: UPLOAD ẢNH ĐẠI DIỆN
// ============================================================
export const uploadFeaturedImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append("Image", imageFile);

    const response = await api.post(
      "/api/attachments/upload-featured",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 300000,
      }
    );

    // Handle API format
    if (response.data && response.data.status === 1) {
      return response.data.data;
    }

    throw new Error("Featured image upload failed");
  } catch (error) {
    throw error;
  }
};

// ============================================================
// CHUYÊN DỤNG: UPLOAD ALBUM ẢNH (NHIỀU ẢNH CÙNG LÚC)
// ============================================================
export const uploadAlbumImages = async (imageFiles) => {
  try {
    const formData = new FormData();

    // Append multiple image files
    imageFiles.forEach((file) => {
      formData.append("Images", file);
    });

    const response = await api.post("/api/attachments/upload-album", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 600000, // 10 minutes for multiple files
    });

    // Handle API format
    if (response.data && response.data.status === 1) {
      return response.data.data; // BulkUploadResponseDto
    }

    throw new Error("Album upload failed");
  } catch (error) {
    throw error;
  }
};

// ============================================================
// CHUYÊN DỤNG: UPLOAD FILE ĐÍNH KÈM (NHIỀU FILE BẤT KỲ)
// ============================================================
export const uploadAttachmentFiles = async (files) => {
  try {
    const formData = new FormData();

    // Append multiple files of any type
    files.forEach((file) => {
      formData.append("Files", file);
    });

    const response = await api.post(
      "/api/attachments/upload-attachments",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 600000, // 10 minutes for multiple files
      }
    );

    // Handle API format
    if (response.data && response.data.status === 1) {
      return response.data.data; // BulkUploadResponseDto
    }

    throw new Error("Attachment upload failed");
  } catch (error) {
    throw error;
  }
};

// ============================================================
// BULK UPLOAD TỔNG QUÁT
// ============================================================
export const bulkUploadFiles = async (files, relationType = "album") => {
  try {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("Files", file);
    });
    formData.append("RelationType", relationType);

    const response = await api.post("/api/attachments/bulk-upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 600000,
    });

    // Handle API format
    if (response.data && response.data.status === 1) {
      return response.data.data; // BulkUploadResponseDto
    }

    throw new Error("Bulk upload failed");
  } catch (error) {
    throw error;
  }
};

// Get file URL by attachment ID
export const getAttachmentUrl = (attachmentId) => {
  if (!attachmentId) return null;

  // Backend runs on configured API URL, not frontend localhost:3000
  const baseUrl = getApiBaseUrl();

  // Use the original endpoint that was working
  const url = `${baseUrl}/api/attachments/${attachmentId}`;

  return url;
};

// Get attachments by entity
export const getAttachmentsByEntity = async (objectType, objectId) => {
  try {
    const response = await api.get(
      `/api/attachments/entity/${objectType}/${objectId}`
    );

    // Handle API format
    if (response.data && response.data.status === 1) {
      const dataObj = response.data.data;
      return dataObj || [];
    }

    return [];
  } catch (error) {
    return [];
  }
};

// Delete attachment
export const deleteAttachment = async (attachmentId) => {
  try {
    const response = await api.delete(`/api/attachments/${attachmentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ============================================================
// NEWS CATEGORY API
// ============================================================

export const getProductCategories = async () => {
  try {
    const response = await api.get("/api/product-category/find-all");

    // Handle API format
    if (response.data && response.data.status === 1) {
      const dataObj = response.data.data;
      return dataObj?.items || [];
    }

    return [];
  } catch (error) {
    throw error;
  }
};

export const createProductCategory = async (data) => {
  try {
    const response = await api.post("/api/product-category/create", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProductCategory = async (data) => {
  try {
    const response = await api.put("/api/product-category/update", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProductCategory = async (id) => {
  try {
    const response = await api.delete(`/api/product-category/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ============================================================
// SPECIAL: UPLOAD CONTENT IMAGE FOR TINYMCE
// ============================================================
export const uploadContentImage = async (file, callback, failure) => {
  try {
    const result = await uploadFile(file, "content");
    const imageUrl = `${getApiBaseUrl()}${result.previewUrl}`;

    callback(imageUrl);
  } catch (error) {
    failure("Upload failed: " + error.message);
  }
};
