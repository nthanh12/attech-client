// Smart chatbot responses for ATTECH
export const chatbotResponses = {
  // Greeting patterns
  greeting: {
    patterns: ['xin chào', 'chào', 'hello', 'hi', 'hey', 'chào bạn'],
    responses: [
      '👋 Xin chào! Tôi là trợ lý ảo của ATTECH. Tôi có thể giúp bạn tìm hiểu về dịch vụ và sản phẩm của chúng tôi.',
      '🎯 Chào bạn! Rất vui được hỗ trợ bạn. ATTECH chuyên về kỹ thuật hàng không - bạn muốn biết gì nhỉ?',
      '⚡ Hi! Tôi là AI assistant của ATTECH. Hãy cho tôi biết bạn cần hỗ trợ gì nhé!'
    ]
  },

  // Services related
  services: {
    patterns: ['dịch vụ', 'service', 'cns', 'bay kiểm tra', 'hiệu chuẩn', 'navigation', 'surveillance'],
    responses: [
      '🛩️ ATTECH cung cấp 3 dịch vụ chính:\n\n🔹 **CNS** - Communication, Navigation & Surveillance\n🔹 **Bay kiểm tra hiệu chuẩn** - Flight inspection services  \n🔹 **Sản xuất thiết bị hàng không** - Aviation equipment manufacturing\n\nBạn muốn tìm hiểu chi tiết dịch vụ nào?',
      '✈️ Chúng tôi là đơn vị hàng đầu về:\n\n• Dịch vụ kỹ thuật CNS/ATM\n• Bay kiểm tra hiệu chuẩn thiết bị dẫn đường\n• Sản xuất, tích hợp thiết bị hàng không\n\nBạn có câu hỏi cụ thể nào không?'
    ]
  },

  // Products related  
  products: {
    patterns: ['sản phẩm', 'product', 'thiết bị', 'equipment', 'radar', 'dvor', 'dme'],
    responses: [
      '📡 Sản phẩm của ATTECH bao gồm:\n\n🔸 **CNS/ATM**: Radar, DVOR/DME, ADS-B\n🔸 **CNHK**: Thiết bị dẫn đường hàng không\n🔸 **BHC**: Thiết bị bay kiểm tra hiệu chuẩn\n\nBạn quan tâm đến loại thiết bị nào?',
      '🎛️ ATTECH sản xuất nhiều thiết bị chất lượng cao:\n\n• Hệ thống radar hiện đại\n• Thiết bị DVOR/DME chính xác\n• Giải pháp ADS-B toàn diện\n\nCần báo giá sản phẩm nào không?'
    ]
  },

  // Contact & support
  contact: {
    patterns: ['liên hệ', 'contact', 'địa chỉ', 'phone', 'email', 'hotline', 'support'],
    responses: [
      '📞 **Thông tin liên hệ ATTECH:**\n\n📍 **Địa chỉ**: Số 120 Trần Duy Hưng, Hà Nội\n☎️ **Điện thoại**: (024) 3843-3061\n📧 **Email**: contact@attech.vn\n🌐 **Website**: attech.vn\n\nChúng tôi sẵn sàng hỗ trợ bạn 24/7!',
      '🏢 **Liên hệ với ATTECH:**\n\n• **Hotline**: (024) 3843-3061\n• **Email hỗ trợ**: support@attech.vn  \n• **Địa chỉ**: 120 Trần Duy Hưng, Cầu Giấy, Hà Nội\n\nBạn có thể ghé thăm trực tiếp hoặc gọi điện cho chúng tôi!'
    ]
  },

  // Company info
  company: {
    patterns: ['công ty', 'company', 'giới thiệu', 'about', 'lịch sử', 'attech'],
    responses: [
      '🏛️ **Về ATTECH:**\n\nThành lập từ 1986, ATTECH là công ty TNHH Kỹ thuật Quản lý bay - thành viên của Tổng công ty Quản lý bay Việt Nam (VATM).\n\n✨ **15+ năm** kinh nghiệm\n🎯 **Chuyên nghiệp** về kỹ thuật hàng không\n🌟 **Đối tác tin cậy** của ngành hàng không VN',
      '⭐ **ATTECH - Đơn vị dẫn đầu:**\n\n• 38 năm phát triển (1986-2024)\n• Chuyên gia về CNS/ATM\n• ISO 9001:2015 certified\n• Đối tác quốc tế uy tín\n\nChúng tôi tự hào phục vụ ngành hàng không Việt Nam!'
    ]
  },

  // Pricing & quotes
  pricing: {
    patterns: ['giá', 'báo giá', 'price', 'quote', 'cost', 'chi phí'],
    responses: [
      '💰 **Báo giá dịch vụ:**\n\nĐể có báo giá chính xác nhất, tôi cần thêm thông tin:\n\n🔹 Loại dịch vụ/sản phẩm quan tâm\n🔹 Quy mô dự án\n🔹 Yêu cầu kỹ thuật cụ thể\n\n📞 Gọi **(024) 3843-3061** để được tư vấn miễn phí!',
      '📊 **Tư vấn báo giá:**\n\nChúng tôi cung cấp báo giá miễn phí và tư vấn chuyên sâu.\n\n✅ Liên hệ ngay: **contact@attech.vn**\n✅ Hotline: **(024) 3843-3061**\n✅ Or chat trực tiếp tại đây!\n\nTeam sales sẽ phản hồi trong 30 phút.'
    ]
  },

  // Default fallback
  fallback: [
    '🤔 Tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể:\n\n• Hỏi về **dịch vụ** CNS/ATM\n• Tìm hiểu **sản phẩm** hàng không\n• Xem thông tin **liên hệ**\n• Chat với **nhân viên** hỗ trợ\n\nHoặc thử lại câu hỏi khác nhé! 😊',
    '💡 Tôi có thể giúp bạn về:\n\n🔸 Dịch vụ kỹ thuật hàng không\n🔸 Sản phẩm CNS/ATM\n🔸 Thông tin công ty\n🔸 Liên hệ và báo giá\n\nBạn muốn biết gì cụ thể hơn không?',
    '🎯 Xin lỗi, tôi chưa nắm được ý bạn. Hãy thử:\n\n• "**Dịch vụ của ATTECH**"\n• "**Sản phẩm hàng không**" \n• "**Liên hệ báo giá**"\n• "**Về công ty ATTECH**"\n\nTôi sẽ trả lời ngay! ⚡'
  ],

  // Thanks
  thanks: {
    patterns: ['cảm ơn', 'thanks', 'thank you', 'cám ơn'],
    responses: [
      '🙏 Rất vui được hỗ trợ bạn! Nếu cần thêm thông tin, đừng ngại liên hệ ATTECH nhé!',
      '😊 Không có gì! ATTECH luôn sẵn sàng đồng hành cùng bạn. Chúc bạn một ngày tốt lành!',
      '✨ Cảm ơn bạn đã quan tâm đến ATTECH! Hẹn gặp lại bạn sớm! 👋'
    ]
  }
};

