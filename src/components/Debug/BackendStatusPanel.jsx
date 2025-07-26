import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const BackendStatusPanel = () => {
  const { t } = useTranslation();
  const [backendStatus, setBackendStatus] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const testEndpoint = async (endpoint, method = 'GET') => {
    const startTime = Date.now();
    
    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const duration = Date.now() - startTime;
      
      return {
        endpoint,
        method,
        status: response.status,
        statusText: response.statusText,
        duration: duration + 'ms',
        success: response.status < 400,
        timestamp: new Date().toLocaleTimeString()
      };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      
      return {
        endpoint,
        method,
        error: error.message,
        duration: duration + 'ms',
        success: false,
        timestamp: new Date().toLocaleTimeString()
      };
    }
  };

  const testCommonEndpoints = async () => {
    console.log('🔍 Testing AttechServer endpoints...');
    
    const endpoints = [
      // Public endpoints (no auth required) - CONFIRMED WORKING
      { url: '/api/news/find-all?pageIndex=1&pageSize=5', method: 'GET', type: 'news' },
      { url: '/api/news-categories/find-all?pageIndex=1&pageSize=5', method: 'GET', type: 'categories' },
      { url: '/api/product/find-all?pageIndex=1&pageSize=5', method: 'GET', type: 'products' },
      { url: '/api/product-categories/find-all?pageIndex=1&pageSize=5', method: 'GET', type: 'categories' },
      { url: '/api/service/find-all?pageIndex=1&pageSize=5', method: 'GET', type: 'services' },
      { url: '/api/notification/find-all?pageIndex=1&pageSize=5', method: 'GET', type: 'notifications' },
      { url: '/api/notification-categories/find-all?pageIndex=1&pageSize=5', method: 'GET', type: 'categories' },
      
      // Upload endpoints (auth required - will test with OPTIONS)
      { url: '/api/upload/image', method: 'OPTIONS', type: 'upload' },
      { url: '/api/upload/multi-upload', method: 'OPTIONS', type: 'upload' },
      { url: '/api/upload/video', method: 'OPTIONS', type: 'upload' },
      { url: '/api/upload/document', method: 'OPTIONS', type: 'upload' },
      
      // Auth endpoints
      { url: '/api/auth/login', method: 'OPTIONS', type: 'auth' },
      { url: '/api/auth/register', method: 'OPTIONS', type: 'auth' }
    ];
    
    const results = [];
    
    for (const endpoint of endpoints) {
      const result = await testEndpoint(endpoint.url, endpoint.method);
      result.type = endpoint.type; // Add type for filtering
      results.push(result);
      console.log(`${endpoint.method} ${endpoint.url}: ${result.success ? '✅' : '❌'} ${result.status || result.error}`);
    }
    
    setTestResults(results);
  };

  const testAuthentication = async () => {
    console.log('🔐 Testing authentication...');
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'test',
          password: 'test'
        })
      });
      
      const result = {
        endpoint: '/api/auth/login',
        method: 'POST (test credentials)',
        status: response.status,
        statusText: response.statusText,
        success: response.ok,
        timestamp: new Date().toLocaleTimeString(),
        type: 'auth'
      };
      
      if (response.ok) {
        try {
          const data = await response.json();
          result.data = data;
          if (data.status === 1 && data.data?.token) {
            result.note = 'Login successful - token received';
          } else {
            result.note = 'Response OK but no token';
          }
        } catch (e) {
          result.responseText = await response.text();
        }
      } else {
        try {
          const errorData = await response.json();
          result.errorData = errorData;
          result.note = errorData.message || 'Login failed';
        } catch (e) {
          result.responseText = await response.text();
        }
      }
      
      setTestResults(prev => [result, ...prev]);
      console.log('🔐 Auth test result:', result);
      
    } catch (error) {
      const result = {
        endpoint: '/api/auth/login',
        method: 'POST (test credentials)',
        error: error.message,
        success: false,
        timestamp: new Date().toLocaleTimeString(),
        type: 'auth'
      };
      
      setTestResults(prev => [result, ...prev]);
      console.log('❌ Auth test error:', result);
    }
  };

  const testImageUpload = async () => {
    console.log('🖼️ Testing actual image upload with correct endpoint...');
    
    try {
      // Create a test image
      const canvas = document.createElement('canvas');
      canvas.width = 50;
      canvas.height = 50;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(0, 0, 50, 50);
      
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      const testFile = new File([blob], 'test-image.png', { type: 'image/png' });
      
      const formData = new FormData();
      formData.append('file', testFile); // Backend expects 'file' for single upload
      
      // Get token for authentication
      const token = localStorage.getItem('token');
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch('/api/upload/image', {
        method: 'POST',
        headers: headers,
        body: formData
      });
      
      const result = {
        endpoint: '/api/upload/image',
        method: 'POST (with file)',
        status: response.status,
        statusText: response.statusText,
        success: response.ok,
        timestamp: new Date().toLocaleTimeString()
      };
      
      if (response.ok) {
        try {
          const data = await response.json();
          result.data = data;
        } catch (e) {
          result.responseText = await response.text();
        }
      } else {
        try {
          result.responseText = await response.text();
        } catch (e) {
          result.responseText = 'Could not read response text';
        }
      }
      
      setTestResults(prev => [result, ...prev]);
      console.log('🖼️ Upload test result:', result);
      
    } catch (error) {
      const result = {
        endpoint: '/api/upload/image',
        method: 'POST (with file)',
        error: error.message,
        success: false,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setTestResults(prev => [result, ...prev]);
      console.log('❌ Upload test error:', result);
    }
  };

  useEffect(() => {
    // Auto-test on mount
    testCommonEndpoints();
  }, []);

  if (!isVisible) {
    return (
      <div 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999
        }}
      >
        <button
          onClick={() => setIsVisible(true)}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 16px',
            fontSize: '12px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          🔧 {t('debug.title')}
        </button>
      </div>
    );
  }

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '400px',
        maxHeight: '60vh',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        zIndex: 9999,
        fontSize: '12px'
      }}
    >
      <div 
        style={{
          padding: '12px',
          borderBottom: '1px solid #eee',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px 8px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ fontWeight: 'bold' }}>🔧 {t('debug.title')}</div>
        <button
          onClick={() => setIsVisible(false)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ✕
        </button>
      </div>
      
      <div style={{ padding: '12px' }}>
        <div style={{ marginBottom: '12px' }}>
          <strong>Backend URL:</strong> <code>https://localhost:7276</code><br/>
          <strong>Proxy:</strong> <code>/api/*</code> → <code>https://localhost:7276/api/*</code><br/>
          <strong>Note:</strong> <span style={{color: '#dc3545', fontSize: '11px'}}>Only /api/* requests are proxied to backend</span>
        </div>
        
        <div style={{ marginBottom: '12px' }}>
          <button
            onClick={testCommonEndpoints}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 12px',
              marginRight: '8px',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            🔍 Test Endpoints
          </button>
          
          <button
            onClick={testAuthentication}
            style={{
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 12px',
              marginRight: '8px',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            🔐 Test Auth
          </button>
          
          <button
            onClick={testImageUpload}
            style={{
              backgroundColor: '#ffc107',
              color: 'black',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '11px'
            }}
          >
            🖼️ Test Upload
          </button>
        </div>
        
        <div 
          style={{
            maxHeight: '300px',
            overflowY: 'auto',
            border: '1px solid #eee',
            borderRadius: '4px',
            padding: '8px',
            backgroundColor: '#f8f9fa'
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Test Results:</div>
          
          {/* Show working endpoints summary */}
          {testResults.length > 0 && (
            <div style={{ marginBottom: '12px', fontSize: '11px', backgroundColor: '#e9ecef', padding: '8px', borderRadius: '3px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>🎯 Backend Status:</div>
              {['news', 'categories', 'products', 'services', 'notifications', 'upload', 'auth'].map(type => {
                const workingEndpoints = testResults.filter(r => r.type === type && r.success);
                const totalEndpoints = testResults.filter(r => r.type === type);
                const hasEndpoints = totalEndpoints.length > 0;
                if (!hasEndpoints) return null;
                return (
                  <div key={type} style={{ marginBottom: '3px', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 'bold' }}>{type.toUpperCase()}:</span>
                    <span style={{ color: workingEndpoints.length > 0 ? '#28a745' : '#dc3545' }}>
                      {workingEndpoints.length > 0 ? 
                        `✅ ${workingEndpoints.length}/${totalEndpoints.length} working` : 
                        `❌ 0/${totalEndpoints.length} working`
                      }
                    </span>
                  </div>
                );
              })}
              <div style={{ marginTop: '6px', fontSize: '10px', color: '#666' }}>
                Proxy Status: {testResults.some(r => r.success) ? '🟢 Working' : '🔴 No endpoints responding'} 
              </div>
            </div>
          )}
          
          {testResults.length === 0 ? (
            <div style={{ color: '#666', fontStyle: 'italic' }}>No tests run yet...</div>
          ) : (
            testResults.map((result, index) => (
              <div 
                key={index}
                style={{
                  marginBottom: '8px',
                  padding: '6px',
                  backgroundColor: result.success ? '#d4edda' : '#f8d7da',
                  borderRadius: '3px',
                  fontSize: '11px'
                }}
              >
                <div style={{ fontWeight: 'bold' }}>
                  {result.success ? '✅' : '❌'} {result.method} {result.endpoint}
                </div>
                <div style={{ color: '#666' }}>
                  {result.status && `${result.status} ${result.statusText} `}
                  {result.error && `Error: ${result.error} `}
                  {result.duration && `(${result.duration}) `}
                  <span style={{ float: 'right' }}>{result.timestamp}</span>
                </div>
                {result.note && (
                  <div style={{ marginTop: '4px', fontSize: '10px', color: result.success ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
                    {result.note}
                  </div>
                )}
                {result.data && (
                  <div style={{ marginTop: '4px', fontSize: '10px', color: '#666' }}>
                    <details style={{ cursor: 'pointer' }}>
                      <summary>Response Data</summary>
                      <pre style={{ marginTop: '4px', fontSize: '9px', backgroundColor: '#f8f9fa', padding: '4px', borderRadius: '2px', overflow: 'auto', maxHeight: '100px' }}>
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  </div>
                )}
                {result.errorData && (
                  <div style={{ marginTop: '4px', fontSize: '10px', color: '#dc3545' }}>
                    <details style={{ cursor: 'pointer' }}>
                      <summary>Error Details</summary>
                      <pre style={{ marginTop: '4px', fontSize: '9px', backgroundColor: '#f8d7da', padding: '4px', borderRadius: '2px', overflow: 'auto', maxHeight: '100px' }}>
                        {JSON.stringify(result.errorData, null, 2)}
                      </pre>
                    </details>
                  </div>
                )}
                {result.responseText && (
                  <div style={{ marginTop: '4px', fontSize: '10px', color: '#666' }}>
                    Response: {result.responseText.substring(0, 100)}{result.responseText.length > 100 ? '...' : ''}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BackendStatusPanel;