# Admin Buttons Style Guide

## Overview
This guide explains the standardized button system for the admin interface. All admin pages should use these consistent button classes for a unified look and feel.

## Import Statement
Add this import to your admin page component:
```jsx
import "../styles/adminButtons.css";
```

## Basic Usage

### Base Button Class
All admin buttons should start with the `admin-btn` base class:
```jsx
<button className="admin-btn admin-btn-primary">
  <i className="fas fa-plus"></i>
  <span className="admin-btn-text">Add New</span>
</button>
```

## Button Sizes

| Class | Size | Usage |
|-------|------|-------|
| `admin-btn` | Default (16px padding) | Main action buttons |
| `admin-btn-xs` | Extra Small (8px padding) | Table action buttons |
| `admin-btn-sm` | Small (12px padding) | Secondary actions |
| `admin-btn-lg` | Large (24px padding) | Primary page actions |

## Button Colors

### Solid Variants (with gradients)
| Class | Color | Usage |
|-------|-------|-------|
| `admin-btn-primary` | Blue | Primary actions (Add, Save, Submit) |
| `admin-btn-danger` | Red | Delete, Remove actions |
| `admin-btn-success` | Green | Success, Approve actions |
| `admin-btn-warning` | Orange | Warning, Alert actions |
| `admin-btn-info` | Cyan | Info, View, Edit actions |
| `admin-btn-secondary` | Gray | Cancel, Reset actions |

### Outline Variants
| Class | Usage |
|-------|-------|
| `admin-btn-outline-primary` | Secondary primary actions |
| `admin-btn-outline-danger` | Confirmation for delete actions |
| `admin-btn-outline-success` | Secondary success actions |
| `admin-btn-outline-secondary` | Tertiary actions |

## Table Action Buttons

For table action buttons, use the combination:
```jsx
<div className="admin-table-actions">
  <button className="admin-btn admin-btn-xs admin-btn-info">
    <i className="fas fa-edit"></i>
    <span className="admin-btn-text">Edit</span>
  </button>
  <button className="admin-btn admin-btn-xs admin-btn-danger">
    <i className="fas fa-trash"></i>
    <span className="admin-btn-text">Delete</span>
  </button>
</div>
```

## Responsive Design

The `admin-btn-text` class automatically hides text on mobile devices (< 768px), showing only icons to save space.

## Button States

### Loading State
Add `admin-btn-loading` class for loading animations:
```jsx
<button className="admin-btn admin-btn-primary admin-btn-loading">
  Processing...
</button>
```

### Disabled State
Use the standard `disabled` attribute:
```jsx
<button className="admin-btn admin-btn-primary" disabled>
  Disabled Button
</button>
```

### Active State
Add `admin-btn-active` for active/selected state:
```jsx
<button className="admin-btn admin-btn-secondary admin-btn-active">
  Active Tab
</button>
```

## Special Button Types

### Floating Action Button
```jsx
<button className="admin-btn admin-btn-primary admin-fab">
  <i className="fas fa-plus"></i>
</button>
```

### Button Groups
```jsx
<div className="admin-btn-group">
  <button className="admin-btn admin-btn-primary">First</button>
  <button className="admin-btn admin-btn-secondary">Second</button>
  <button className="admin-btn admin-btn-info">Third</button>
</div>
```

### Block Buttons (Full Width)
```jsx
<button className="admin-btn admin-btn-primary admin-btn-block">
  Full Width Button
</button>
```

## Migration Guide

### Old Classes → New Classes

| Old Class | New Class |
|-----------|-----------|
| `btn btn-primary` | `admin-btn admin-btn-primary` |
| `btn btn-sm btn-primary` | `admin-btn admin-btn-sm admin-btn-primary` |
| `btn btn-xs btn-info` | `admin-btn admin-btn-xs admin-btn-info` |
| `btn btn-danger` | `admin-btn admin-btn-danger` |
| `btn btn-outline-secondary` | `admin-btn admin-btn-outline-secondary` |

### DataTable Action Buttons
When using DataTable component actions:
```jsx
const actions = [
  {
    label: "Edit",
    onClick: handleEdit,
    className: "admin-btn admin-btn-xs admin-btn-info", // New
    icon: "fas fa-edit"
  },
  {
    label: "Delete", 
    onClick: handleDelete,
    className: "admin-btn admin-btn-xs admin-btn-danger", // New
    icon: "fas fa-trash"
  }
];
```

## Examples

### Page Header Actions
```jsx
<div className="page-actions">
  <button className="admin-btn admin-btn-outline-secondary" onClick={refreshData}>
    <i className="fas fa-sync"></i>
    <span className="admin-btn-text">Refresh</span>
  </button>
  <button className="admin-btn admin-btn-primary" onClick={handleAdd}>
    <i className="fas fa-plus"></i>
    <span className="admin-btn-text">Add New</span>
  </button>
</div>
```

### Modal Actions
```jsx
<div className="modal-actions">
  <button 
    type="button"
    className="admin-btn admin-btn-secondary"
    onClick={() => setShowModal(false)}
  >
    <span className="admin-btn-text">Cancel</span>
  </button>
  <button 
    type="submit"
    className="admin-btn admin-btn-primary"
    disabled={isLoading}
  >
    <span className="admin-btn-text">Save</span>
  </button>
</div>
```

### Filter Actions
```jsx
<div className="admin-filter-actions">
  <button className="admin-btn admin-btn-outline-secondary" onClick={resetFilters}>
    <i className="fas fa-times"></i>
    <span className="admin-btn-text">Clear</span>
  </button>
  <button className="admin-btn admin-btn-primary" onClick={applyFilters}>
    <i className="fas fa-search"></i>
    <span className="admin-btn-text">Search</span>
  </button>
</div>
```

## Benefits

1. **Consistency**: All admin buttons look and behave the same way
2. **Modern Design**: Uses gradients and smooth animations
3. **Responsive**: Adapts to different screen sizes
4. **Accessible**: Proper focus and disabled states
5. **Maintainable**: One central CSS file for all button styles
6. **Dark Mode Ready**: Built-in dark mode support

## Notes

- Always include both icon and text for accessibility
- Use semantic button types (`type="button"`, `type="submit"`)
- Test on mobile devices to ensure proper responsive behavior
- The old button classes are deprecated and will be removed in future versions