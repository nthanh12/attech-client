// Most basic TinyMCE configuration for emergency fallback
export const basicTinymceConfig = {
  height: 400,
  menubar: false,
  branding: false,
  
  plugins: [
    'lists', 'link', 'image', 'code', 'table'
  ],
  
  toolbar: 'undo redo | bold italic | bullist numlist | link image',
  
  content_style: 'body { font-family: Arial, sans-serif; font-size: 14px; }',
  
  // No upload handlers - just basic functionality
  paste_data_images: false,
  automatic_uploads: false
};

export default basicTinymceConfig;