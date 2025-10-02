/**
 * Maintenance Mode Configuration
 *
 * Để bật/tắt chế độ bảo trì:
 * - Đổi enabled: true/false
 * - Commit và deploy code
 */

export const MAINTENANCE_MODE = {
  // Bật/tắt maintenance mode
  enabled: true, // ← Đổi thành true để bật maintenance mode

  // Thông báo hiển thị
  message: {
    vi: "Hệ thống đang nâng cấp",
    en: "System is under maintenance",
  },

  // Mô tả chi tiết
  description: {
    vi: "Chúng tôi đang thực hiện nâng cấp hệ thống để cải thiện trải nghiệm của bạn. Vui lòng quay lại sau.",
    en: "We are upgrading our system to improve your experience. Please come back later.",
  },

  // Thời gian dự kiến hoàn thành (format: YYYY-MM-DD HH:mm)
  estimatedEndTime: "2025-10-02 20:00",

  // Cho phép admin truy cập khi maintenance (tùy chọn)
  allowAdminAccess: true,

  // Danh sách IP được phép truy cập (tùy chọn)
  whitelistedIPs: [
    // "192.168.1.1",
  ],

  // Thông tin liên hệ
  contact: {
    email: "attech@attech.com.vn",
    phone: "024.38271914",
  },
};
