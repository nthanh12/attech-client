import api from "../api";

// ============================================================
// TEMP UPLOAD SERVICE - Luồng mới hoàn toàn
// ============================================================

/**
 * Bước 1: Upload temp file để preview ngay lập tức
 * - File được lưu vào uploads/temp/
 * - Tạo record với IsTemporary = true
 * - Trả về URL để preview ngay
 */
export const uploadTempFile = async (file) => {
  try {
    console.log("🔄 Temp upload:", file.name);

    const formData = new FormData();
    formData.append("File", file);

    const response = await api.post("/api/attachments", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("🔍 Upload response:", response.data);

    // Check if backend returned success
    if (response.data?.status === 1 && response.data?.data) {
      const result = response.data.data;

      return {
        id: result.id,
        url: result.url,
        isTemporary: result.isTemporary,
        fileName: result.fileName || file.name,
      };
    }

    // Check if backend returned error
    if (response.data?.status === 0) {
      const errorMsg = response.data?.message || "Upload failed";
      console.error("❌ Backend upload error:", errorMsg);
      throw new Error(`Backend Error: ${errorMsg}`);
    }

    // Check direct data format (alternative API)
    if (response.data?.id) {
      const result = response.data;

      return {
        id: result.id,
        url: result.url,
        isTemporary: result.isTemporary,
        fileName: result.fileName || file.name,
      };
    }

    // Check statusCode format (alternative API)
    if (response.data?.statusCode === 200 && response.data?.data) {
      const result = response.data.data;

      return {
        id: result.id,
        url: result.url,
        isTemporary: result.isTemporary,
        fileName: result.fileName || file.name,
      };
    }

    console.error("❌ Unexpected response format:", response.data);
    throw new Error("Unexpected API response format");
  } catch (error) {
    console.error("❌ Temp upload failed:", error);
    throw error;
  }
};

/**
 * Bước 2: Liên kết attachments với entity khi save
 * - Chuyển IsTemporary = false
 * - Gắn ObjectType và ObjectId
 */
export const associateAttachments = async (
  attachmentIds,
  objectType,
  objectId
) => {
  try {
    console.log("🔗 Associating:", { attachmentIds, objectType, objectId });

    const response = await api.post("/api/attachments/associate", {
      attachmentIds: attachmentIds,
      ObjectType: objectType,
      ObjectId: objectId,
    });

    return response.data;
  } catch (error) {
    console.error("❌ Associate failed:", error);
    throw error;
  }
};

/**
 * Helper: Tạo blob URL từ file để preview ngay lập tức
 */
export const createPreviewUrl = (file) => {
  return URL.createObjectURL(file);
};

/**
 * Helper: Extract attachment IDs từ content HTML
 */
export const extractAttachmentIds = (htmlContent) => {
  const attachmentIds = [];
  const regex = /data-attachment-id="(\d+)"/g;
  let match;

  while ((match = regex.exec(htmlContent)) !== null) {
    attachmentIds.push(parseInt(match[1]));
  }

  return attachmentIds;
};

// ============================================================
// SPECIFIC UPLOAD FUNCTIONS
// ============================================================

// TinyMCE upload
export const uploadForTinyMCE = async (file) => {
  return await uploadTempFile(file);
};

// Featured image upload
export const uploadFeaturedImage = async (file) => {
  return await uploadTempFile(file);
};

// Document upload
export const uploadDocument = async (file) => {
  return await uploadTempFile(file);
};

export default {
  uploadTempFile,
  associateAttachments,
  createPreviewUrl,
  extractAttachmentIds,
  uploadForTinyMCE,
  uploadFeaturedImage,
  uploadDocument,
};
