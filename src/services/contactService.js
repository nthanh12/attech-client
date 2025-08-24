import api from "../api";

// Submit contact form
export const submitContactForm = async (formData) => {
  try {
    const response = await api.post("/api/contact/submit", {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phone,
      subject: formData.subject,
      message: formData.message,
      submittedAt: new Date().toISOString()
    });

    if (response.data && response.data.status === 1) {
      return {
        success: true,
        message: response.data.message || "Gửi liên hệ thành công!"
      };
    }

    throw new Error(response.data?.message || "Gửi liên hệ thất bại");
  } catch (error) {
    console.error("Contact form submission error:", error);
    throw {
      success: false,
      message: error.response?.data?.message || error.message || "Có lỗi xảy ra khi gửi liên hệ"
    };
  }
};

// Get contact messages for admin (if needed)
export const fetchContactMessages = async (pageNumber = 1, pageSize = 10, keyword = "", filters = {}, sortConfig = null) => {
  try {
    const params = {
      pageNumber,
      pageSize,
      keyword
    };

    // Add filters if provided
    if (filters.status) {
      params.status = filters.status === "read" ? 1 : 0;
    }
    if (filters.dateFrom) {
      params.dateFrom = filters.dateFrom;
    }
    if (filters.dateTo) {
      params.dateTo = filters.dateTo;
    }

    // Add sorting if provided
    if (sortConfig?.key) {
      params.sortBy = sortConfig.key;
      params.sortDirection = sortConfig.direction || 'desc';
    }

    const response = await api.get("/api/contact/find-all", { params });

    if (response.data && response.data.status === 1 && response.data.data) {
      const dataObj = response.data.data;
      return {
        items: dataObj.items || [],
        totalItems: dataObj.totalItems || 0,
        totalPages: Math.ceil((dataObj.totalItems || 0) / pageSize),
        currentPage: dataObj.page || pageNumber,
        pageSize,
      };
    }

    throw new Error("Invalid response format");
  } catch (error) {
    throw error;
  }
};

// Get contact detail by ID (for admin)
export const getContactById = async (id) => {
  try {
    const response = await api.get(`/api/contact/find-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Mark contact message as read (for admin)
export const markAsRead = async (id) => {
  try {
    const response = await api.put(`/api/contact/mark-as-read/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Mark contact message as unread (for admin)
export const markAsUnread = async (id) => {
  try {
    const response = await api.put(`/api/contact/mark-as-unread/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete contact message (for admin)
export const deleteContactMessage = async (id) => {
  try {
    const response = await api.delete(`/api/contact/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};