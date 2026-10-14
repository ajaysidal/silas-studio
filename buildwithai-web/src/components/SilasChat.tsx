'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const SilasChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'agent', text: 'Welcome to Silas Agent! How can I help you today?' }
  ]);

  const toggle = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (input.trim() === '') return;
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate agent response (replace with Payload CMS API call later)
    setTimeout(() => {
      const agentMessage = { sender: 'agent', text: `I received: "${input}". How can I assist you further?` };
      setMessages(prev => [...prev, agentMessage]);
    }, 800);
  };

  return (
    <div className="fixed bottom-[24px] right-[24px] z-70">
      {/* Chat Panel */}
      <div className={`absolute bottom-0 right-0 w-[350px] bg-gray-800 rounded-xl shadow-lg flex flex-col overflow-hidden transition-all duration-300 ${isOpen ? 'h-[500px]' : 'h-0'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-xl font-bold text-teal-400">Silas Agent</h3>
          <button onClick={toggle} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} max-w-xs`}>
              <div className={`${msg.sender === 'user' ? 'bg-teal-600 text-white' : 'bg-gray-700 text-gray-100'} rounded-lg p-2 max-w-xs`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        {/* Input */}
        <div className="flex p-4 space-x-2 border-t border-gray-700">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-lg bg-gray-700 border border-gray-600 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage} className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg px-4 py-2">
            Send
          </button>
        </div>
      </div>
      {/* Toggle Button */}
      <button
        onClick={toggle}
        className={`absolute bottom-0 right-0 w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center text-white hover:bg-teal-700 transition-colors duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'} ${isOpen ? 'pointer-events-none' : ''}`}
        title="Welcome to Silas Agent! How can I help you?"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default SilasChat;
