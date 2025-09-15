import React from 'react';
import useMenuData from '../hooks/useMenuData';
import { 
  getRootMenus, 
  getMenuChildren, 
  getMenuLabel, 
  getMenuPath,
  hasChildren 
} from '../utils/menuUtils';

/**
 * Example component demonstrating how to use flat array menu format
 */
const MenuExample = () => {
  const { rawMenuData, loading, error } = useMenuData('vi');

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div>Error loading menu: {error}</div>;

  const renderMenuItems = (menuItems, level = 0) => {
    return menuItems.map(item => (
      <div 
        key={item.id} 
        style={{ marginLeft: level * 20, marginBottom: 8 }}
      >
        <div style={{ 
          fontWeight: level === 0 ? 'bold' : 'normal',
          color: level === 1 ? '#666' : level === 2 ? '#999' : '#000'
        }}>
          [{item.level}] {getMenuLabel(item, 'vi')} 
          <small> (Order: {item.order}, ID: {item.id})</small>
          {hasChildren(rawMenuData, item.id) && ' 📁'}
        </div>
        
        {/* Render children */}
        {hasChildren(rawMenuData, item.id) && (
          <div>
            {renderMenuItems(getMenuChildren(rawMenuData, item.id), level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🎯 Menu Flat Array Format Demo</h2>
      
      <div style={{ marginBottom: 20 }}>
        <h3>📊 Raw Data Info:</h3>
        <p>Total items: {rawMenuData.length}</p>
        <p>Root menus: {getRootMenus(rawMenuData).length}</p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3>🌳 Menu Structure:</h3>
        {renderMenuItems(getRootMenus(rawMenuData))}
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3>📝 Sample Menu Item Structure:</h3>
        {rawMenuData.length > 0 && (
          <pre style={{ background: '#f5f5f5', padding: 10, borderRadius: 4 }}>
            {JSON.stringify(rawMenuData[0], null, 2)}
          </pre>
        )}
      </div>

      <div>
        <h3>💡 Usage Example:</h3>
        <pre style={{ background: '#f0f8ff', padding: 10, borderRadius: 4 }}>
{`// Get root menus (level 0)
const rootMenus = getRootMenus(rawMenuData);

// Get children of a menu
const children = getMenuChildren(rawMenuData, parentId);

// Get label in current language
const label = getMenuLabel(menuItem, 'vi');

// Get path in current language  
const path = getMenuPath(menuItem, 'vi');

// Check if menu has children
const hasKids = hasChildren(rawMenuData, menuId);

// Loop through all menu items
rawMenuData.forEach(item => {
  // Process each menu item as needed
});`}
        </pre>
      </div>
    </div>
  );
};

export default MenuExample;