// TinyMCE Configuration with Backend Upload Integration
let uploadImage;
try {
  uploadImage = require('../services/uploadService').uploadImage;
} catch (error) {
  console.warn('Upload service not available:', error);
  uploadImage = () => Promise.reject('Upload service not configured');
}

// Base URL từ environment hoặc default
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

// TinyMCE upload handler tương thích với BE endpoints
const handleImageUpload = (blobInfo, success, failure) => {
  // Tạo FormData để upload file
  const formData = new FormData();
  formData.append('file', blobInfo.blob(), blobInfo.filename());

  let uploadResult;
  try {
    uploadResult = uploadImage(blobInfo.blob());
  } catch (err) {
    console.error('TinyMCE uploadImage threw error:', err);
    failure('Upload thất bại: Lỗi khi gọi uploadImage');
    return;
  }

  // Kiểm tra nếu không phải Promise
  if (!uploadResult || typeof uploadResult.then !== 'function') {
    console.error('TinyMCE uploadImage không trả về Promise:', uploadResult);
    failure('Upload thất bại: uploadImage không trả về Promise');
    return;
  }

  uploadResult
    .then(response => {
      // Ưu tiên lấy location trong response.data.location
      if (response && response.data && response.data.location) {
        success(response.data.location);
      } else if (response && response.location) {
        success(response.location);
      } else if (response && response.url) {
        success(response.url);
      } else {
        failure('Upload thất bại: Không nhận được URL từ backend');
      }
    })
    .catch(error => {
      console.error('TinyMCE upload error:', error);
      failure('Upload thất bại: ' + (error.message || 'Lỗi không xác định'));
    });
};

// Multi-file upload handler
const handleMultiUpload = (files, success, failure) => {
  const formData = new FormData();
  
  // Append multiple files
  Array.from(files).forEach((file, index) => {
    formData.append('files', file);
  });

  // Upload to multi-upload endpoint
  fetch(`${API_BASE_URL}/api/upload/multi-upload`, {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      // BE trả về {locations: ["url1", "url2"]}
      if (data && data.locations) {
        success(data.locations);
      } else {
        failure('Multi-upload thất bại');
      }
    })
    .catch(error => {
      console.error('Multi-upload error:', error);
      failure('Multi-upload thất bại: ' + error.message);
    });
};

// Cấu hình TinyMCE hoàn chỉnh
export const tinymceConfig = {
  // Upload configuration
  images_upload_handler: handleImageUpload,
  images_upload_url: `${API_BASE_URL}/api/upload/image`, // Backup URL
  images_upload_credentials: false,
  images_reuse_filename: true,
  
  // File picker configuration
  file_picker_types: 'image media',
  file_picker_callback: (callback, value, meta) => {
    // Tạo input file element
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    
    if (meta.filetype === 'image') {
      input.setAttribute('accept', 'image/*');
    } else if (meta.filetype === 'media') {
      input.setAttribute('accept', 'video/*,audio/*');
    }
    
    input.onchange = function () {
      const file = this.files[0];
      if (!file) return;
      
      // Upload file based on type
      let uploadEndpoint = '/api/upload/image';
      if (meta.filetype === 'media') {
        uploadEndpoint = '/api/upload/video';
      }
      
      const formData = new FormData();
      formData.append('file', file);
      
      fetch(`${API_BASE_URL}${uploadEndpoint}`, {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.location) {
            callback(data.location, { alt: file.name });
          }
        })
        .catch(error => {
          console.error('File picker upload error:', error);
        });
    };
    
    input.click();
  },
  
  // Basic configuration
  height: 400,
  menubar: true,
  branding: false,
  promotion: false,
  
  // Plugins
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'help', 'wordcount',
    'emoticons', 'codesample'
  ],
  
  // Toolbar
  toolbar: 
    'undo redo | blocks | bold italic underline strikethrough forecolor backcolor | ' +
    'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ' +
    'link image media table codesample charmap emoticons | removeformat | help',
  
  // Content styling
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
    table { 
      width: 100%; 
      border-collapse: collapse; 
    }
    table th, table td { 
      border: 1px solid #ddd; 
      padding: 8px; 
    }
  `,
  
  // Image configuration
  image_advtab: true,
  image_caption: true,
  image_title: true,
  image_description: false,
  
  // Link configuration
  link_title: false,
  link_context_toolbar: true,
  
  // Table configuration
  table_use_colgroups: true,
  table_responsive_width: true,
  
  // Media configuration
  media_alt_source: false,
  media_poster: false,
  
  // Code sample configuration
  codesample_languages: [
    { text: 'HTML/XML', value: 'markup' },
    { text: 'JavaScript', value: 'javascript' },
    { text: 'CSS', value: 'css' },
    { text: 'PHP', value: 'php' },
    { text: 'Python', value: 'python' },
    { text: 'Java', value: 'java' },
    { text: 'C#', value: 'csharp' },
    { text: 'SQL', value: 'sql' }
  ],
  
  // Paste configuration
  paste_data_images: true,
  paste_as_text: false,
  paste_word_valid_elements: "b,strong,i,em,h1,h2,h3,h4,h5,h6",
  
  // Advanced options
  extended_valid_elements: 'script[src|async|defer|type|charset]',
  custom_elements: '~custom-element',
  
  // Auto-resize
  resize: 'both',
  min_height: 300,
  max_height: 800,
  
  // Language support - remove if language files are not available
  // language: 'vi',
  
  // Accessibility
  a11y_advanced_options: true,
  
  // Performance
  cache_suffix: '?v=' + new Date().getTime()
};

// Cấu hình cho từng loại editor
export const newsEditorConfig = {
  ...tinymceConfig,
  height: 500,
  plugins: [
    ...tinymceConfig.plugins,
    'autosave', 'wordcount'
  ],
  toolbar: tinymceConfig.toolbar + ' | wordcount autosave',
  autosave_ask_before_unload: true,
  autosave_interval: '30s',
  autosave_prefix: 'news-editor-',
  wordcount_cleanregex: /[^\w\s]/g,
};

export const serviceEditorConfig = {
  ...tinymceConfig,
  height: 400,
  plugins: tinymceConfig.plugins.filter(p => p !== 'codesample'),
  toolbar: tinymceConfig.toolbar.replace('codesample ', ''),
};

export const productEditorConfig = {
  ...tinymceConfig,
  height: 350,
  image_caption: false,
  table_responsive_width: false,
};

// Test function để kiểm tra kết nối BE
export const testUploadConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/upload/image`, {
      method: 'OPTIONS',
    });
    
    if (response.ok) {
      console.log('✅ Upload endpoint connection successful');
      return true;
    } else {
      console.warn('⚠️ Upload endpoint returned:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Upload endpoint connection failed:', error);
    return false;
  }
};

export default tinymceConfig;