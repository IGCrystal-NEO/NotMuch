'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CopyButton from './CopyButton';
import Breadcrumb from '../../components/Breadcrumb';

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

// 加载骨架屏组件
const PromptDetailSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <div className="animate-pulse space-y-8">
        {/* 面包屑骨架 */}
        <div className="flex items-center space-x-2">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-4"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>

        {/* 返回按钮骨架 */}
        <div className="h-6 bg-gray-200 rounded w-32"></div>

        {/* 主要内容卡片骨架 */}
        <div className="bg-white/80 border border-gray-200/50 rounded-3xl overflow-hidden">
          {/* 头部区域骨架 */}
          <div className="p-8 border-b border-gray-200/50">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          {/* 内容区域骨架 */}
          <div className="p-8">
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-32"></div>
              <div className="h-32 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 错误状态组件
const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
    <div className="text-center p-8">
      <div className="w-16 h-16 mx-auto mb-6 text-gray-400">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.982 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Prompt 未找到</h3>
      <p className="text-gray-600 mb-6 max-w-md">
        抱歉，我们无法找到您请求的 Prompt。它可能已被删除或不存在。
      </p>
      <div className="space-x-4">
        <button
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
        >
          重新加载
        </button>
        <Link
          href="/"
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 inline-block"
        >
          返回首页
        </Link>
      </div>
    </div>
  </div>
);

async function fetchPromptById(id: string): Promise<Prompt | null> {
  try {
    const versionResponse = await fetch('https://raw.githubusercontent.com/Larch-C/SavePrompt/main/version.txt', {
      headers: {
        'User-Agent': 'NotMuch-App/1.0'
      }
    });
    
    if (!versionResponse.ok) {
      throw new Error(`Failed to fetch version file: ${versionResponse.status}`);
    }
    
    const fileName = await versionResponse.text();
    const trimmedFileName = fileName.trim();
    
    if (!trimmedFileName) {
      throw new Error('Version file is empty');
    }
    
    const jsonUrl = `https://raw.githubusercontent.com/Larch-C/SavePrompt/main/${trimmedFileName}`;
    
    const jsonResponse = await fetch(jsonUrl, {
      headers: {
        'User-Agent': 'NotMuch-App/1.0'
      }
    });
    
    if (!jsonResponse.ok) {
      throw new Error(`Failed to fetch JSON data: ${jsonResponse.status}`);
    }
    
    const jsonData: Prompt[] = await jsonResponse.json();
    
    if (!Array.isArray(jsonData)) {
      throw new Error('Invalid data format: expected array');
    }
    
    return jsonData.find(prompt => prompt.id === parseInt(id)) || null;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

interface PromptDetailClientProps {
  id: string;
}

const PromptDetailClient: React.FC<PromptDetailClientProps> = ({ id }) => {
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPrompt = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPromptById(id);
      if (data) {
        setPrompt(data);
      } else {
        setError('Prompt not found');
      }
    } catch (err) {
      console.error('Failed to load prompt:', err);
      setError('Failed to load prompt');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadPrompt();
  }, [loadPrompt]);

  if (loading) {
    return <PromptDetailSkeleton />;
  }

  if (error || !prompt) {
    return <ErrorState onRetry={loadPrompt} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* 面包屑导航 */}
        <Breadcrumb 
          items={[
            { label: '首页', href: '/' },
            { label: prompt.title, href: `/prompt/${id}` }
          ]}
        />

        {/* 返回按钮 */}
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 mb-8 text-blue-600 hover:text-blue-700 transition-all duration-200 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">返回 Prompt 列表</span>
        </Link>

        {/* 主要内容卡片 */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl shadow-xl overflow-hidden">
          {/* 头部区域 */}
          <div className="relative bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-8 border-b border-gray-200/50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start space-x-4">
                {prompt.owner?.avatar_url && (
                  <div className="relative">
                    <Image 
                      src={prompt.owner.avatar_url} 
                      alt={prompt.owner.username || '用户头像'} 
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-2">
                    {prompt.title}
                  </h1>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <span className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      <span>由 {prompt.owner?.username || '匿名'} 创建</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* 统计信息和标签 */}
              <div className="flex flex-col lg:items-end space-y-4">
                <div className="flex items-center space-x-6">
                  {prompt.is_r18 === 1 && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      R18
                    </span>
                  )}
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                      <span className="font-medium">{prompt.views || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span className="font-medium">{prompt.likes || 0}</span>
                    </div>
                  </div>
                </div>

                {/* 标签 */}
                {prompt.tags && prompt.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-end">
                    {prompt.tags.map((tag) => (
                      <span 
                        key={tag.id} 
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200/50"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 描述 */}
            {prompt.description && (
              <div className="mt-6 p-4 bg-white/50 rounded-xl border border-gray-200/50">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">描述</h3>
                <p className="text-gray-700 leading-relaxed">
                  {prompt.description}
                </p>
              </div>
            )}
          </div>

          {/* Prompt 内容区域 */}
          <div className="p-8">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Prompt 内容</h2>
              <p className="text-gray-600 text-sm">点击右上角按钮复制完整内容</p>
            </div>
            
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-6 overflow-hidden">
              {/* 装饰性背景 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full -translate-y-16 translate-x-16"></div>
              
              <pre 
                id="prompt-content" 
                className="relative z-10 whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-800 font-mono bg-transparent"
              >
                {prompt.content}
              </pre>
              <CopyButton content={prompt.content} />
            </div>
          </div>

          {/* 底部操作区域 */}
          <div className="bg-gray-50/50 px-8 py-6 border-t border-gray-200/50">
            <div className="flex items-center justify-center">
              <div className="text-sm text-gray-600">
                <span>📅 创建时间: {new Date().toLocaleDateString('zh-CN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptDetailClient;
