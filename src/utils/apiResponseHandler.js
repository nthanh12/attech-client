import { getApiBaseUrl } from "../config/apiConfig";

/**
 * Utility function để xử lý API response chung cho tất cả các category
 * @param {Object} response - Response từ API
 * @param {string} action - Hành động (create, update, delete)
 * @param {Function} onSuccess - Callback khi thành công
 * @param {Function} onError - Callback khi thất bại
 * @param {Function} setToast - Function để hiển thị toast
 */
export const handleApiResponse = (
  response,
  action,
  onSuccess,
  onError,
  setToast
) => {
  // API Response processed
  // Xử lý response - support cả documentation format và legacy format
  const isSuccess =
    (response && response.statusCode === 200) || // Documentation format
    (response && response.status === 1) || // PascalCase format
    (response && response.code === 200); // PascalCase Code format

  if (isSuccess) {
    // Thành công
    const successMessage = getSuccessMessage(action);

    // Gọi callback thành công
    onSuccess(response);

    // Set toast thành công
    setToast({
      show: true,
      message: successMessage,
      type: "success",
    });
    return true;
  } else {
    // Thất bại - hiển thị message từ API
    const errorMessage = response?.message || getErrorMessage(action);

    // Gọi callback thất bại
    onError(response);

    // Set toast lỗi
    setToast({
      show: true,
      message: errorMessage,
      type: "error",
    });
    return false;
  }
};

/**
 * Lấy message thành công theo action
 */
const getSuccessMessage = (action) => {
  const messages = {
    create: "Thêm danh mục thành công!",
    update: "Cập nhật danh mục thành công!",
    delete: "Xóa danh mục thành công!",
    createNews: "Thêm tin tức thành công!",
    updateNews: "Cập nhật tin tức thành công!",
    deleteNews: "Xóa tin tức thành công!",
    createProduct: "Thêm sản phẩm thành công!",
    updateProduct: "Cập nhật sản phẩm thành công!",
    deleteProduct: "Xóa sản phẩm thành công!",
    createService: "Thêm dịch vụ thành công!",
    updateService: "Cập nhật dịch vụ thành công!",
    deleteService: "Xóa dịch vụ thành công!",
    createNotification: "Thêm thông báo thành công!",
    updateNotification: "Cập nhật thông báo thành công!",
    deleteNotification: "Xóa thông báo thành công!",
  };
  return messages[action] || "Thao tác thành công!";
};

/**
 * Lấy message lỗi theo action
 */
const getErrorMessage = (action) => {
  const messages = {
    create: "Thêm mới thất bại",
    update: "Cập nhật thất bại",
    delete: "Xóa thất bại",
    createNews: "Thêm tin tức thất bại",
    updateNews: "Cập nhật tin tức thất bại",
    deleteNews: "Xóa tin tức thất bại",
    createProduct: "Thêm sản phẩm thất bại",
    updateProduct: "Cập nhật sản phẩm thất bại",
    deleteProduct: "Xóa sản phẩm thất bại",
    createService: "Thêm dịch vụ thất bại",
    updateService: "Cập nhật dịch vụ thất bại",
    deleteService: "Xóa dịch vụ thất bại",
    createNotification: "Thêm thông báo thất bại",
    updateNotification: "Cập nhật thông báo thất bại",
    deleteNotification: "Xóa thông báo thất bại",
  };
  return messages[action] || "Thao tác thất bại";
};

/**
 * Chuẩn bị dữ liệu category trước khi gửi API
 */
export const prepareCategoryData = (currentCategory) => {
  const data = {
    titleVi: currentCategory.titleVi?.trim() || "",
    titleEn: currentCategory.titleEn?.trim() || "",
    slugVi: currentCategory.slugVi?.trim() || "",
    slugEn: currentCategory.slugEn?.trim() || "",
    descriptionVi: currentCategory.descriptionVi?.trim() || "",
    descriptionEn: currentCategory.descriptionEn?.trim() || "",
    status: currentCategory.status === "active" ? 1 : 0,
    parentId: currentCategory.parentId ? parseInt(currentCategory.parentId) : null,
    order: parseInt(currentCategory.order) || 0,
  };
  return data;
};

/**
 * Chuẩn bị dữ liệu news trước khi gửi API
 */
