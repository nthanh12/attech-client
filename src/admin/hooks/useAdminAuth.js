import { useContext, createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Kiểm tra hạn token (exp là giây, Date.now() là ms)
        if (decoded.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('admin_token');
        }
      } catch (e) {
        setIsAuthenticated(false);
        localStorage.removeItem('admin_token');
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
} 