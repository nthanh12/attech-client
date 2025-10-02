import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';
import { aiEngine } from './aiEngine';
import { useBannerSettings } from '../../../hooks/useBannerSettings';

const ChatWidget = () => {
  const { getBannerUrl } = useBannerSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLiveChat, setIsLiveChat] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationInsights, setConversationInsights] = useState(null);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'received',
      text: '👋 Xin chào! Tôi là trợ lý ảo của ATTECH. Tôi có thể giúp bạn tìm hiểu về dịch vụ và sản phẩm của chúng tôi.',
      timestamp: new Date(),
      status: 'sent'
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const toggleChatMode = () => {
    const newMode = !isLiveChat;
    setIsLiveChat(newMode);
    
    // Reset AI context when switching to live chat
    if (newMode) {
      aiEngine.resetContext();
    }
    
    // Thêm tin nhắn thông báo chuyển chế độ với AI response
    const switchMessage = {
      id: messages.length + 1,
      type: 'received',
      text: newMode 
        ? '👨‍💼 Bạn đã chuyển sang chế độ chat với bộ phận hỗ trợ ATTECH. Nhân viên tư vấn sẽ phản hồi trong vài phút...\n\n💡 Để được hỗ trợ nhanh nhất, vui lòng mô tả cụ thể nhu cầu của bạn.'
        : '🤖 Bạn đã chuyển về chế độ AI Assistant. Tôi có thể trả lời ngay các câu hỏi về dịch vụ, sản phẩm và thông tin công ty ATTECH!',
      timestamp: new Date(),
      status: 'sent'
    };
    setMessages([...messages, switchMessage]);
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const now = new Date();
      const userMessage = {
        id: messages.length + 1,
        type: 'sent',
        text: inputMessage.trim(),
        timestamp: now,
        status: 'sending'
      };
      setMessages([...messages, userMessage]);
      setInputMessage('');

      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' }
            : msg
        ));

        if (!isLiveChat) {
          // Show typing indicator
          setIsTyping(true);
          
          setTimeout(() => {
            setIsTyping(false);
            // Advanced AI response with context understanding
            const aiResponse = aiEngine.generateResponse(userMessage.text);
            const botMessage = {
              id: messages.length + 2,
              type: 'received',
              text: aiResponse,
              timestamp: new Date(),
              status: 'sent'
            };
            setMessages(prev => [...prev, botMessage]);
            
            // Update conversation insights
            setConversationInsights(aiEngine.getConversationInsights());
          }, Math.random() * 800 + 1000); // Variable realistic typing delay
        }
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickReply = (text) => {
    const now = new Date();
    const quickReplyMessage = {
      id: messages.length + 1,
      type: 'sent',
      text: text,
      timestamp: now,
      status: 'sending'
    };
    setMessages([...messages, quickReplyMessage]);

    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === quickReplyMessage.id 
          ? { ...msg, status: 'sent' }
          : msg
      ));

      if (!isLiveChat) {
        // Show typing indicator for quick replies
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          // AI response for quick reply with context
          const aiResponse = aiEngine.generateResponse(text);
          const botResponse = {
            id: messages.length + 2,
            type: 'received',
            text: aiResponse,
            timestamp: new Date(),
            status: 'sent'
          };
          setMessages(prev => [...prev, botResponse]);
        }, Math.random() * 400 + 600);
      }
    }, 500);
  };

  // Kiểm tra xem đã có tin nhắn nào từ người dùng chưa
  const hasUserMessages = messages.some(message => message.type === 'sent');

  return (
    <div className={`chat-widget ${isOpen ? 'open' : ''}`}>
      {/* Chat Button */}
      <button className="chat-widget-button" onClick={toggleChat}>
        <i className={`fa ${isOpen ? 'fa-times' : 'fa-comments'}`}></i>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-widget-container">
          {/* Header */}
          <div className="chat-widget-header">
            <div className="chat-widget-title">
              <img src={getBannerUrl('Logo') || '/assets/images/header/attech-bo-cuc-dau-trang-chu.png'} alt="ATTECH Logo" className="chat-widget-logo" />
              <div className="chat-widget-title-text">
                <h3>{isLiveChat ? 'Bộ phận hỗ trợ ATTECH' : 'Trợ lý ảo ATTECH'}</h3>
                <span>{isLiveChat ? 'Đang trực tuyến' : 'Thường trả lời trong vài phút'}</span>
                {/* Nút chuyển trạng thái chat chuyển xuống dưới tiêu đề */}
                <button 
                  className={`chat-mode-switch ${isLiveChat ? 'live' : ''}`}
                  onClick={toggleChatMode}
                  title={isLiveChat ? 'Chuyển về trợ lý ảo' : 'Chuyển sang chat trực tiếp'}
                >
                  <i className={`fas ${isLiveChat ? 'fa-headset' : 'fa-robot'}`}></i>
                  <span>
                    {isLiveChat ? 'Trợ lý ảo' : 'Trực tiếp'}
                  </span>
                </button>
              </div>
            </div>
            {/* Nút đóng chat */}
            <button className="chat-widget-close" onClick={toggleChat} title="Đóng chat">
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Messages Container */}
          <div className="chat-widget-messages">
            {/* Messages */}
            {messages.map((message) => (
              <div key={message.id} className={`chat-message ${message.type}`}>
                <div className="message-content">
                  <p dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br>') }}></p>
                </div>
                <div className={`message-timestamp ${message.status}`}>
                  {message.status === 'sending' ? (
                    <i className="fas fa-circle-notch fa-spin"></i>
                  ) : (
                    <>
                      <i className="far fa-clock"></i>
                      {formatTime(message.timestamp)}
                    </>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="chat-message received">
                <div className="message-content typing-indicator">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />

            {/* Smart Quick Replies - thông minh và context-aware */}
            {!hasUserMessages && !isLiveChat && (
              <div className="quick-replies">
                <button className="quick-reply-btn" onClick={() => handleQuickReply('Dịch vụ CNS/ATM của ATTECH như thế nào?')}>
                  🛩️ Dịch vụ CNS/ATM
                </button>
                <button className="quick-reply-btn" onClick={() => handleQuickReply('Sản phẩm thiết bị hàng không có gì?')}>
                  📡 Sản phẩm & Thiết bị
                </button>
                <button className="quick-reply-btn" onClick={() => handleQuickReply('Báo giá dịch vụ bay kiểm tra')}>
                  💰 Báo giá dịch vụ
                </button>
                <button className="quick-reply-btn" onClick={() => handleQuickReply('Thông tin liên hệ ATTECH')}>
                  📞 Liên hệ
                </button>
                <button className="quick-reply-btn" onClick={() => handleQuickReply('Giới thiệu về công ty ATTECH')}>
                  🏢 Về ATTECH
                </button>
              </div>
            )}
          </div>

          {/* AI Insights (Development Mode - hiển thị khi có insights) */}
          {conversationInsights && conversationInsights.totalMessages > 1 && process.env.NODE_ENV === 'development' && (
            <div className="ai-insights">
              <small>
                🧠 AI: {conversationInsights.currentIntent} | Topics: {conversationInsights.topInterests.join(', ') || 'none'}
              </small>
            </div>
          )}

          {/* Input Area */}
          <div className="chat-widget-input">
            <input 
              type="text" 
              placeholder={isLiveChat ? "Nhập tin nhắn để chat với bộ phận hỗ trợ..." : "Nhập tin nhắn..."}
              className="chat-input"
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button className="send-button" onClick={handleSendMessage}>
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget; 