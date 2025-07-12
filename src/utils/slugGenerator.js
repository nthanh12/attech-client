/**
 * Tạo slug từ title/name
 * @param {string} text - Text cần chuyển thành slug
 * @returns {string} - Slug đã được tạo
 */
export const generateSlug = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .normalize('NFD') // Chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu tiếng Việt
    .replace(/[^a-z0-9\s-]/g, '') // Chỉ giữ chữ cái, số, khoảng trắng và dấu gạch ngang
    .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, '-') // Loại bỏ dấu gạch ngang liên tiếp
    .replace(/^-+|-+$/g, '') // Loại bỏ dấu gạch ngang ở đầu và cuối
    .trim();
};

/**
 * Tạo slug duy nhất bằng cách thêm số nếu slug đã tồn tại
 * @param {string} text - Text cần chuyển thành slug
 * @param {Array} existingSlugs - Danh sách slug đã tồn tại
 * @returns {string} - Slug duy nhất
 */
export const generateUniqueSlug = (text, existingSlugs = []) => {
  let slug = generateSlug(text);
  let counter = 1;
  let uniqueSlug = slug;
  
  while (existingSlugs.includes(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
  
  return uniqueSlug;
};

/**
 * Validate slug format
 * @param {string} slug - Slug cần validate
 * @returns {boolean} - True nếu slug hợp lệ
 */
export const validateSlug = (slug) => {
  if (!slug) return false;
  
  // Kiểm tra format: chỉ chữ thường, số, dấu gạch ngang
  const slugRegex = /^[a-z0-9-]+$/;
  return slugRegex.test(slug);
};

/**
 * Tạo slug cho các entity khác nhau
 * @param {string} text - Text cần chuyển thành slug
 * @param {string} entityType - Loại entity (news, product, service, etc.)
 * @param {Array} existingSlugs - Danh sách slug đã tồn tại
 * @returns {string} - Slug duy nhất
 */
export const generateEntitySlug = (text, entityType = 'general', existingSlugs = []) => {
  const baseSlug = generateSlug(text);
  
  // Thêm prefix theo loại entity nếu cần
  let slug = baseSlug;
  if (entityType && entityType !== 'general') {
    slug = `${entityType}-${baseSlug}`;
  }
  
  return generateUniqueSlug(slug, existingSlugs);
}; 