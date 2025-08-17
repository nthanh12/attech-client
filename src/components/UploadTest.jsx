import React, { useState, useEffect } from 'react';
import { testUploadEndpoint, uploadImage } from '../services/uploadService';

const UploadTest = () => {
  const [testResults, setTestResults] = useState({
    endpoint: null,
    upload: null,
    loading: false
  });

  const testEndpoint = async () => {
    setTestResults(prev => ({ ...prev, loading: true }));
    try {
      // Test endpoint availability
      const endpointResult = await testUploadEndpoint();
      
      setTestResults(prev => ({
        ...prev,
        endpoint: endpointResult,
        loading: false
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        endpoint: { available: false, error: error.message },
        loading: false
      }));
    }
  };

  const testFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setTestResults(prev => ({ ...prev, loading: true }));
    try {
      const result = await uploadImage(file);
      setTestResults(prev => ({
        ...prev,
        upload: { success: true, result },
        loading: false
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        upload: { success: false, error: error.message },
        loading: false
      }));
    }
  };

  useEffect(() => {
    testEndpoint();
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px', 
      margin: '20px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>🔧 Backend Upload Connection Test</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <h4>Endpoint Test:</h4>
        {testResults.loading ? (
          <p>⏳ Testing...</p>
        ) : testResults.endpoint ? (
          testResults.endpoint.available ? (
            <p style={{ color: 'green' }}>✅ Backend upload endpoint is available</p>
          ) : (
            <p style={{ color: 'red' }}>❌ Backend upload endpoint failed: {testResults.endpoint.error}</p>
          )
        ) : (
          <button onClick={testEndpoint} disabled={testResults.loading}>
            Test Endpoint
          </button>
        )}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4>File Upload Test:</h4>
        <input 
          type="file" 
          accept="image/*" 
          onChange={testFileUpload}
          disabled={testResults.loading}
        />
        {testResults.upload && (
          <div style={{ marginTop: '10px' }}>
            {testResults.upload.success ? (
              <div>
                <p style={{ color: 'green' }}>✅ Upload successful!</p>
                <p>Response: {JSON.stringify(testResults.upload.result, null, 2)}</p>
                {testResults.upload.result.location && (
                  <img 
                    src={testResults.upload.result.location} 
                    alt="Uploaded" 
                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                  />
                )}
              </div>
            ) : (
              <p style={{ color: 'red' }}>❌ Upload failed: {testResults.upload.error}</p>
            )}
          </div>
        )}
      </div>

      <div style={{ fontSize: '12px', color: '#666' }}>
        <p><strong>Expected BE Endpoints:</strong></p>
        <ul>
          <li>POST /api/upload/file - Universal upload (TinyMCE)</li>
          <li>POST /api/media/upload - Media files (images/videos/audio)</li>
          <li>POST /api/documents/upload - Document files (PDF/DOC/XLS)</li>
          <li>GET /api/media/gallery - Media gallery</li>
          <li>GET /api/documents/library - Document library</li>
          <li>DELETE /api/media/delete/:id - Delete media</li>
          <li>DELETE /api/documents/delete/:id - Delete document</li>
        </ul>
      </div>
    </div>
  );
};

export default UploadTest;