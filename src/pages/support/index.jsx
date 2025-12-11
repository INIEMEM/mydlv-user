import React, { useState } from 'react';
import { Send, Paperclip, ShoppingBag, Bell, Wallet } from 'lucide-react';

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('support');
  const [message, setMessage] = useState('');

  const chatMessages = {
    support: [
      {
        id: 1,
        sender: 'bot',
        text: "Rephrase 'This is an ai chatbot generated for better communication and simpler work flows'",
        time: '10:30 AM'
      },
      {
        id: 2,
        sender: 'user',
        text: 'Thank You :)',
        time: '10:32 AM'
      }
    ],
    rider: [
      {
        id: 1,
        sender: 'rider',
        text: "Hello! I'm on my way with your order. ETA 15 minutes.",
        time: '11:20 AM'
      },
      {
        id: 2,
        sender: 'user',
        text: 'Great, thank you!',
        time: '11:21 AM'
      }
    ],
    serviceChat: [
      {
        id: 1,
        sender: 'service',
        text: 'How can we help you today?',
        time: '09:15 AM'
      }
    ]
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending
      setMessage('');
    }
  };

  const renderMessages = () => {
    const messages = chatMessages[activeTab] || [];
    
    return (
      <div className="flex-1 overflow-y-auto md:p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender !== 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-800 flex-shrink-0 mr-2"></div>
            )}
            <div
              className={`max-w-[70%] md:max-w-[60%] ${
                msg.sender === 'user'
                  ? 'bg-white border-l-4 border-green-500'
                  : 'bg-gray-100 border-l-4 border-gray-400'
              } rounded-lg p-3 shadow-sm`}
            >
              <p className="text-sm text-gray-800">{msg.text}</p>
              <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
            </div>
            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-green-500 flex-shrink-0 ml-2"></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen ">
      {/* Header - Desktop/Tablet */}
      

      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className=" rounded-lg shadow-sm mb-4  md:mx-0">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('support')}
              className={`flex-1 py-3 text-sm md:text-base text-center font-medium transition-colors relative ${
                activeTab === 'support'
                  ? 'bg-[#333] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Support
            </button>
            <button
              onClick={() => setActiveTab('rider')}
              className={`flex-1 py-3 text-sm md:text-base text-center font-medium transition-colors relative ${
                activeTab === 'rider'
                  ? 'bg-[#333] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Rider
              <span className="absolute top-1 right-2 md:right-6 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </button>
            <button
              onClick={() => setActiveTab('serviceChat')}
              className={`flex-1 py-3 text-sm md:text-base text-center font-medium transition-colors ${
                activeTab === 'serviceChat'
                  ? 'bg-[#333] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Service Chat
            </button>
          </div>
        </div>

        {/* Chat Container */}
        <div className=" rounded-lg shadow-sm mx- md:mx-0 flex flex-col" style={{ height: 'calc(100vh - 250px)' }}>
          {/* Open Ticket Button - Shows when no active conversation */}
          {activeTab === 'support' && (
            <div className="flex justify-center py-8">
              <button className="flex items-center gap-2 px-6 py-2 border-2 border-gray-800 rounded-full hover:bg-gray-50 transition-colors">
                <ShoppingBag size={18} />
                <span className="font-medium">Open Ticket</span>
              </button>
            </div>
          )}

          {/* Messages Area */}
          {renderMessages()}

          {/* Message Input */}
          <div className="border-t p-1 md:p-4">
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2 md:py-3">
              <input
                type="text"
                placeholder="Type a new message here"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 outline-none text-sm md:text-base bg-transparent"
              />
              <button className="text-gray-400 hover:text-gray-600">
                <Paperclip size={20} />
              </button>
              <button 
                onClick={handleSendMessage}
                className="text-gray-400 hover:text-green-600 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}