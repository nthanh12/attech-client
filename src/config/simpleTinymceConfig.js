// Simplified TinyMCE Configuration with Smart Backend Support  
import { smartUploadImage } from '../services/smartUploadService';

// Custom upload handler that works with or without backend
const handleImageUpload = (blobInfo, success, failure) => {
  console.log('📤 TinyMCE upload started:', blobInfo.filename());
  console.log('📊 Blob info:', {
    size: blobInfo.blob().size,
    type: blobInfo.blob().type,
    name: blobInfo.filename()
  });
  
  // Convert blob to file with proper name
  const file = new File([blobInfo.blob()], blobInfo.filename(), {
    type: blobInfo.blob().type,
    lastModified: Date.now()
  });
  
  console.log('📁 File created:', {
    name: file.name,
    size: file.size,
    type: file.type
  });
  
  // Use smart upload (tries backend, falls back to mock)
  smartUploadImage(file)
    .then(response => {
      console.log('🔍 Upload response:', response);
      
      if (response && (response.location || response.url)) {
        const imageUrl = response.location || response.url;
        console.log('✅ Upload success:', imageUrl);
        success(imageUrl);
      } else {
        console.error('❌ Upload failed: Invalid response format', response);
        failure('Upload failed: Invalid response format');
      }
    })
    .catch(error => {
      console.error('❌ Upload error:', error);
      console.error('❌ Error details:', {
        message: error.message,
        stack: error.stack,
        response: error.response
      });
      failure('Upload failed: ' + error.message);
    });
};

export const simpleTinymceConfig = {
  height: 400,
  menubar: true,
  branding: false,
  promotion: false,
  
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons'
  ],
  
  toolbar: 
    'undo redo | blocks | bold italic underline strikethrough | ' +
    'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ' +
    'link image media table | emoticons | removeformat | code fullscreen | help',
  
  // Backend-integrated image upload configuration
  images_upload_url: '/upload/image',
  images_upload_handler: (blobInfo, success, failure, progress) => {
    console.log('📤 TinyMCE native upload started:', blobInfo.filename());
    
    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());
    
    // Add authentication token
    const token = localStorage.getItem('token');
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    fetch('/upload/image', {
      method: 'POST',
      headers: headers,
      body: formData
    })
    .then(response => response.json())
    .then(result => {
      console.log('📤 TinyMCE upload response:', result);
      
      if (result.status === 1 && result.data && result.data.location) {
        console.log('✅ TinyMCE upload success:', result.data.location);
        success(result.data.location);
      } else {
        console.error('❌ TinyMCE upload failed:', result);
        failure(result.message || 'Upload failed');
      }
    })
    .catch(error => {
      console.error('❌ TinyMCE upload error:', error);
      failure('Upload failed: ' + error.message);
    });
  },
  
  // Enhanced image options
  image_title: true,
  image_description: false,
  image_dimensions: false,
  image_class_list: [
    { title: 'Responsive', value: 'img-responsive' },
    { title: 'Rounded', value: 'img-rounded' },
    { title: 'Circle', value: 'img-circle' }
  ],
  
  content_style: `
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
      font-size: 14px; 
      line-height: 1.6;
    }
    img { 
      max-width: 100%; 
      height: auto; 
    }
  `,
  
  // Smart upload configuration
  images_upload_handler: handleImageUpload,
  automatic_uploads: true,
  images_reuse_filename: true,
  
  // File picker for more upload options
  file_picker_types: 'image',
  file_picker_callback: (callback, value, meta) => {
    console.log('🗂️ File picker triggered for:', meta.filetype);
    
    if (meta.filetype === 'image') {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/jpeg,image/jpg,image/png,image/gif,image/webp');
      
      input.onchange = function () {
        const file = this.files[0];
        if (file) {
          console.log('📎 File picker selected:', {
            name: file.name,
            size: file.size,
            type: file.type
          });
          
          // Validate file type
          if (!file.type.startsWith('image/')) {
            console.error('❌ Invalid file type:', file.type);
            alert('Vui lòng chọn file ảnh hợp lệ (JPG, PNG, GIF, WebP)');
            return;
          }
          
          // Validate file size (10MB max)
          if (file.size > 10 * 1024 * 1024) {
            console.error('❌ File too large:', file.size);
            alert('File ảnh quá lớn. Vui lòng chọn file nhỏ hơn 10MB');
            return;
          }
          
          smartUploadImage(file)
            .then(response => {
              console.log('📎 File picker upload response:', response);
              
              if (response && (response.location || response.url)) {
                const imageUrl = response.location || response.url;
                console.log('✅ File picker upload success:', imageUrl);
                callback(imageUrl, { 
                  alt: file.name.replace(/\.[^/.]+$/, ''),
                  title: file.name 
                });
              } else {
                console.error('❌ File picker: Invalid response format', response);
                alert('Upload failed: Invalid response from server');
              }
            })
            .catch(error => {
              console.error('❌ File picker upload failed:', error);
              alert('Upload failed: ' + error.message);
            });
        }
      };
      
      input.click();
    }
  },
  
  // Paste image support
  paste_data_images: true,
  
  // Simplified settings
  resize: 'both',
  min_height: 300,
  max_height: 800
};

export default simpleTinymceConfig;