export const prepareNewsData = (currentNews) => {
  // Xử lý imageUrl - giữ lại URL đã upload hoặc ảnh hiện tại
  let imageUrl = "";
  if (currentNews.imageUrl) {
    imageUrl = currentNews.imageUrl.toString().trim();
  } else if (currentNews.image) {
    imageUrl = currentNews.image.toString().trim();
  }

  // Validate image URL - prevent invalid values like "string"
  if (
    imageUrl === "string" ||
    imageUrl === "undefined" ||
    imageUrl === "null" ||
    imageUrl === "[object Object]"
  ) {
    imageUrl = "";
  }

  // Convert absolute URL to relative path for backend
  const baseUrl = getApiBaseUrl();
  if (imageUrl.startsWith(baseUrl)) {
    imageUrl = imageUrl.replace(baseUrl, "");
  }

  // Xử lý categoryId - đảm bảo > 0
  const categoryId =
    parseInt(
      currentNews.newsCategoryId ||
        currentNews.PostCategoryId ||
        currentNews.CategoryId ||
        currentNews.Category
    ) || 0;

  // Xử lý date format
  let timePosted = currentNews.timePosted || new Date().toISOString();
  if (timePosted && !timePosted.includes("T")) {
    // Nếu chỉ có date, thêm time
    timePosted = new Date(timePosted).toISOString();
  }

  let data = {
    titleVi: currentNews.titleVi?.trim() || "",
    titleEn: currentNews.titleEn?.trim() || "",
    descriptionVi: currentNews.descriptionVi?.trim() || "",
    descriptionEn: currentNews.descriptionEn?.trim() || "",
    contentVi: currentNews.contentVi?.trim() || "",
    contentEn: currentNews.contentEn?.trim() || "",
    newsCategoryId: categoryId,
    timePosted: timePosted,
    status: currentNews.status === "active" ? 1 : 0,
    isOutstanding: currentNews.isOutstanding || false,
    slugVi: currentNews.slugVi?.trim() || "",
    slugEn: currentNews.slugEn?.trim() || "",
    imageUrl: imageUrl,
  };// Enhanced validation
  const validationErrors = [];

  if (!data.titleVi || data.titleVi.trim() === "") {
    validationErrors.push("titleVi is required");
  }
  if (!data.descriptionVi || data.descriptionVi.trim() === "") {
    validationErrors.push("descriptionVi is required");
  }
  if (!data.contentVi || data.contentVi.trim() === "") {
    validationErrors.push("contentVi is required");
  }
  if (data.contentVi && data.contentVi.length < 10) {
    validationErrors.push(
      "contentVi too short: " + data.contentVi.length + " chars"
    );
  }
  if (
    data.contentEn &&
    data.contentEn.length > 0 &&
    data.contentEn.length < 10
  ) {
    validationErrors.push(
      "contentEn too short: " + data.contentEn.length + " chars"
    );
  }
  if (!data.newsCategoryId || data.newsCategoryId < 1) {
    validationErrors.push(
      "newsCategoryId must be > 0, got: " + data.newsCategoryId
    );
  }
  if (!data.timePosted) {
    validationErrors.push("timePosted is required");
  }
  if (data.imageUrl && data.imageUrl.length > 500) {
    validationErrors.push(
      "imageUrl path too long: " + data.imageUrl.length + " chars"
    );
  }

  if (validationErrors.length > 0) {
    throw new Error("Validation failed: " + validationErrors.join(", "));
  }

  // Data validation completed
  return data;
};

/**
 * Chuẩn bị dữ liệu notification trước khi gửi API
 */
export const prepareNotificationData = (currentNotification) => {
  // Xử lý imageUrl - giữ lại URL đã upload hoặc ảnh hiện tại
  let imageUrl = "";
  if (currentNotification.imageUrl) {
    imageUrl = currentNotification.imageUrl.toString().trim();
  } else if (currentNotification.image) {
    imageUrl = currentNotification.image.toString().trim();
  }

  // Validate image URL - prevent invalid values like "string"
  if (
    imageUrl === "string" ||
    imageUrl === "undefined" ||
    imageUrl === "null" ||
    imageUrl === "[object Object]"
  ) {
    imageUrl = "";
  }

  // Xử lý categoryId - đảm bảo > 0
  const categoryId =
    parseInt(
      currentNotification.notificationCategoryId ||
        currentNotification.CategoryId ||
        currentNotification.Category
    ) || 0;

  // Xử lý date format
  let timePosted = currentNotification.timePosted || new Date().toISOString();
  if (timePosted && !timePosted.includes("T")) {
    // Nếu chỉ có date, thêm time
    timePosted = new Date(timePosted).toISOString();
  }

  const data = {
    titleVi: currentNotification.titleVi?.trim() || "",
    titleEn: currentNotification.titleEn?.trim() || "",
    descriptionVi: currentNotification.descriptionVi?.trim() || "",
    descriptionEn: currentNotification.descriptionEn?.trim() || "",
    contentVi: currentNotification.contentVi?.trim() || "",
    contentEn: currentNotification.contentEn?.trim() || "",
    notificationCategoryId: categoryId,
    timePosted: timePosted,
    status: currentNotification.status === "active" ? 1 : 0,
    isOutstanding: currentNotification.isOutstanding || false,
    slugVi: currentNotification.slugVi?.trim() || "",
    slugEn: currentNotification.slugEn?.trim() || "",
    imageUrl: imageUrl,
  };
  return data;
};

