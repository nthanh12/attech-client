// Backend Endpoint Testing Utility

export const testBackendEndpoints = async () => {
  console.log('🔍 Testing backend endpoints...');
  
  const possibleEndpoints = [
    '/api/upload/image',
    '/api/upload',
    '/api/media/upload',
    '/api/file/upload',
    '/api/files/upload',
    '/upload/image',
    '/upload',
    '/media/upload',
    '/file/upload',
    '/files/upload'
  ];
  
  const results = [];
  
  for (const endpoint of possibleEndpoints) {
    try {
      console.log(`Testing ${endpoint}...`);
      
      // Test with OPTIONS first (safer)
      const optionsResponse = await fetch(endpoint, {
        method: 'OPTIONS',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      results.push({
        endpoint,
        method: 'OPTIONS',
        status: optionsResponse.status,
        statusText: optionsResponse.statusText,
        headers: Object.fromEntries(optionsResponse.headers.entries())
      });
      
      console.log(`${endpoint} OPTIONS: ${optionsResponse.status}`);
      
    } catch (error) {
      results.push({
        endpoint,
        method: 'OPTIONS', 
        error: error.message
      });
      console.log(`${endpoint} ERROR: ${error.message}`);
    }
  }
  
  return results;
};

export const testSpecificEndpoint = async (endpoint, method = 'GET') => {
  console.log(`🎯 Testing specific endpoint: ${method} ${endpoint}`);
  
  try {
    const response = await fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const result = {
      endpoint,
      method,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries())
    };
    
    try {
      // Try to get response body
      const text = await response.text();
      if (text) {
        result.body = text;
      }
    } catch (e) {
      result.bodyError = e.message;
    }
    
    console.log(`✅ Result:`, result);
    return result;
    
  } catch (error) {
    const result = {
      endpoint,
      method,
      error: error.message
    };
    
    console.log(`❌ Error:`, result);
    return result;
  }
};

export const createTestImageUpload = async (endpoint = '/api/upload/image') => {
  console.log(`🖼️ Testing image upload to: ${endpoint}`);
  
  try {
    // Create a small test image
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    
    // Draw a simple test pattern
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0, 0, 50, 50);
    ctx.fillStyle = '#00FF00';
    ctx.fillRect(50, 0, 50, 50);
    ctx.fillStyle = '#0000FF';
    ctx.fillRect(0, 50, 50, 50);
    ctx.fillStyle = '#FFFF00';
    ctx.fillRect(50, 50, 50, 50);
    
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        const testFile = new File([blob], 'test-upload.png', { type: 'image/png' });
        
        const formData = new FormData();
        formData.append('file', testFile);
        
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            body: formData
          });
          
          const result = {
            endpoint,
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries())
          };
          
          try {
            const responseData = await response.json();
            result.data = responseData;
          } catch (e) {
            try {
              const responseText = await response.text();
              result.text = responseText;
            } catch (e2) {
              result.bodyError = 'Could not read response body';
            }
          }
          
          console.log('🖼️ Upload test result:', result);
          resolve(result);
          
        } catch (error) {
          const result = {
            endpoint,
            error: error.message
          };
          console.log('❌ Upload test error:', result);
          resolve(result);
        }
      }, 'image/png');
    });
  } catch (error) {
    console.log('❌ Test image creation error:', error);
    return { error: error.message };
  }
};

// Auto-run endpoint discovery when imported in development
if (process.env.NODE_ENV === 'development') {
  setTimeout(async () => {
    console.log('🚀 Auto-discovering backend endpoints...');
    const results = await testBackendEndpoints();
    
    const workingEndpoints = results.filter(r => r.status && r.status !== 404 && !r.error);
    
    if (workingEndpoints.length > 0) {
      console.log('✅ Found working endpoints:', workingEndpoints);
    } else {
      console.log('❌ No working endpoints found. Backend may be down or endpoints different.');
      console.log('💡 Check backend Swagger at: https://localhost:7276/swagger/index.html');
    }
  }, 3000);
}

export default {
  testBackendEndpoints,
  testSpecificEndpoint,
  createTestImageUpload
};