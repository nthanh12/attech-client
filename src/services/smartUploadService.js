// Smart Upload Service - Uses backend if available, falls back to mock

const MOCK_DELAY = 1000;

// Mock upload function
const mockUploadImage = async (file) => {
  console.log('🎭 Using mock upload for:', file.name);
  
  // Validate file
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('Invalid file type. Please select an image.');
  }
  
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('File too large. Please select an image smaller than 10MB.');
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  // Create object URL for preview
  const mockUrl = URL.createObjectURL(file);
  
  return {
    success: true,
    location: mockUrl,
    url: mockUrl,
    filename: file.name,
    size: file.size,
    type: file.type,
    uploadedAt: new Date().toISOString(),
    id: 'mock_' + Date.now(),
    message: 'Mock upload successful (backend not available)',
    mock: true,
    temp: true
  };
};

// Test if backend is available
const testBackendAvailability = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch('/api/upload/test', {
      method: 'GET',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    return {
      available: response.status < 400,
      status: response.status,
      statusText: response.statusText
    };
  } catch (error) {
    return {
      available: false,
      error: error.message
    };
  }
};

// Main smart upload function using correct backend endpoint
export const smartUploadImage = async (file) => {
  console.log('🧠 Smart upload starting for:', file.name);
  
  try {
    console.log('📡 Trying backend upload: POST /api/upload/image');
    
    const formData = new FormData();
    formData.append('file', file); // Backend expects 'file' for single upload
    
    // Get token from localStorage for authentication
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch('/upload/image', {
      method: 'POST',
      headers: headers,
      body: formData
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Upload successful:', data);
      
      // Handle new backend response format: {status: 1, data: {location: "..."}}
      if (data.status === 1 && data.data && data.data.location) {
        return {
          location: data.data.location,
          url: data.data.location,
          ...data.data
        };
      }
      
      // Fallback: Handle direct response
      if (data.url || data.location) {
        return {
          location: data.url || data.location,
          url: data.url || data.location,
          ...data
        };
      }
      
      throw new Error('Invalid upload response format');
      
    } else {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }
    
  } catch (error) {
    console.log('❌ Backend upload failed:', error.message);
    console.log('🎭 Falling back to mock upload');
    return await mockUploadImage(file);
  }
};

export default { smartUploadImage };