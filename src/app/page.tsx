import React from 'react';
import PromptCard from './components/PromptCard';

// 定义更详细的Prompt接口
interface Prompt {
  id: number;
  title: string;
  content: string;
  description?: string;
  tags?: { name: string; id: number }[];
  is_r18?: number;
  likes?: number;
  views?: number;
  owner?: {
    username: string;
    avatar_url?: string;
  };
}

async function fetchVersionFile() {
  try {
    const versionResponse = await fetch('https://raw.githubusercontent.com/Larch-C/SavePrompt/main/version.txt');
    const fileName = await versionResponse.text();
    const jsonUrl = `https://raw.githubusercontent.com/Larch-C/SavePrompt/main/${fileName.trim()}`;
    
    const jsonResponse = await fetch(jsonUrl);
    const jsonData: Prompt[] = await jsonResponse.json();
    
    return jsonData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default async function Home() {
  const promptData = await fetchVersionFile();

  return (
    <main className="container mx-auto p-4">
      <div className="relative mb-12">
        <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient-x">
          我就只是备个份，不干啥哈！
        </h1>
        <p className="text-center text-gray-500 mt-4 max-w-2xl mx-auto">
          噢噢噢噢噢噢噢噢噢噢噢噢噢噢噢噢哦哦哦
        </p>
        <div className="absolute inset-x-0 -bottom-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 blur-lg"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promptData.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

      {/* 页脚 */}
      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            @ {new Date().getFullYear()}  Larch-C 的备份 · 由热爱分享的朋友们共同创造
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <a href="https://github.com/Larch-C/SavePrompt" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
              GitHub
            </a>
            <a href="https://www.jasongjz.top/" className="text-gray-500 hover:text-blue-600 transition-colors">
              prompt来源
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
