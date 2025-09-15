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
  try {const file = blobInfo.blob();
    
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
    const result = await uploadForTinyMCE(file);// Trả full server URL cho TinyMCE
    const baseUrl = api.defaults.baseURL;
    const serverUrl = result.url?.startsWith('http') 
      ? result.url 
      : `${baseUrl}${result.url || `/api/attachments/${result.id}`}`;
    success(serverUrl);
    
    // Lưu mapping server URL -> attachment ID để associate sau
    if (!window.tinymceAttachmentMap) {
      window.tinymceAttachmentMap = new Map();
    }
    window.tinymceAttachmentMap.set(serverUrl, result.id);} catch (error) {failure('Upload failed: ' + error.message);
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
      position: relative;
    }
    img { 
      height: auto; 
      cursor: pointer;
      max-width: none !important;
      position: static !important;
      display: inline-block;
      vertical-align: top;
    }
    img:hover {
      outline: 2px dashed #ccc !important;
    }
    img[data-mce-selected] {
      outline: 2px solid #0066cc !important;
    }
    /* Fix resize handles positioning */
    .mce-resizehandle {
      position: absolute !important;
      z-index: 1000 !important;
      background: #0066cc !important;
      border: 1px solid #fff !important;
      width: 7px !important;
      height: 7px !important;
      box-sizing: border-box !important;
    }
    .mce-resizehandle:hover {
      background: #0052cc !important;
    }
  `,
  
  // Upload config với luồng mới  
  images_upload_handler: handleImageUpload,
  automatic_uploads: true, // Enable để hỗ trợ drag & drop
  paste_data_images: true, // Enable paste images từ clipboard
  
  // Image resize settings - cho phép kéo để thay đổi kích thước ảnh  
  object_resizing: true,  // Enable resizing
  resize_img_proportional: false,  // Cho phép resize tự do
  images_upload_credentials: false,
  
  // Resize handles settings
  resize: true,  // Bật resize editor  
  statusbar: false,  // Tắt status bar
  
  // Setup callbacks để đảm bảo resize handles
  setup: function(editor) {
    editor.on('init', function() {// Add CSS to fix handle positioning
      try {
        const doc = editor.getDoc();
        const style = doc.createElement('style');
        style.innerHTML = `
          .mce-resizehandle {
            position: absolute !important;
            z-index: 1000 !important;
            background: #0066cc !important;
            border: 1px solid #fff !important;
            width: 7px !important;
            height: 7px !important;
            box-sizing: border-box !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        `;
        doc.head.appendChild(style);
      } catch (error) {}
    });
    
    editor.on('ObjectSelected', function(e) {// Force show resize handles
      setTimeout(() => {
        try {
          const selected = editor.selection.getNode();
          if (selected && selected.tagName === 'IMG') {editor.nodeChanged();
          }
        } catch (error) {}
      }, 100);
    });
  },
  
  // Image settings
  image_dimensions: false,  // Tắt dimension constraints
  image_class_list: false,  // Tắt class list
  image_advtab: true,      // Bật advanced tab trong image dialog
  
  // Tắt selection highlighting
  visual: false,           // Tắt visual aids
  
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

          try {// Upload ngay như handleImageUpload
            const result = await uploadForTinyMCE(file);// Trả full server URL
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
            window.tinymceAttachmentMap.set(serverUrl, result.id);} catch (error) {alert('Upload ảnh thất bại: ' + error.message);
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
  });return attachmentIds;
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
  });return htmlContent; // Content đã có server URLs rồi
};

export default tinymceConfig;