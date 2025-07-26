// Test Backend Connection với https://localhost:7276

export const testBackendUpload = async () => {
  console.log('🧪 Testing backend upload connection...');
  
  try {
    // Test basic endpoint availability
    const healthResponse = await fetch('/api/upload/test', {
      method: 'GET',
    });
    
    console.log('Health check response:', healthResponse.status);
    
    if (healthResponse.ok) {
      console.log('✅ Backend upload endpoint is available');
      return true;
    }
    
    // If test endpoint doesn't exist, try basic upload endpoint
    const uploadResponse = await fetch('/api/upload/image', {
      method: 'OPTIONS', // Check if endpoint exists
    });
    
    console.log('Upload endpoint response:', uploadResponse.status);
    
    if (uploadResponse.status !== 404) {
      console.log('✅ Backend upload endpoint exists');  
      return true;
    }
    
    console.log('❌ Backend upload endpoints not found');
    return false;
    
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    return false;
  }
};

export const testImageUpload = async () => {
  console.log('🖼️ Testing actual image upload...');
  
  try {
    // Create a test image file
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0, 0, 100, 100);
    
    // Convert to blob
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        const testFile = new File([blob], 'test-image.png', { type: 'image/png' });
        
        const formData = new FormData();
        formData.append('file', testFile);
        
        try {
          const response = await fetch('/api/upload/image', {
            method: 'POST',
            body: formData,
          });
          
          const result = await response.json();
          
          if (response.ok && result.location) {
            console.log('✅ Image upload successful:', result.location);
            resolve({ success: true, result });
          } else {
            console.log('❌ Image upload failed:', result);
            resolve({ success: false, error: result });
          }
        } catch (error) {
          console.error('❌ Image upload error:', error);
          resolve({ success: false, error: error.message });
        }
      }, 'image/png');
    });
    
  } catch (error) {
    console.error('❌ Image upload test failed:', error);
    return { success: false, error: error.message };
  }
};

// Auto-run tests when imported
if (process.env.NODE_ENV === 'development') {
  setTimeout(async () => {
    console.log('🔍 Auto-testing backend connection...');
    
    const isAvailable = await testBackendUpload();
    
    if (isAvailable) {
      console.log('🎉 Ready to test image uploads in TinyMCE!');
    } else {
      console.log('⚠️ Backend not ready. Check:');
      console.log('   1. Backend server running on https://localhost:7276');
      console.log('   2. Upload endpoints implemented');
      console.log('   3. CORS properly configured');
    }
  }, 2000);
}

export default {
  testBackendUpload,
  testImageUpload
};