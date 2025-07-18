import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLiveChat, setIsLiveChat] = useState(false);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'received',
      text: 'Xin chào! Mình là Attech Assitant, mình có thể giúp gì cho bạn?',
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
    setIsLiveChat(!isLiveChat);
    // Thêm tin nhắn thông báo chuyển chế độ
    const switchMessage = {
      id: messages.length + 1,
      type: 'received',
      text: !isLiveChat 
        ? 'Bạn đã chuyển sang chế độ chat với bộ phận hỗ trợ. Vui lòng đợi trong giây lát...'
        : 'Bạn đã chuyển về chế độ chat với trợ lý ảo.',
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
          // Bot response
          const botMessage = {
            id: messages.length + 2,
            type: 'received',
            text: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!',
            timestamp: new Date(),
            status: 'sent'
          };
          setMessages(prev => [...prev, botMessage]);
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
        const botResponse = {
          id: messages.length + 2,
          type: 'received',
          text: `Cảm ơn bạn đã quan tâm về "${text}". Chúng tôi sẽ phản hồi ngay!`,
          timestamp: new Date(),
          status: 'sent'
        };
        setMessages(prev => [...prev, botResponse]);
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
              <img src="/assets/images/header/attech-bo-cuc-dau-trang-chu.png" alt="ATTECH Logo" className="chat-widget-logo" />
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
                  <p>{message.text}</p>
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
            <div ref={messagesEndRef} />

            {/* Quick Replies - chỉ hiển thị khi chưa có tin nhắn từ người dùng và đang ở chế độ chatbot */}
            {!hasUserMessages && !isLiveChat && (
              <div className="quick-replies">
                <button className="quick-reply-btn" onClick={() => handleQuickReply('Dịch vụ của ATTECH')}>
                  Dịch vụ của ATTECH
                </button>
                <button className="quick-reply-btn" onClick={() => handleQuickReply('Tư vấn kỹ thuật')}>
                  Tư vấn kỹ thuật
                </button>
                <button className="quick-reply-btn" onClick={() => handleQuickReply('Báo giá dịch vụ')}>
                  Báo giá dịch vụ
                </button>
                <button className="quick-reply-btn" onClick={() => handleQuickReply('Liên hệ')}>
                  Liên hệ
                </button>
              </div>
            )}
          </div>

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