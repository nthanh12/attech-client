// Advanced AI Engine for ATTECH Chatbot
// Includes NLP processing, intent recognition, and context understanding

export class ATTECHAIEngine {
  constructor() {
    this.conversationHistory = [];
    this.userContext = {
      interests: [],
      askedTopics: [],
      currentIntent: null,
      sentiment: 'neutral'
    };
    
    // Enhanced knowledge base with deeper technical content
    this.knowledgeBase = {
      // Technical Services
      cns: {
        keywords: ['cns', 'communication', 'navigation', 'surveillance', 'atm', 'hàng không', 'radar', 'dẫn đường'],
        concepts: ['quản lý không lưu', 'hệ thống dẫn đường', 'giám sát bay', 'thông tin liên lạc'],
        responses: {
          overview: 'ATTECH chuyên về hệ thống CNS/ATM - bao gồm Communication (Thông tin liên lạc), Navigation (Dẫn đường), và Surveillance (Giám sát). Chúng tôi cung cấp giải pháp toàn diện cho quản lý không lưu.',
          technical: 'Hệ thống CNS/ATM của ATTECH bao gồm: Radar giám sát không lưu, thiết bị DVOR/DME chính xác cao, hệ thống ADS-B hiện đại, và các giải pháp thông tin liên lạc hàng không tiên tiến.',
          benefits: 'Với 15+ năm kinh nghiệm, ATTECH đảm bảo độ chính xác 99.9%, tuân thủ tiêu chuẩn ICAO, và hỗ trợ 24/7 cho các sân bay và trung tâm quản lý không lưu.'
        }
      },
      
      products: {
        keywords: ['sản phẩm', 'thiết bị', 'radar', 'dvor', 'dme', 'ads-b', 'equipment', 'manufacturing'],
        concepts: ['sản xuất thiết bị', 'tích hợp hệ thống', 'chất lượng cao', 'công nghệ tiên tiến'],
        responses: {
          overview: 'ATTECH sản xuất và tích hợp các thiết bị hàng không chất lượng cao: Radar giám sát, DVOR/DME, ADS-B, và các hệ thống dẫn đường chuyên dụng.',
          technical: 'Sản phẩm ATTECH đạt chứng nhận ISO 9001:2015, tuân thủ tiêu chuẩn ICAO Annex 10, với độ chính xác ±1°, phạm vi hoạt động 200NM, và khả năng tương thích với các hệ thống quốc tế.',
          quality: 'Mỗi sản phẩm ATTECH trải qua 100+ test cases, được kiểm định bằng thiết bị hiệu chuẩn quốc tế, và có bảo hành 3-5 năm với dịch vụ bảo trì toàn diện.'
        }
      },
      
      services: {
        keywords: ['dịch vụ', 'bay kiểm tra', 'hiệu chuẩn', 'flight inspection', 'calibration', 'maintenance'],
        concepts: ['bay kiểm tra thiết bị', 'hiệu chuẩn hệ thống', 'bảo trì kỹ thuật', 'tư vấn chuyên môn'],
        responses: {
          overview: 'ATTECH cung cấp dịch vụ bay kiểm tra hiệu chuẩn thiết bị dẫn đường hàng không, bảo trì hệ thống CNS/ATM, và tư vấn kỹ thuật chuyên sâu.',
          process: 'Quy trình bay kiểm tra của ATTECH: Lập kế hoạch bay → Thực hiện bay kiểm tra → Phân tích dữ liệu → Báo cáo kết quả → Đưa ra khuyến nghị kỹ thuật.',
          equipment: 'ATTECH sở hữu máy bay Cessna 414 được trang bị hệ thống kiểm tra hiện đại, đạt chứng nhận từ Cục Hàng không Việt Nam và tuân thủ tiêu chuẩn ICAO Doc 8071.'
        }
      },
      
      company: {
        keywords: ['công ty', 'attech', 'lịch sử', 'giới thiệu', 'about', 'history', 'vatm'],
        concepts: ['thành lập 1986', 'thành viên VATM', 'kinh nghiệm 38 năm', 'đối tác tin cậy'],
        responses: {
          history: 'ATTECH - Công ty TNHH Kỹ thuật Quản lý bay được thành lập năm 1986, là thành viên của Tổng công ty Quản lý bay Việt Nam (VATM). Với 38 năm phát triển, chúng tôi đã trở thành đơn vị dẫn đầu về kỹ thuật hàng không.',
          achievements: 'ATTECH tự hào với 150+ dự án thành công, phục vụ 20+ sân bay quốc tế, xuất khẩu thiết bị sang 5 quốc gia ASEAN, và nhận được nhiều bằng khen từ Bộ GTVT.',
          vision: 'Tầm nhìn của ATTECH: Trở thành công ty kỹ thuật hàng không hàng đầu khu vực, đóng góp vào sự phát triển bền vững của ngành hàng không Việt Nam và quốc tế.'
        }
      }
    };
    
    // Intent patterns with context understanding
    this.intentPatterns = {
      greeting: {
        patterns: [/^(xin )?chào/i, /^hi/i, /^hello/i, /^hey/i],
        confidence: 0.9,
        context: 'social'
      },
      question: {
        patterns: [/\?/, /(gì|sao|thế nào|như thế nào|tại sao|vì sao)/i, /(what|how|why|when|where)/i],
        confidence: 0.8,
        context: 'inquiry'
      },
      request_info: {
        patterns: [/(tôi muốn|cần|cho tôi|giúp tôi)/i, /(thông tin|chi tiết|tìm hiểu)/i],
        confidence: 0.7,
        context: 'information_seeking'
      },
      pricing: {
        patterns: [/(giá|chi phí|báo giá|cost|price)/i, /(bao nhiêu|얼마)/i],
        confidence: 0.8,
        context: 'commercial'
      },
      contact: {
        patterns: [/(liên hệ|gọi|email|địa chỉ)/i, /(contact|phone|address)/i],
        confidence: 0.8,
        context: 'contact_seeking'
      }
    };
  }