/**
 * Chuẩn bị dữ liệu product trước khi gửi API
 */
export const prepareProductData = (currentProduct) => {
  // Xử lý imageUrl - giữ lại URL đã upload hoặc ảnh hiện tại
  let imageUrl = "";
  if (currentProduct.imageUrl) {
    imageUrl = currentProduct.imageUrl.toString().trim();
  } else if (currentProduct.image) {
    imageUrl = currentProduct.image.toString().trim();
  }

  // Validate image URL - prevent invalid values like "string"
  if (
    imageUrl === "string" ||
    imageUrl === "undefined" ||
    imageUrl === "null" ||
    imageUrl === "[object Object]"
  ) {
    imageUrl = "";
  }

  // Xử lý categoryId - đảm bảo > 0
  const categoryId = parseInt(currentProduct.productCategoryId) || 0;

  // Xử lý date format
  let timePosted = currentProduct.timePosted || new Date().toISOString();
  if (timePosted && !timePosted.includes("T")) {
    // Nếu chỉ có date, thêm time
    try {
      timePosted = new Date(timePosted + "T00:00:00").toISOString();
    } catch (error) {
      timePosted = new Date().toISOString();
    }
  }

  const data = {
    titleVi: currentProduct.titleVi?.trim() || "",
    titleEn: currentProduct.titleEn?.trim() || "",
    descriptionVi: currentProduct.descriptionVi?.trim() || "",
    descriptionEn: currentProduct.descriptionEn?.trim() || "",
    contentVi: currentProduct.contentVi?.trim() || "",
    contentEn: currentProduct.contentEn?.trim() || "",
    productCategoryId: categoryId,
    timePosted: timePosted,
    status: currentProduct.status === "active" ? 1 : 0,
    slugVi: currentProduct.slugVi?.trim() || "",
    slugEn: currentProduct.slugEn?.trim() || "",
    imageUrl: imageUrl,
    isOutstanding: currentProduct.isOutstanding || false,
  };// Validation trước khi return
  if (!data.titleVi || !data.titleEn) {}
  if (categoryId <= 0) {}
  if (!data.imageUrl) {}

  return data;
};

/**
 * Chuẩn bị dữ liệu service trước khi gửi API
 */
export const prepareServiceData = (currentService) => {
  // Xử lý imageUrl - giữ lại URL đã upload hoặc ảnh hiện tại
  let imageUrl = "";
  if (currentService.imageUrl) {
    imageUrl = currentService.imageUrl.toString().trim();
  } else if (currentService.image) {
    imageUrl = currentService.image.toString().trim();
  }

  // Validate image URL - prevent invalid values like "string"
  if (
    imageUrl === "string" ||
    imageUrl === "undefined" ||
    imageUrl === "null" ||
    imageUrl === "[object Object]"
  ) {
    imageUrl = "";
  }

  // Xử lý date format
  let timePosted =
    currentService.timePosted ||
    currentService.publishDate ||
    new Date().toISOString();
  if (timePosted && !timePosted.includes("T")) {
    // Nếu chỉ có date, thêm time
    try {
      timePosted = new Date(timePosted + "T00:00:00").toISOString();
    } catch (error) {
      timePosted = new Date().toISOString();
    }
  }

  const data = {
    titleVi: currentService.titleVi?.trim() || "",
    titleEn: currentService.titleEn?.trim() || "",
    descriptionVi: currentService.descriptionVi?.trim() || "",
    descriptionEn: currentService.descriptionEn?.trim() || "",
    contentVi: currentService.contentVi?.trim() || "",
    contentEn: currentService.contentEn?.trim() || "",
    timePosted: timePosted,
    status: currentService.status === "active" ? 1 : 0,
    slugVi: currentService.slugVi?.trim() || "",
    slugEn: currentService.slugEn?.trim() || "",
    imageUrl: imageUrl,
    isOutstanding: currentService.isOutstanding || false,
  };
  return data;
};

/**
 * Xử lý lỗi chung
 */
export const handleApiError = (error, setToast, action = "thao tác") => {
  setToast({
    show: true,
    message: `Lỗi khi ${action}: ` + (error.message || "Unknown error"),
    type: "error",
  });
};

