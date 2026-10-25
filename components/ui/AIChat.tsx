'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Ciao! Sono l'assistente AI di Antonio. Chiedimi qualsiasi cosa sulla sua esperienza, progetti o competenze tecniche!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "Scusa, ho riscontrato un errore. Riprova per favore!",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 hidden lg:block lg:bottom-6 lg:right-6">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-3 h-[min(70vh,560px)] w-[min(94vw,420px)] overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-2xl animate-fadeIn dark:border-slate-800 dark:bg-slate-950 sm:mb-4">
          {/* Header - Minimale e Professionale */}
          <div className="flex items-center justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-700 px-6 py-5 text-white">
            <div className="flex items-center gap-4">
              {/* Avatar Minimalista */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-base">Antonio AI</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse" />
                  <p className="text-xs text-white/90">Portfolio assistant</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-xl p-2 transition-all duration-200 hover:bg-white/10"
              aria-label="Chiudi chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area - Design Moderno */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-6 dark:bg-slate-950">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-3 ${
                    message.role === 'user'
                      ? 'bg-slate-950 text-white shadow-lg dark:bg-cyan-300 dark:text-slate-950'
                      : 'border border-slate-200 bg-white text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-white/60 dark:text-slate-700' : 'text-slate-400 dark:text-slate-500'}`}>
                    {message.timestamp.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-slate-950 animate-bounce dark:bg-cyan-300" style={{ animationDelay: '0ms' }} />
                    <div className="h-2 w-2 rounded-full bg-slate-700 animate-bounce dark:bg-cyan-200" style={{ animationDelay: '150ms' }} />
                    <div className="h-2 w-2 rounded-full bg-cyan-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Design Premium */}
          <div className="border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Scrivi un messaggio..."
                  rows={1}
                  className="w-full resize-none rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  disabled={isLoading}
                  style={{ maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="flex min-w-[48px] items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 dark:bg-cyan-300 dark:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Invia messaggio"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-center text-xs text-slate-400">Powered by Groq LLaMA 3.1 • RAG</p>
          </div>
        </div>
      )}

      {/* Floating Button - Design Premium */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-950 shadow-2xl transition-all duration-300 hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-950 dark:text-white sm:h-14 sm:w-14"
        aria-label={isOpen ? 'Chiudi chat' : 'Apri chat'}
      >
        {/* Icon */}
        <div className="relative z-10">
          {isOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
        </div>

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-4 hidden whitespace-nowrap rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100 dark:bg-white dark:text-slate-950 sm:block">
            Ask about my work
            <div className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rotate-45 bg-slate-950 dark:bg-white" />
          </div>
        )}
      </button>
    </div>
  );
}