  // Advanced text preprocessing with Vietnamese support
  preprocessText(text) {
    return text
      .toLowerCase()
      .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
      .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
      .replace(/[ìíịỉĩ]/g, 'i')
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
      .replace(/[ùúụủũưừứựửữ]/g, 'u')
      .replace(/[ỳýỵỷỹ]/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Intent recognition with confidence scoring
  recognizeIntent(text) {
    const processed = this.preprocessText(text);
    let bestIntent = { name: 'unknown', confidence: 0, context: 'general' };
    
    for (const [intentName, intentData] of Object.entries(this.intentPatterns)) {
      for (const pattern of intentData.patterns) {
        if (pattern.test(text) || pattern.test(processed)) {
          if (intentData.confidence > bestIntent.confidence) {
            bestIntent = {
              name: intentName,
              confidence: intentData.confidence,
              context: intentData.context
            };
          }
        }
      }
    }
    
    return bestIntent;
  }

  // Topic extraction with semantic understanding
  extractTopics(text) {
    const processed = this.preprocessText(text);
    const words = processed.split(' ');
    const extractedTopics = [];
    
    for (const [topic, data] of Object.entries(this.knowledgeBase)) {
      let score = 0;
      
      // Direct keyword matching
      for (const keyword of data.keywords) {
        if (processed.includes(keyword)) {
          score += 2;
        }
      }
      
      // Concept matching (semantic similarity)
      for (const concept of data.concepts) {
        const conceptWords = concept.split(' ');
        const matches = conceptWords.filter(word => 
          words.some(userWord => 
            userWord.length > 2 && (
              word.includes(userWord) || 
              userWord.includes(word) ||
              this.calculateSimilarity(word, userWord) > 0.7
            )
          )
        );
        score += matches.length * 1.5;
      }
      
      if (score > 0) {
        extractedTopics.push({ topic, score, confidence: Math.min(score / 5, 1) });
      }
    }
    
    return extractedTopics.sort((a, b) => b.score - a.score);
  }

  // String similarity calculation (Levenshtein-based)
  calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  levenshteinDistance(str1, str2) {
    const matrix = Array(str2.length + 1).fill().map(() => Array(str1.length + 1).fill(0));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + cost
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  // Context-aware response generation
  generateResponse(userInput) {
    // Add to conversation history
    this.conversationHistory.push({
      input: userInput,
      timestamp: new Date(),
      processed: this.preprocessText(userInput)
    });

    // Keep only last 10 conversations for context
    if (this.conversationHistory.length > 10) {
      this.conversationHistory = this.conversationHistory.slice(-10);
    }

    // Recognize intent and extract topics
    const intent = this.recognizeIntent(userInput);
    const topics = this.extractTopics(userInput);
    
    // Update user context
    this.userContext.currentIntent = intent.name;
    if (topics.length > 0) {
      this.userContext.interests = [...new Set([...this.userContext.interests, ...topics.map(t => t.topic)])];
      this.userContext.askedTopics.push(topics[0].topic);
    }

    // Generate contextual response
    if (topics.length === 0) {
      return this.generateFallbackResponse(intent);
    }

    const primaryTopic = topics[0];
    const topicData = this.knowledgeBase[primaryTopic.topic];
    
    // Choose response type based on intent and conversation history
    let responseType = 'overview';
    
    if (intent.name === 'question' && intent.confidence > 0.7) {
      responseType = 'technical';
    } else if (intent.name === 'pricing') {
      responseType = this.generatePricingResponse(primaryTopic.topic);
    } else if (this.userContext.askedTopics.filter(t => t === primaryTopic.topic).length > 1) {
      // User asked about same topic before, give more detailed info
      responseType = Object.keys(topicData.responses)[Math.min(this.userContext.askedTopics.length - 1, Object.keys(topicData.responses).length - 1)];
    }

    let response = topicData.responses[responseType] || topicData.responses.overview;
    
    // Add contextual follow-up based on conversation
    response += this.generateFollowUp(primaryTopic.topic, intent);
    
    return response;
  }

  generatePricingResponse(topic) {
    const pricingResponses = {
      cns: '💰 **Báo giá dịch vụ CNS/ATM:**\n\nGiá dịch vụ phụ thuộc vào:\n🔹 Quy mô hệ thống (sân bay khu vực/quốc tế)\n🔹 Loại thiết bị (Radar/DVOR/DME/ADS-B)\n🔹 Phạm vi dự án và thời gian triển khai\n\n📞 Liên hệ **(024) 3843-3061** để được tư vấn báo giá chi tiết!',
      products: '💰 **Báo giá sản phẩm:**\n\nBảng giá tham khảo:\n🔸 **Radar giám sát**: 2-5 tỷ VNĐ\n🔸 **DVOR/DME**: 1-3 tỷ VNĐ  \n🔸 **ADS-B Ground**: 500M-1.5 tỷ VNĐ\n\n*Giá cuối cùng phụ thuộc vào cấu hình và yêu cầu kỹ thuật*\n\n📧 Email: **sales@attech.vn** để nhận báo giá chính thức!',
      services: '💰 **Báo giá dịch vụ bay kiểm tra:**\n\n🛩️ **Bay kiểm tra DVOR/DME**: 80-120 triệu VNĐ/lần\n🛩️ **Bay kiểm tra ILS**: 100-150 triệu VNĐ/lần\n🛩️ **Gói bảo trì hàng năm**: 200-500 triệu VNĐ\n\n*Giá đã bao gồm nhiên liệu, phi công và thiết bị*\n\n📞 Hotline: **(024) 3843-3061** - Tư vấn miễn phí!'
    };
    
    return pricingResponses[topic] || '💰 Để biết giá cụ thể, vui lòng liên hệ **(024) 3843-3061** hoặc **contact@attech.vn** để được tư vấn chi tiết nhất!';
  }

  generateFollowUp(topic, intent) {
    const followUps = {
      cns: [
        '\n\n🔍 Bạn muốn tìm hiểu về loại thiết bị CNS nào cụ thể?',
        '\n\n📋 Có cần tôi gửi brochure kỹ thuật không?',
        '\n\n🎯 Dự án của bạn thuộc quy mô nào?'
      ],
      products: [
        '\n\n⚙️ Bạn quan tâm đến thông số kỹ thuật nào?',
        '\n\n📊 Có cần demo sản phẩm không?',
        '\n\n💡 Tôi có thể tư vấn giải pháp phù hợp với ngân sách của bạn.'
      ],
      services: [
        '\n\n✈️ Sân bay của bạn cần kiểm tra thiết bị nào?',
        '\n\n📅 Khi nào bạn cần thực hiện dịch vụ?',
        '\n\n🔧 Có cần tư vấn về quy trình không?'
      ]
    };
    
    const topicFollowUps = followUps[topic];
    if (!topicFollowUps) return '';
    
    // Choose follow-up based on conversation context
    const randomIndex = Math.floor(Math.random() * topicFollowUps.length);
    return topicFollowUps[randomIndex];
  }

  generateFallbackResponse(intent) {
    const fallbacks = {
      greeting: [
        '👋 Xin chào! Tôi là AI Assistant của ATTECH. Tôi có thể giúp bạn về:\n\n🛩️ **Dịch vụ CNS/ATM**\n📡 **Sản phẩm hàng không**\n✈️ **Bay kiểm tra hiệu chuẩn**\n🏢 **Thông tin công ty**\n\nBạn quan tâm đến lĩnh vực nào?',
        '🎯 Chào mừng đến với ATTECH! Với 38 năm kinh nghiệm, chúng tôi chuyên về:\n\n• Hệ thống CNS/ATM\n• Thiết bị hàng không\n• Dịch vụ kỹ thuật\n\nTôi có thể hỗ trợ gì cho bạn?'
      ],
      unknown: [
        '🤔 Tôi hiểu bạn đang quan tâm, nhưng có thể diễn đạt rõ hơn được không?\n\n💡 **Gợi ý câu hỏi:**\n• "Dịch vụ CNS của ATTECH như thế nào?"\n• "Sản phẩm radar có những loại nào?"\n• "Báo giá dịch vụ bay kiểm tra?"\n• "Thông tin liên hệ ATTECH?"',
        '🎯 Để tôi hỗ trợ tốt nhất, bạn có thể hỏi cụ thể về:\n\n📋 **Chủ đề chính:**\n🔹 Dịch vụ kỹ thuật hàng không\n🔹 Sản phẩm và thiết bị\n🔹 Giá cả và báo giá\n🔹 Liên hệ và hỗ trợ\n\nBạn muốn biết gì nhất?'
      ]
    };
    
    const responses = fallbacks[intent.name] || fallbacks.unknown;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Get conversation insights
  getConversationInsights() {
    return {
      totalMessages: this.conversationHistory.length,
      topInterests: this.userContext.interests,
      currentIntent: this.userContext.currentIntent,
      askedTopics: this.userContext.askedTopics,
      sentiment: this.userContext.sentiment
    };
  }

  // Reset conversation context
  resetContext() {
    this.conversationHistory = [];
    this.userContext = {
      interests: [],
      askedTopics: [],
      currentIntent: null,
      sentiment: 'neutral'
    };
  }
}

// Export singleton instance
export const aiEngine = new ATTECHAIEngine();