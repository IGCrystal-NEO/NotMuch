import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CopyButton from './CopyButton';

// 复用之前的Prompt接口
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

async function fetchPromptById(id: string) {
  try {
    const versionResponse = await fetch('https://raw.githubusercontent.com/Larch-C/SavePrompt/main/version.txt');
    const fileName = await versionResponse.text();
    const jsonUrl = `https://raw.githubusercontent.com/Larch-C/SavePrompt/main/${fileName.trim()}`;
    
    const jsonResponse = await fetch(jsonUrl);
    const jsonData: Prompt[] = await jsonResponse.json();
    
    return jsonData.find(prompt => prompt.id === parseInt(id));
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function PromptDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const prompt = await fetchPromptById(params.id);

  if (!prompt) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link 
        href="/" 
        className="mb-4 inline-block text-blue-600 hover:text-blue-800 transition-colors"
      >
        ← 返回 Prompt 列表
      </Link>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {prompt.owner?.avatar_url && (
              <img 
                src={prompt.owner.avatar_url} 
                alt={prompt.owner.username} 
                className="w-10 h-10 rounded-full mr-3"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold">{prompt.title}</h1>
              <p className="text-gray-500 text-sm">
                由 {prompt.owner?.username || '匿名'} 创建
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {prompt.is_r18 === 1 && (
              <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs">
                R18
              </span>
            )}
            <span className="text-gray-500">👀 {prompt.views || 0}</span>
            <span className="text-gray-500">❤️ {prompt.likes || 0}</span>
          </div>
        </div>

        {prompt.tags && prompt.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {prompt.tags.map((tag) => (
              <span 
                key={tag.id} 
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {prompt.description && (
          <div className="mb-4 text-gray-700 italic">
            {prompt.description}
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg relative">
          <pre 
            id="prompt-content" 
            className="whitespace-pre-wrap break-words text-sm"
          >
            {prompt.content}
          </pre>
          <CopyButton content={prompt.content} />
        </div>
      </div>
    </div>
  );
} 