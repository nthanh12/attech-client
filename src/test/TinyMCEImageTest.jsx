import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { simpleTinymceConfig } from '../config/simpleTinymceConfig';
import '../admin/pages/NewsList.jsx'; // Import to ensure TinyMCE plugins are loaded

const TinyMCEImageTest = () => {
  const [content, setContent] = useState('<p>Test TinyMCE image upload...</p>');

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🖼️ TinyMCE Image Upload Test</h2>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '5px' }}>
        <h3>Cách test upload ảnh:</h3>
        <ol>
          <li><strong>Click vào nút "Image" trên toolbar</strong></li>
          <li><strong>Paste ảnh từ clipboard (Ctrl+V)</strong></li>
          <li><strong>Drag & drop ảnh vào editor</strong></li>
        </ol>
        <p><em>Mở Console (F12) để xem chi tiết quá trình upload</em></p>
      </div>

      <div style={{ border: '1px solid #ddd', borderRadius: '5px' }}>
        <Editor
          value={content}
          onEditorChange={setContent}
          init={{
            ...simpleTinymceConfig,
            height: 300,
            setup: (editor) => {
              editor.on('init', () => {
                console.log('🎉 TinyMCE Editor initialized successfully');
              });
              
              editor.on('ImageUploadStart', () => {
                console.log('🔄 TinyMCE: Image upload started');
              });
              
              editor.on('ImageUploadSuccess', (e) => {
                console.log('✅ TinyMCE: Image upload success', e);
              });
              
              editor.on('ImageUploadFailure', (e) => {
                console.log('❌ TinyMCE: Image upload failed', e);
              });
            }
          }}
        />
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
        <h3>Preview Content:</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
        <h3>📊 Backend Status:</h3>
        <p>Backend URL: <code>https://localhost:7276</code></p>
        <p>Proxy: <code>/api/upload/image</code> → <code>https://localhost:7276/api/upload/image</code></p>
        <button 
          onClick={async () => {
            try {
              const response = await fetch('/api/upload/test');
              console.log('Backend test result:', response.status, response.statusText);
              alert(`Backend test: ${response.status} ${response.statusText}`);
            } catch (error) {
              console.error('Backend test error:', error);  
              alert(`Backend test failed: ${error.message}`);
            }
          }}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test Backend Connection
        </button>
      </div>
    </div>
  );
};

export default TinyMCEImageTest;