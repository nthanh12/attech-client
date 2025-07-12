import React from 'react';
import { AdminRoutes, AdminAuthProvider, PermissionProvider } from '../admin';

const Admin = () => {
  console.log('Render Admin entry');
  return (
    <AdminAuthProvider>
      <PermissionProvider>
        <AdminRoutes />
      </PermissionProvider>
    </AdminAuthProvider>
  );
};

export default Admin;
