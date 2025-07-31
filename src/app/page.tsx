import React from 'react';
import PromptList from './components/PromptList';
import ScrollToTop from './components/ScrollToTop';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* 头部英雄区域 */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-3xl"></div>
        <div className="relative container mx-auto px-6 py-16 text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x leading-tight transform animate-fadeInUp opacity-0 animation-delay-300">
              午夜收藏馆
            </h1>
            <div className="mt-4 h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full transform scale-x-0 animate-scaleX animation-delay-800"></div>
          </div>
          
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed transform animate-fadeInUp opacity-0 animation-delay-600">
            深夜时分的奇异收藏品，每一件都藏着不为人知的秘密故事
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center transform animate-fadeInUp opacity-0 animation-delay-900">
            <div className="flex items-center gap-2 text-gray-500">
              <span className="flex h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>神秘更新中</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <span>🌙</span>
              <span>午夜奇谈录</span>
            </div>
          </div>
        </div>
        
        {/* 装饰性元素 */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-1200"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* 主内容区域 */}
      <div className="container mx-auto px-6 py-12 transform animate-fadeInUp opacity-0 animation-delay-1200">
        <PromptList />
      </div>

      {/* 页脚 */}
      <footer className="relative mt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="relative">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="container mx-auto px-6 py-12">
            <div className="text-center space-y-6">
              <div className="flex justify-center items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">M</span>
                </div>
                <span className="text-white font-semibold text-lg">午夜收藏馆</span>
              </div>
              
              <p className="text-gray-300 max-w-md mx-auto">
                © {new Date().getFullYear()} 神秘收藏者 · 在黑暗中寻找光明的探索者们
              </p>
              
              <div className="flex justify-center space-x-8">
                <a 
                  href="https://github.com/Larch-C/SavePrompt" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>密室入口</span>
                </a>
                
                <a 
                  href="https://www.jasongjz.top/" 
                  className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>奇物来源</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* 回到顶部按钮 */}
      <ScrollToTop />
    </main>
  );
}
