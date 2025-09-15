class I18nManagerService {
  constructor() {
    this.viPath = '/src/i18n/locales/vi.json';
    this.enPath = '/src/i18n/locales/en.json';
  }

  // Load translation files
  async loadTranslations() {
    try {
      const [viResponse, enResponse] = await Promise.all([
        fetch(this.viPath),
        fetch(this.enPath)
      ]);

      const viData = await viResponse.json();
      const enData = await enResponse.json();

      return { vi: viData, en: enData };
    } catch (error) {throw new Error('Failed to load translation files');
    }
  }

  // Analyze duplicate keys and sections
  analyzeDuplicates(data) {
    const duplicates = [];
    const seenSections = new Map();
    const seenValues = new Map();

    // Find duplicate sections (like multiple "auth" or "frontend" sections)
    this._findDuplicateSections(data, '', seenSections, duplicates);
    
    // Find duplicate values
    this._findDuplicateValues(data, '', seenValues, duplicates);

    return duplicates;
  }

  // Find sections that appear multiple times by analyzing JSON structure
  _findDuplicateSections(obj, path = '', seenSections, duplicates) {
    // For JSON files with duplicate keys, we need to detect structural issues
    // This is a special case where the JSON parser would have already merged duplicates
    // So we detect potential issues by content similarity and naming patterns
    
    const sectionKeys = Object.keys(obj);
    
    // Check for common duplicate patterns based on known issues
    this._detectCommonDuplicates(obj, duplicates);
    
    // Recursive check for nested objects
    Object.keys(obj).forEach(key => {
      const currentPath = path ? `${path}.${key}` : key;
      const value = obj[key];
      
      if (typeof value === 'object' && value !== null) {
        this._findDuplicateSections(value, currentPath, seenSections, duplicates);
      }
    });
  }
  
  // Detect common duplicate patterns
  _detectCommonDuplicates(obj, duplicates) {
    // Check for auth section duplicates
    if (obj.auth) {
      const authKeys = Object.keys(obj.auth);
      
      // Check if auth section has both login form fields AND user auth fields
      const hasLoginForm = authKeys.some(key => ['title', 'username', 'password', 'remember'].includes(key));
      const hasUserAuth = authKeys.some(key => ['userLogin', 'rememberMe', 'loggingIn'].includes(key));
      
      if (hasLoginForm && hasUserAuth) {
        duplicates.push({
          type: 'section',
          key: 'auth',
          paths: ['auth.login', 'auth.userAuth'],
          content: obj.auth,
          severity: 'high',
          description: 'Auth section contains both login form and user authentication keys'
        });
      }
    }
    
    // Check for frontend section issues
    if (obj.frontend) {
      const frontendKeys = Object.keys(obj.frontend);
      
      // Check if frontend has conflicting structures
      const hasHomeSection = frontendKeys.includes('home');
      const hasDirectPages = frontendKeys.some(key => ['news', 'products', 'services'].includes(key));
      
      if (hasHomeSection && hasDirectPages) {
        duplicates.push({
          type: 'section',
          key: 'frontend',
          paths: ['frontend.home', 'frontend.pages'],
          content: obj.frontend,
          severity: 'medium',
          description: 'Frontend section has mixed structure (home section + direct pages)'
        });
      }
    }
  }

  // Find values that are exactly the same
  _findDuplicateValues(obj, path = '', seenValues, duplicates) {
    Object.keys(obj).forEach(key => {
      const currentPath = path ? `${path}.${key}` : key;
      const value = obj[key];

      if (typeof value === 'string') {
        if (seenValues.has(value)) {
          const existingPath = seenValues.get(value);
          duplicates.push({
            type: 'value',
            key: currentPath,
            paths: [existingPath, currentPath],
            content: value,
            severity: 'medium'
          });
        } else {
          seenValues.set(value, currentPath);
        }
      } else if (typeof value === 'object' && value !== null) {
        this._findDuplicateValues(value, currentPath, seenValues, duplicates);
      }
    });
  }

  // Optimize structure by merging duplicates
  optimizeStructure(data) {
    const optimized = JSON.parse(JSON.stringify(data)); // Deep clone

    // Merge duplicate auth sections
    optimized.auth = this._mergeAuthSections(optimized);

    // Merge duplicate frontend sections  
    optimized.frontend = this._mergeFrontendSections(optimized);

    // Remove empty sections
    this._removeEmptySections(optimized);

    // Sort keys alphabetically
    return this._sortKeys(optimized);
  }

  // Merge all auth-related sections
  _mergeAuthSections(data) {
    const merged = {};
    const authKeys = [];

    Object.keys(data).forEach(key => {
      if (key === 'auth' || key.includes('auth')) {
        if (typeof data[key] === 'object') {
          Object.assign(merged, data[key]);
          if (key !== 'auth') {
            authKeys.push(key); // Mark for deletion
          }
        }
      }
    });

    // Remove duplicate auth sections
    authKeys.forEach(key => {
      delete data[key];
    });

    return Object.keys(merged).length > 0 ? merged : data.auth || {};
  }

  // Merge all frontend-related sections
  _mergeFrontendSections(data) {
    const merged = {};
    const frontendKeys = [];

    Object.keys(data).forEach(key => {
      if (key === 'frontend') {
        if (typeof data[key] === 'object') {
          // Handle nested frontend sections
          Object.keys(data[key]).forEach(subKey => {
            if (merged[subKey] && typeof merged[subKey] === 'object') {
              // Merge nested objects
              Object.assign(merged[subKey], data[key][subKey]);
            } else {
              merged[subKey] = data[key][subKey];
            }
          });
        }
      }
    });

    return Object.keys(merged).length > 0 ? merged : data.frontend || {};
  }

  // Remove empty sections
  _removeEmptySections(obj) {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (typeof value === 'object' && value !== null) {
        this._removeEmptySections(value);
        if (Object.keys(value).length === 0) {
          delete obj[key];
        }
      }
    });
  }

  // Sort keys alphabetically
  _sortKeys(obj) {
    const sorted = {};
    Object.keys(obj).sort().forEach(key => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        sorted[key] = this._sortKeys(obj[key]);
      } else {
        sorted[key] = obj[key];
      }
    });
    return sorted;
  }

  // Generate optimized files
  async generateOptimizedFiles(viData, enData) {
    const optimizedVi = this.optimizeStructure(viData);
    const optimizedEn = this.optimizeStructure(enData);

    return {
      vi: optimizedVi,
      en: optimizedEn,
      stats: {
        originalVi: this._countKeys(viData),
        originalEn: this._countKeys(enData),
        optimizedVi: this._countKeys(optimizedVi),
        optimizedEn: this._countKeys(optimizedEn),
        viReduction: this._countKeys(viData) - this._countKeys(optimizedVi),
        enReduction: this._countKeys(enData) - this._countKeys(optimizedEn)
      }
    };
  }

  // Count total keys in nested object
  _countKeys(obj) {
    let count = 0;
    Object.keys(obj).forEach(key => {
      count++;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        count += this._countKeys(obj[key]);
      }
    });
    return count;
  }

  // Download files as JSON
  downloadFile(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Validate translation structure
  validateStructure(viData, enData) {
    const errors = [];
    const warnings = [];

    // Check for missing keys
    const viKeys = this._getAllKeys(viData);
    const enKeys = this._getAllKeys(enData);

    viKeys.forEach(key => {
      if (!enKeys.includes(key)) {
        warnings.push(`Key "${key}" exists in VI but missing in EN`);
      }
    });

    enKeys.forEach(key => {
      if (!viKeys.includes(key)) {
        warnings.push(`Key "${key}" exists in EN but missing in VI`);
      }
    });

    // Check for empty values
    this._checkEmptyValues(viData, 'VI', errors);
    this._checkEmptyValues(enData, 'EN', errors);

    return { errors, warnings };
  }

  // Get all keys from nested object
  _getAllKeys(obj, path = '') {
    const keys = [];
    Object.keys(obj).forEach(key => {
      const currentPath = path ? `${path}.${key}` : key;
      keys.push(currentPath);
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys.push(...this._getAllKeys(obj[key], currentPath));
      }
    });
    return keys;
  }

  // Check for empty values
  _checkEmptyValues(obj, lang, errors, path = '') {
    Object.keys(obj).forEach(key => {
      const currentPath = path ? `${path}.${key}` : key;
      const value = obj[key];

      if (typeof value === 'string' && value.trim() === '') {
        errors.push(`Empty value in ${lang}: "${currentPath}"`);
      } else if (typeof value === 'object' && value !== null) {
        this._checkEmptyValues(value, lang, errors, currentPath);
      }
    });
  }

  // Search translations
  searchTranslations(data, searchTerm, lang = 'vi') {
    const results = [];
    const search = searchTerm.toLowerCase();

    this._searchInObject(data, search, lang, results);
    return results;
  }

  _searchInObject(obj, searchTerm, lang, results, path = '') {
    Object.keys(obj).forEach(key => {
      const currentPath = path ? `${path}.${key}` : key;
      const value = obj[key];

      if (typeof value === 'string') {
        if (key.toLowerCase().includes(searchTerm) || 
            value.toLowerCase().includes(searchTerm)) {
          results.push({
            key: currentPath,
            value: value,
            language: lang
          });
        }
      } else if (typeof value === 'object' && value !== null) {
        this._searchInObject(value, searchTerm, lang, results, currentPath);
      }
    });
  }
}

export default new I18nManagerService();