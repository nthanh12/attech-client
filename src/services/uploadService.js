import api from "../api";

// Upload image - compatible with TinyMCE format
export const uploadImage = async (file) => {
  console.log('🚀 Upload service started for:', file.name);
  
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    console.log('📡 Sending upload request to /api/upload/image');
    
    const response = await api.post("/api/upload/image", formData, {
      headers: { 
        'Content-Type': 'multipart/form-data'
      },
      timeout: 30000 // 30 second timeout
    });
    
    console.log('📨 Upload response received:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data
    });
    
    // Handle AttechServer response format: {status: 1, data: {location: "url"}}
    const responseData = response.data;
    
    // Check AttechServer format first
    if (responseData && responseData.status === 1 && responseData.data) {
      const data = responseData.data;
      if (data.location) {
        console.log('✅ Upload successful (AttechServer format), location:', data.location);
        return { location: data.location, ...data };
      }
    }
    
    // Fallback: direct format
    if (responseData && responseData.url && !responseData.location) {
      console.log('🔄 Converting url to location format');
      return { location: responseData.url, ...responseData };
    }
    
    if (responseData && responseData.location) {
      console.log('✅ Upload successful, location:', responseData.location);
      return responseData;
    }
    
    // Fallback: create local object URL for preview
    console.warn('⚠️ Backend response missing url/location, creating object URL');
    const objectUrl = URL.createObjectURL(file);
    return { 
      location: objectUrl,
      url: objectUrl,
      temp: true,
      message: 'Using temporary local URL - backend upload may have failed'
    };
    
  } catch (error) {
    console.error('❌ Upload service error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    
    // Check if it's a network/connection error
    if (!error.response) {
      console.warn('🔌 Network error - creating fallback object URL');
      const objectUrl = URL.createObjectURL(file);
      return { 
        location: objectUrl,
        url: objectUrl,
        temp: true,
        message: 'Using temporary local URL - backend not accessible'
      };
    }
    
    throw new Error(error.response?.data?.message || 'Upload failed: ' + error.message);
  }
};

// Upload multiple images
export const uploadMultipleImages = async (files) => {
  const formData = new FormData();
  
  // Append all files
  Array.from(files).forEach(file => {
    formData.append('files', file);
  });
  
  try {
    const response = await api.post("/api/upload/multi-upload", formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    return response.data; // Should return {locations: ["url1", "url2"]}
  } catch (error) {
    console.error('Multi-upload service error:', error);
    throw new Error(error.response?.data?.message || 'Multi-upload failed');
  }
};

// Upload video
export const uploadVideo = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await api.post("/api/upload/video", formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    return response.data;
  } catch (error) {
    console.error('Video upload service error:', error);
    throw new Error(error.response?.data?.message || 'Video upload failed');
  }
};

// Upload document
export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await api.post("/api/upload/document", formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    return response.data;
  } catch (error) {
    console.error('Document upload service error:', error);
    throw new Error(error.response?.data?.message || 'Document upload failed');
  }
};

// Delete uploaded file (via media management)
export const deleteImage = async (mediaId) => {
  try {
    const response = await api.delete(`/api/media/delete/${mediaId}`);
    return response.data;
  } catch (error) {
    console.error('Delete service error:', error);
    throw new Error(error.response?.data?.message || 'Delete failed');
  }
};

// Get media files
export const getMediaFiles = async (entityType = null, entityId = null) => {
  try {
    let url = "/api/media/find-all";
    if (entityType && entityId) {
      url = `/api/media/find-by-entity/${entityType}/${entityId}`;
    }
    
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Get media files error:', error);
    throw new Error(error.response?.data?.message || 'Failed to get media files');
  }
};

// Delete media file
export const deleteMediaFile = async (mediaId) => {
  try {
    const response = await api.delete(`/api/media/delete/${mediaId}`);
    return response.data;
  } catch (error) {
    console.error('Delete media file error:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete media file');
  }
};

// Test upload connection
export const testUploadEndpoint = async () => {
  try {
    const response = await api.options("/api/upload/image");
    return { available: true, status: response.status };
  } catch (error) {
    console.warn('Upload endpoint test failed:', error);
    return { available: false, error: error.message };
  }
}; 