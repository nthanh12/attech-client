// TinyMCE Configuration - Luồng mới hoàn toàn 
import { uploadForTinyMCE, createPreviewUrl } from '../services/uploadService';
import api from '../api';

// Import TinyMCE locally (không dùng CDN)
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/content/default/content.min.css";
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/help";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/charmap";
import "tinymce/plugins/preview";
import "tinymce/plugins/anchor";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/codesample";

// 🆕 NEW: TinyMCE upload handler - upload ngay như featured image
const handleImageUpload = async (blobInfo, success, failure) => {
  try {
    console.log('🔄 TinyMCE upload starting...');
    
    const file = blobInfo.blob();
    
    // Validate file
    if (!file || file.size === 0) {
      failure('Invalid file');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      failure('File too large (max 10MB)');
      return;
    }
    
    // Upload temp ngay - backend đã support đầy đủ!
    const result = await uploadForTinyMCE(file);
    console.log('✅ TinyMCE temp upload completed:', result);
    
    // Trả full server URL cho TinyMCE
    const baseUrl = api.defaults.baseURL;
    const serverUrl = result.url?.startsWith('http') 
      ? result.url 
      : `${baseUrl}${result.url || `/api/attachments/${result.id}`}`;
    success(serverUrl);
    
    // Lưu mapping server URL -> attachment ID để associate sau
    if (!window.tinymceAttachmentMap) {
      window.tinymceAttachmentMap = new Map();
    }
    window.tinymceAttachmentMap.set(serverUrl, result.id);
    
    console.log('🗺️ Saved TinyMCE mapping:', serverUrl, '->', result.id);
    
  } catch (error) {
    console.error('❌ TinyMCE upload failed:', error);
    failure('Upload failed: ' + error.message);
  }
};

// TinyMCE config với luồng upload mới
export const tinymceConfig = {
  height: 300,
  menubar: true,
  branding: false,
  promotion: false,
  // language: "vi", // Remove để dùng English mặc định
  language_load: false, // Không tự động load language file
  plugins: [
    "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
    "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
    "insertdatetime", "media", "table", "help", "wordcount", "emoticons", "codesample"
  ],
  toolbar: 'undo redo | blocks | bold italic underline strikethrough | ' +
    'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | ' +
    'link image media table | removeformat | fullscreen | help',
  
  // URL settings
  convert_urls: false,
  relative_urls: false,
  remove_script_host: false,
  validate: true,
  verify_html: false,
  cache_suffix: "",
  
  // Fix DOM processing issues
  element_format: 'html',
  entity_encoding: 'raw',
  fix_list_elements: true,
  
  // Disable problematic DOM processing
  urlconverter_callback: false,
  cleanup: false,
  cleanup_on_startup: false,
  trim_span_elements: false,
  verify_css_classes: false,
  
  // Fullscreen settings để fix vấn đề trong modal
  fullscreen_native: false,
  fullscreen_new_window: false,
  
  // Fix z-index để TinyMCE dialogs và dropdowns hiển thị đúng
  skin: false,
  theme: 'silver',
  
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
  `,
  
  // Upload config với luồng mới  
  images_upload_handler: handleImageUpload,
  automatic_uploads: false, // Disable để tránh conflict
  paste_data_images: false, // Disable paste images
  
  // Modal compatibility
  target_list: false,
  link_list: false,
  image_list: false,
  link_title: false,
  default_link_target: "_blank",
  
  // File picker
  file_picker_types: "image",
  file_picker_callback: async (callback, value, meta) => {
    if (meta.filetype === "image") {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");

      input.onchange = async function () {
        const file = this.files[0];
        if (file) {
          if (file.size > 10 * 1024 * 1024) {
            alert("File quá lớn! Vui lòng chọn ảnh nhỏ hơn 10MB");
            return;
          }

          try {
            console.log('🔄 File picker upload starting...');
            
            // Upload ngay như handleImageUpload
            const result = await uploadForTinyMCE(file);
            console.log('✅ File picker temp upload completed:', result);
            
            // Trả full server URL
            const baseUrl = api.defaults.baseURL;
            const serverUrl = result.url?.startsWith('http') 
              ? result.url 
              : `${baseUrl}${result.url || `/api/attachments/${result.id}`}`;
            callback(serverUrl, {
              alt: file.name.replace(/\.[^/.]+$/, ""),
              title: file.name,
            });
            
            // Lưu mapping
            if (!window.tinymceAttachmentMap) {
              window.tinymceAttachmentMap = new Map();
            }
            window.tinymceAttachmentMap.set(serverUrl, result.id);
            
            console.log('🗺️ File picker mapping saved:', serverUrl, '->', result.id);
            
          } catch (error) {
            console.error('❌ File picker failed:', error);
            alert('Upload ảnh thất bại: ' + error.message);
          }
        }
      };

      input.click();
    }
  }
};

// Helper: Extract attachment IDs từ TinyMCE content
export const extractTinyMCEAttachments = (htmlContent) => {
  const attachmentIds = [];
  
  if (!window.tinymceAttachmentMap || !htmlContent) {
    return attachmentIds;
  }
  
  // Tìm tất cả server URLs trong content
  window.tinymceAttachmentMap.forEach((attachmentId, serverUrl) => {
    if (htmlContent.includes(serverUrl) && !attachmentIds.includes(attachmentId)) {
      attachmentIds.push(attachmentId);
    }
  });
  
  console.log('🔍 Extracted TinyMCE attachments:', attachmentIds);
  return attachmentIds;
};

// Helper: Extract attachment IDs từ TinyMCE content (images đã upload)
export const prepareTinyMCEContent = (htmlContent) => {
  if (!window.tinymceAttachmentMap || !htmlContent) {
    return htmlContent;
  }
  
  const attachmentIds = [];
  
  // Extract attachment IDs từ content
  window.tinymceAttachmentMap.forEach((attachmentId, serverUrl) => {
    if (htmlContent.includes(serverUrl) && !attachmentIds.includes(attachmentId)) {
      attachmentIds.push(attachmentId);
    }
  });
  
  console.log('🔧 TinyMCE content ready, attachments:', attachmentIds);
  return htmlContent; // Content đã có server URLs rồi
};

export default tinymceConfig;