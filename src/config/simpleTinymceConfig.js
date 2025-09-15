// Simple TinyMCE Configuration - Luồng mới
import { uploadForTinyMCE, createPreviewUrl } from '../services/uploadService';

// Simple upload handler theo luồng mới
const handleImageUpload = async (blobInfo, success, failure) => {
  try {
    // Processing image upload
    
    const file = blobInfo.blob();
    
    // 1. Tạo blob URL ngay để preview
    const previewUrl = createPreviewUrl(file);// 2. Upload temp ngầm
    const tempUpload = uploadForTinyMCE(file);
    
    // 3. Trả preview URL ngay
    success(previewUrl);
    
    // 4. Lưu mapping khi upload xong
    tempUpload.then(result => {
      if (!window.tinymceAttachmentMap) {
        window.tinymceAttachmentMap = new Map();
      }
      window.tinymceAttachmentMap.set(previewUrl, result.id);}).catch(error => {});
    
  } catch (error) {failure('Upload thất bại: ' + error.message);
  }
};

export const simpleTinymceConfig = {
  // Basic settings
  height: 400,
  menubar: false,
  branding: false,
  
  // Essential plugins only
  plugins: ['lists', 'link', 'image', 'table', 'code', 'fullscreen'],
  
  // Simple toolbar
  toolbar: 
    'bold italic underline | alignleft aligncenter alignright | ' +
    'bullist numlist | link image table | code fullscreen',
  
  // Upload configuration
  images_upload_handler: handleImageUpload,
  automatic_uploads: true,
  paste_data_images: true,
  
  // Simple content style
  content_style: `
    body { 
      font-family: Arial, sans-serif; 
      font-size: 14px; 
      line-height: 1.6;
      margin: 20px;
    }
    img { 
      max-width: 100%; 
      height: auto;
    }
  `,
  
  // Disable complex features
  convert_urls: false,
  relative_urls: false,
  validate: false
};

export default simpleTinymceConfig;