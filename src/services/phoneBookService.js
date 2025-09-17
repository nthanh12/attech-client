import api from '../api';

/**
 * Get all phone book entries with pagination and filters
 */
export const getPhoneBookEntries = async (params = {}) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      organization = '',
      department = '',
      isActive = true,
      sortBy = 'order',
      sortDir = 'asc'
    } = params;

    const response = await api.get('/api/phonebook/find-all', {
      params: {
        pageNumber: page,
        pageSize: limit,
        keyword: search,
        sortBy,
        sortDirection: sortDir
      }
    });

    if (response.data?.status === 1) {
      return {
        success: true,
        data: response.data.data.items || [],
        totalItems: response.data.data.totalItems || response.data.data.total || 0,
        totalPages: Math.ceil((response.data.data.totalItems || response.data.data.total || 0) / limit),
        currentPage: response.data.data.page || 1
      };
    }

    return {
      success: false,
      message: response.data?.message || 'Failed to fetch phone book entries'
    };
  } catch (error) {
    console.error('Error fetching phone book entries:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to fetch phone book entries'
    };
  }
};

/**
 * Get phone book entry by ID
 */
export const getPhoneBookById = async (id) => {
  try {
    const response = await api.get(`/api/phonebook/find-by-id/${id}`);

    if (response.data?.status === 1) {
      return {
        success: true,
        data: response.data.data
      };
    }

    return {
      success: false,
      message: response.data?.message || 'Phone book entry not found'
    };
  } catch (error) {
    console.error('Error fetching phone book entry:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to fetch phone book entry'
    };
  }
};

/**
 * Create new phone book entry
 */
export const createPhoneBookEntry = async (entryData) => {
  try {
    console.log('Creating phone book entry with data:', entryData);
    const response = await api.post('/api/phonebook/create', entryData);

    if (response.data?.status === 1) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Tạo danh bạ thành công'
      };
    }

    return {
      success: false,
      message: response.data?.message || 'Failed to create phone book entry',
      errors: response.data?.errors
    };
  } catch (error) {
    console.error('Error creating phone book entry:', error);
    console.error('Error response status:', error.response?.status);
    console.error('Error response headers:', error.response?.headers);
    console.error('Error response data:', error.response?.data);
    console.error('Validation errors:', error.response?.data?.errors);
    console.error('Full error response:', error.response);

    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to create phone book entry',
      errors: error.response?.data?.errors
    };
  }
};

/**
 * Update phone book entry
 */
export const updatePhoneBookEntry = async (id, entryData) => {
  try {
    const response = await api.put(`/api/phonebook/update/${id}`, entryData);

    if (response.data?.status === 1) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Cập nhật danh bạ thành công'
      };
    }

    return {
      success: false,
      message: response.data?.message || 'Failed to update phone book entry'
    };
  } catch (error) {
    console.error('Error updating phone book entry:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to update phone book entry'
    };
  }
};

/**
 * Delete phone book entry
 */
export const deletePhoneBookEntry = async (id) => {
  try {
    const response = await api.delete(`/api/phonebook/delete/${id}`);

    if (response.data?.status === 1) {
      return {
        success: true,
        message: response.data.message || 'Xóa danh bạ thành công'
      };
    }

    return {
      success: false,
      message: response.data?.message || 'Failed to delete phone book entry'
    };
  } catch (error) {
    console.error('Error deleting phone book entry:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to delete phone book entry'
    };
  }
};

/**
 * Import phone book entries from Excel
 */
export const importPhoneBookExcel = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('auth_token');
    const response = await api.post('/api/phonebook/import', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.data?.status === 200 || response.data?.status === 1) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Import completed successfully'
      };
    }

    return {
      success: false,
      message: response.data?.message || 'Import failed'
    };
  } catch (error) {
    console.error('Error importing phone book:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Import failed'
    };
  }
};

/**
 * Export phone book entries to Excel
 */
export const exportPhoneBookExcel = async () => {
  try {
    const token = localStorage.getItem('auth_token');
    const response = await api.get('/api/phonebook/export', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      responseType: 'blob'
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `DanhBaDienThoai_${new Date().toISOString().slice(0,10)}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return {
      success: true,
      message: 'Export completed successfully'
    };
  } catch (error) {
    console.error('Error exporting phone book:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Export failed'
    };
  }
};

/**
 * Download import template
 */
export const downloadImportTemplate = async () => {
  try {
    const response = await api.get('/api/phonebook/import-template', {
      responseType: 'blob'
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'MauImportDanhBa.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return {
      success: true,
      message: 'Tải mẫu thành công'
    };
  } catch (error) {
    console.error('Error downloading template:', error);
    console.error('Response status:', error.response?.status);
    console.error('Response data:', error.response?.data);

    return {
      success: false,
      message: error.response?.status === 400
        ? 'Yêu cầu không hợp lệ. Vui lòng thử lại.'
        : (error.response?.data?.message || error.message || 'Lỗi tải file mẫu')
    };
  }
};

/**
 * Bulk update order for phone book entries
 */
export const updatePhoneBookOrder = async (orderData) => {
  try {
    const response = await api.put('/api/phonebook/order', orderData);

    if (response.data?.status === 1) {
      return {
        success: true,
        message: response.data.message || 'Order updated successfully'
      };
    }

    return {
      success: false,
      message: response.data?.message || 'Failed to update order'
    };
  } catch (error) {
    console.error('Error updating order:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to update order'
    };
  }
};

/**
 * Toggle active status for phone book entry
 */
export const togglePhoneBookStatus = async (id) => {
  try {
    const response = await api.put(`/api/phonebook/toggle-active/${id}`);

    if (response.data?.status === 1) {
      return {
        success: true,
        data: response.data.data,
        message: response.data.message || 'Cập nhật trạng thái thành công'
      };
    }

    return {
      success: false,
      message: response.data?.message || 'Failed to update status'
    };
  } catch (error) {
    console.error('Error updating status:', error);
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to update status'
    };
  }
};