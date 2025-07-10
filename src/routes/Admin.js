import React from 'react';
import { AdminRoutes, AdminAuthProvider } from '../admin';

const Admin = () => {
  console.log('Render Admin entry');
  return (
    
    <AdminAuthProvider>
      <AdminRoutes />
    </AdminAuthProvider>
  );
};

export default Admin;