// Smart response matcher
export const getSmartResponse = (userInput) => {
  const input = userInput.toLowerCase().trim();
  
  // Check each category
  for (const [category, data] of Object.entries(chatbotResponses)) {
    if (category === 'fallback') continue;
    
    const patterns = data.patterns || [];
    const responses = data.responses || [];
    
    // Check if any pattern matches
    const hasMatch = patterns.some(pattern => 
      input.includes(pattern.toLowerCase())
    );
    
    if (hasMatch && responses.length > 0) {
      // Return random response from matched category
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // Return fallback response
  return chatbotResponses.fallback[Math.floor(Math.random() * chatbotResponses.fallback.length)];
};

// Enhanced quick replies
export const smartQuickReplies = [
  { text: '🛩️ Dịch vụ CNS/ATM', keywords: 'dịch vụ cns' },
  { text: '📡 Sản phẩm hàng không', keywords: 'sản phẩm thiết bị' },
  { text: '💰 Báo giá dịch vụ', keywords: 'báo giá chi phí' },
  { text: '📞 Thông tin liên hệ', keywords: 'liên hệ địa chỉ' },
  { text: '🏛️ Về công ty ATTECH', keywords: 'công ty giới thiệu' },
  { text: '🎯 Tư vấn chuyên sâu', keywords: 'tư vấn hỗ trợ' }
];