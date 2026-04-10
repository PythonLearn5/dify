import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

// Dify API 配置
const DIFY_API_URL = 'http://localhost/v1';
const DIFY_API_KEY = 'app-RGN1grBSQREbnbP6p3h8UTm2'; // 应用的 API Key

// 聊天工作流输入参数
const DEFAULT_NETWORKING = 0; // 默认值
const DEFAULT_AUTHORIZATION = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiIxODg4MTUwMDk3ODcyNTEwOTc3Iiwicm5TdHIiOiJYNElCOWprWm5LS0ZCb09vSG90STZwZWhBVzlTWGxKcSIsInVzZXJJZCI6IjE4ODgxNTAwOTc4NzI1MTA5NzciLCJ0ZW5hbnRJZCI6MTczMDQ5MDExNzc4NzcwNTM0NH0.nC3Nr_jdHZIoEH8V2r3FqMA5bjUrgC0yyClbFLC9r6s";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 发送消息到 Dify
  const sendMessage = async (message) => {
    if (!message.trim()) return;

    // 添加用户消息
    const userMessage = {
      id: uuidv4(),
      role: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 构建请求体，将 networking 和 Authorization 作为 inputs 参数传递
      const requestBody = {
        inputs: {
          networking: DEFAULT_NETWORKING,
          Authorization: DEFAULT_AUTHORIZATION  // 工作流需要的认证参数
        },
        query: message,
        response_mode: 'blocking',
        user: 'chatbot-user'
      };

      // 如果有 conversationId，添加到请求中
      if (conversationId) {
        requestBody.conversation_id = conversationId;
      }

      const response = await axios.post(
        `${DIFY_API_URL}/chat-messages`,
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${DIFY_API_KEY}`,  // HTTP Header 也需要
            'Content-Type': 'application/json'
          }
        }
      );

      // 保存 conversationId
      if (response.data.conversation_id) {
        setConversationId(response.data.conversation_id);
      }

      // 添加 AI 回复
      const aiMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: response.data.answer,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      console.error('Error details:', error.response?.data);

      const errorMsg = error.response?.data?.message || '连接 Dify 服务时出现问题';

      // 添加错误消息
      const errorMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: `抱歉，出错了：${errorMsg}`,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  // 处理回车发送
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // 清空对话
  const clearChat = () => {
    setMessages([]);
    setConversationId(null);
  };

  return (
    <div className="app">
      {/* 头部 */}
      <header className="header">
        <div className="header-content">
          <h1>🤖 Dify Chatbot</h1>
          <p>Powered by WinClaw AI</p>
        </div>
        <button className="clear-btn" onClick={clearChat}>
          🗑️ 清空对话
        </button>
      </header>

      {/* 聊天区域 */}
      <div className="chat-container">
        <div className="messages">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <div className="welcome-icon">💬</div>
              <h2>欢迎使用 Dify Chatbot</h2>
              <p>开始对话吧！输入消息并按 Enter 发送</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.role} ${msg.isError ? 'error' : ''}`}
              >
                <div className="message-avatar">
                  {msg.role === 'user' ? '👤' : '🤖'}
                </div>
                <div className="message-content">
                  <div className="message-text">{msg.content}</div>
                  <div className="message-time">{msg.timestamp}</div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="message assistant loading">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        <div className="input-area">
          <div className="input-wrapper">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入消息..."
              rows={1}
              className="message-input"
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim()}
              className="send-btn"
            >
              {isLoading ? '...' : '🚀'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
