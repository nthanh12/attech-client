// Backend API Discovery Tool
// This helps identify the correct API endpoints for your backend

export const discoverBackendAPI = async () => {
  console.log('🕵️ Discovering backend API structure...');
  
  const baseUrl = 'https://localhost:7276';
  
  // Common API patterns to test
  const apiPatterns = [
    // Upload endpoints
    '/api/upload',
    '/api/upload/image', 
    '/api/upload/file',
    '/api/media',
    '/api/media/upload',
    '/api/file',
    '/api/files',
    '/upload',
    '/upload/image',
    '/media/upload',
    
    // ASP.NET Core common patterns
    '/api/Media',
    '/api/Upload',
    '/api/FileUpload',
    '/api/v1/upload',
    '/api/v1/media',
    
    // Other possibilities
    '/Upload',
    '/Media',
    '/FileUpload',
    '/Content/Upload'
  ];
  
  const results = {
    swagger: null,
    workingEndpoints: [],
    potentialEndpoints: [],
    errors: []
  };
  
  // First check if Swagger is accessible
  try {
    console.log('📚 Checking Swagger documentation...');
    const swaggerResponse = await fetch(`${baseUrl}/swagger/v1/swagger.json`);
    if (swaggerResponse.ok) {
      const swaggerData = await swaggerResponse.json();
      results.swagger = swaggerData;
      console.log('✅ Swagger data retrieved:', swaggerData);
      
      // Extract endpoints from swagger
      if (swaggerData.paths) {
        Object.keys(swaggerData.paths).forEach(path => {
          if (path.toLowerCase().includes('upload') || 
              path.toLowerCase().includes('media') || 
              path.toLowerCase().includes('file')) {
            results.potentialEndpoints.push({
              path: path,
              methods: Object.keys(swaggerData.paths[path]),
              source: 'swagger'
            });
          }
        });
      }
    }
  } catch (error) {
    console.log('❌ Swagger not accessible:', error.message);
    results.errors.push(`Swagger error: ${error.message}`);
  }
  
  // Test each API pattern
  for (const pattern of apiPatterns) {
    try {
      console.log(`Testing: ${pattern}`);
      
      // Test with proxy (this is how your app will call it)
      const proxyResponse = await fetch(pattern, {
        method: 'OPTIONS',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const result = {
        endpoint: pattern,
        status: proxyResponse.status,
        statusText: proxyResponse.statusText,
        headers: Object.fromEntries(proxyResponse.headers.entries()),
        accessible: proxyResponse.status < 400
      };
      
      if (result.accessible) {
        results.workingEndpoints.push(result);
        console.log(`✅ ${pattern}: ${result.status}`);
      } else {
        results.potentialEndpoints.push(result);
        console.log(`⚠️ ${pattern}: ${result.status}`);
      }
      
    } catch (error) {
      results.errors.push(`${pattern}: ${error.message}`);
      console.log(`❌ ${pattern}: ${error.message}`);
    }
  }
  
  return results;
};

// Show discovery results in a readable format
export const showDiscoveryResults = (results) => {
  console.log('\n🎯 =========================');
  console.log('📊 BACKEND API DISCOVERY RESULTS');
  console.log('🎯 =========================\n');
  
  if (results.swagger) {
    console.log('📚 Swagger Documentation: ✅ Available');
    console.log('🔍 API Title:', results.swagger.info?.title);
    console.log('📝 API Version:', results.swagger.info?.version);
    console.log('🌐 Base URL:', results.swagger.servers?.[0]?.url);
  } else {
    console.log('📚 Swagger Documentation: ❌ Not accessible');
  }
  
  console.log('\n✅ WORKING ENDPOINTS (' + results.workingEndpoints.length + '):');
  results.workingEndpoints.forEach(endpoint => {
    console.log(`   ${endpoint.endpoint} (${endpoint.status} ${endpoint.statusText})`);
  });
  
  console.log('\n⚠️ POTENTIAL ENDPOINTS (' + results.potentialEndpoints.length + '):');
  results.potentialEndpoints.forEach(endpoint => {
    if (endpoint.source === 'swagger') {
      console.log(`   ${endpoint.path} [${endpoint.methods.join(', ')}] (from Swagger)`);
    } else {
      console.log(`   ${endpoint.endpoint} (${endpoint.status} ${endpoint.statusText})`);
    }
  });
  
  if (results.errors.length > 0) {
    console.log('\n❌ ERRORS (' + results.errors.length + '):');
    results.errors.forEach(error => {
      console.log(`   ${error}`);
    });
  }
  
  console.log('\n💡 RECOMMENDATIONS:');
  if (results.workingEndpoints.length > 0) {
    console.log('   ✅ Try using these working endpoints for uploads');
  } else {
    console.log('   🔧 Backend may not be running or upload endpoints not implemented');
    console.log('   📋 Check: https://localhost:7276/swagger/index.html');
    console.log('   🔄 Verify backend is running and CORS is configured');
  }
  
  return results;
};

// Auto-run discovery in development mode
if (process.env.NODE_ENV === 'development') {
  setTimeout(async () => {
    const results = await discoverBackendAPI();
    showDiscoveryResults(results);
  }, 4000);
}

export default { discoverBackendAPI, showDiscoveryResults };