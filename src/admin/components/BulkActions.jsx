import React, { useState } from 'react';
import './BulkActions.css';

const BulkActions = ({ 
  selectedItems = [], 
  totalItems = 0,
  onSelectAll,
  onDeselectAll,
  actions = [],
  className = '' 
}) => {
  const [showActions, setShowActions] = useState(false);
  const selectedCount = selectedItems.length;
  const isAllSelected = selectedCount === totalItems && totalItems > 0;
  const isPartiallySelected = selectedCount > 0 && selectedCount < totalItems;

  const handleSelectAll = () => {
    if (isAllSelected) {
      onDeselectAll && onDeselectAll();
    } else {
      onSelectAll && onSelectAll();
    }
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className={`bulk-actions-container ${className}`}>
      <div className="bulk-actions-header">
        <div className="bulk-selection-info">
          <div className="bulk-checkbox-wrapper">
            <input
              type="checkbox"
              className="bulk-checkbox"
              checked={isAllSelected}
              ref={input => {
                if (input) input.indeterminate = isPartiallySelected;
              }}
              onChange={handleSelectAll}
            />
            <span className="bulk-selection-text">
              {selectedCount} of {totalItems} selected
            </span>
          </div>
          
          {selectedCount < totalItems && (
            <button
              className="select-all-btn"
              onClick={onSelectAll}
            >
              Select all {totalItems} items
            </button>
          )}
          
          <button
            className="deselect-all-btn"
            onClick={onDeselectAll}
          >
            Clear selection
          </button>
        </div>

        <div className="bulk-actions-toggle">
          <button
            className={`actions-toggle-btn ${showActions ? 'active' : ''}`}
            onClick={() => setShowActions(!showActions)}
          >
            <span>Actions</span>
            <i className={`bi bi-chevron-${showActions ? 'up' : 'down'}`}></i>
          </button>
        </div>
      </div>

      {showActions && (
        <div className="bulk-actions-menu">
          {actions.map((action, index) => (
            <BulkActionButton
              key={index}
              action={action}
              selectedItems={selectedItems}
              selectedCount={selectedCount}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const BulkActionButton = ({ action, selectedItems, selectedCount }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (action.confirmMessage) {
      const confirmed = window.confirm(
        action.confirmMessage.replace('{count}', selectedCount)
      );
      if (!confirmed) return;
    }

    setIsLoading(true);
    try {
      await action.handler(selectedItems);
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`bulk-action-btn ${action.variant || 'primary'} ${isLoading ? 'loading' : ''}`}
      onClick={handleClick}
      disabled={isLoading || action.disabled}
      title={action.tooltip}
    >
      {isLoading ? (
        <i className="bi bi-arrow-clockwise spinning"></i>
      ) : (
        action.icon && <i className={action.icon}></i>
      )}
      <span>
        {action.label} ({selectedCount})
      </span>
    </button>
  );
};

export default BulkActions;