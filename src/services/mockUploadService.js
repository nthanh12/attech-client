// Mock Upload Service for Development (when backend is not available)

/**
 * Mock file upload that simulates backend behavior
 * Returns data in format expected by TinyMCE: {location: "url"}
 */
export const mockUploadImage = async (file) => {
  console.log('🎭 Mock upload triggered for file:', file.name);
  
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Create object URL for the uploaded file (works locally)
  const objectUrl = URL.createObjectURL(file);
  
  // Return in TinyMCE expected format
  const response = {
    location: objectUrl,
    filename: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    mockUpload: true
  };
  
  console.log('✅ Mock upload success:', response);
  return response;
};

/**
 * Mock multiple file upload
 */
export const mockUploadMultiple = async (files) => {
  console.log('🎭 Mock multi-upload triggered for files:', files.length);
  
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const locations = Array.from(files).map(file => URL.createObjectURL(file));
  
  return {
    locations,
    count: files.length,
    mockUpload: true
  };
};

/**
 * Mock delete (just logs, can't actually delete object URLs)
 */
export const mockDeleteImage = async (imageId) => {
  console.log('🎭 Mock delete triggered for:', imageId);
  
  if (imageId.startsWith('blob:')) {
    try {
      URL.revokeObjectURL(imageId);
      console.log('✅ Object URL revoked');
    } catch (error) {
      console.warn('⚠️ Could not revoke object URL:', error);
    }
  }
  
  return { success: true, mockDelete: true };
};

/**
 * Check if we should use mock services (no backend available)
 */
export const shouldUseMockServices = async () => {
  try {
    // Try to reach actual backend
    const response = await fetch('/api/health', { 
      method: 'GET',
      timeout: 2000 
    });
    
    if (response.ok) {
      console.log('🟢 Real backend detected');
      return false;
    }
  } catch (error) {
    console.log('🔴 No backend detected, using mock services');
  }
  
  return true;
};

/**
 * Smart upload service that chooses real or mock automatically
 */
export const smartUploadImage = async (file) => {
  const useMock = await shouldUseMockServices();
  
  if (useMock) {
    return mockUploadImage(file);
  } else {
    // Use real upload service
    const { uploadImage } = await import('./uploadService');
    return uploadImage(file);
  }
};

export default {
  mockUploadImage,
  mockUploadMultiple,
  mockDeleteImage,
  shouldUseMockServices,
  smartUploadImage
};