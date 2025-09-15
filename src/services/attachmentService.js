// Attachment Service - Xử lý associate logic
import { associateAttachments, extractAttachmentIds } from "./uploadService";
import {
  extractTinyMCEAttachments,
  prepareTinyMCEContent,
} from "../config/tinymceConfig";

/**
 * Helper: Xử lý toàn bộ attachment flow khi save entity
 * - Extract attachment IDs từ featured image, content, và attachments
 * - Prepare content (thay blob URLs bằng data-attachment-id)
 * - Associate tất cả attachments với entity
 */
export const processEntityAttachments = async (
  entityData,
  entityType,
  entityId
) => {
  try {const allAttachmentIds = new Set();
    let processedContent = entityData.content;

    // 1. Featured image attachment
    if (entityData.featuredImageId) {
      allAttachmentIds.add(entityData.featuredImageId);
    }

    // 2. Process TinyMCE content (images đã upload sẵn)
    if (entityData.content) {
      const tinymceAttachments = extractTinyMCEAttachments(entityData.content);
      tinymceAttachments.forEach((id) => allAttachmentIds.add(id));

      // Content đã có server URLs, chỉ cần prepare
      processedContent = prepareTinyMCEContent(entityData.content);
    }

    // 3. Extract từ content HTML (data-attachment-id)
    if (processedContent) {
      const contentAttachments = extractAttachmentIds(processedContent);
      contentAttachments.forEach((id) => allAttachmentIds.add(id));
    }

    // 4. Manual attachments array
    if (entityData.attachmentIds && Array.isArray(entityData.attachmentIds)) {
      entityData.attachmentIds.forEach((id) => allAttachmentIds.add(id));
    }

    const attachmentIdsArray = Array.from(allAttachmentIds);// 5. Associate tất cả với entity
    if (attachmentIdsArray.length > 0) {
      await associateAttachments(attachmentIdsArray, entityType, entityId);}

    return {
      ...entityData,
      content: processedContent,
      processedAttachmentIds: attachmentIdsArray,
    };
  } catch (error) {throw error;
  }
};

/**
 * Helper: Xử lý featured image upload và preview
 */
export const handleFeaturedImageUpload = async (
  file,
  setPreviewUrl,
  setAttachmentId
) => {
  // Tạo preview URL ngay
  const previewUrl = URL.createObjectURL(file);
  setPreviewUrl(previewUrl);try {
    // Upload temp ngay - backend đã support đầy đủ!
    const { uploadFeaturedImage } = await import("./uploadService");
    const api = await import("../api");
    const result = await uploadFeaturedImage(file);// Thay blob URL bằng server URL
    const baseUrl = api.default.defaults.baseURL;
    const serverUrl = result.url?.startsWith("http")
      ? result.url
      : `${baseUrl}${result.url || `/api/attachments/${result.id}`}`;

    setPreviewUrl(serverUrl);
    setAttachmentId(result.id);

    // Cleanup blob URL
    URL.revokeObjectURL(previewUrl);
  } catch (error) {// Giữ blob URL nếu upload failed
    setAttachmentId(null);
  }
};

/**
 * Helper: Clean up attachments map sau khi save
 */
export const cleanupBlobUrls = () => {
  if (window.tinymceAttachmentMap) {
    window.tinymceAttachmentMap.clear();
  }
};

export default {
  processEntityAttachments,
  handleFeaturedImageUpload,
  cleanupBlobUrls,
};
