import { useState, useEffect, useCallback } from 'react';
import { getMenuHierarchy } from '../services/menuService';
import { buildMenuTree, getRootMenus, getMenuChildren } from '../utils/menuUtils';

const useMenuData = (language = 'vi') => {
  const [rawMenuData, setRawMenuData] = useState([]); // Flat array from API
  const [menuData, setMenuData] = useState([]); // Processed data for compatibility
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenuData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getMenuHierarchy(language);
      
      if (Array.isArray(data)) {
        setRawMenuData(data);
        // Build hierarchical structure for backward compatibility
        const hierarchicalData = buildMenuTree(data);
        setMenuData(hierarchicalData);
      } else {
        setRawMenuData([]);
        setMenuData([]);
      }
    } catch (err) {setError(err.message);
      setRawMenuData([]);
      setMenuData([]);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchMenuData();
  }, [fetchMenuData]);

  const refetch = useCallback(() => {
    fetchMenuData();
  }, [fetchMenuData]);

  return {
    menuData, // Hierarchical structure for compatibility
    rawMenuData, // Flat array for new implementations
    loading,
    error,
    refetch,
    // Utility methods for flat array
    getRootMenus: useCallback(() => getRootMenus(rawMenuData), [rawMenuData]),
    getMenuChildren: useCallback((parentId) => getMenuChildren(rawMenuData, parentId), [rawMenuData])
  };
};

export default useMenuData;