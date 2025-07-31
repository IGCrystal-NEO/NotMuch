import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface PromptCardProps {
  prompt: {
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
  };
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  // 截断长内容
  const truncateContent = (content: string, maxLength: number = 150) => {
    return content.length > maxLength 
      ? `${content.substring(0, maxLength)}...` 
      : content;
  };

  return (
    <Link href={`/prompt/${prompt.id}`} className="block group">
      <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col h-full overflow-hidden group-hover:-translate-y-2 group-hover:bg-white">
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
        
        {/* 头部信息 */}
        <div className="relative z-10 flex items-start justify-between mb-4">
          <div className="flex items-center flex-1 min-w-0">
            {prompt.owner?.avatar_url && (
              <div className="relative">
                <Image 
                  src={prompt.owner.avatar_url} 
                  alt={prompt.owner.username} 
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full mr-3 border-2 border-white shadow-sm group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                {prompt.title}
              </h2>
              {prompt.owner?.username && (
                <p className="text-sm text-gray-500 mt-1">@{prompt.owner.username}</p>
              )}
            </div>
          </div>
          
          {prompt.is_r18 === 1 && (
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
              R18
            </span>
          )}
        </div>

        {/* 内容 */}
        <div className="relative z-10 flex-grow">
          <p className="text-gray-600 leading-relaxed line-clamp-4 group-hover:text-gray-800 transition-colors duration-300">
            {truncateContent(prompt.content || prompt.description || 'No content available')}
          </p>
        </div>

        {/* 标签和统计信息 */}
        <div className="relative z-10 mt-6 space-y-4">
          {/* 标签 */}
          {prompt.tags && prompt.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {prompt.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag.id} 
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200/50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200"
                >
                  #{tag.name}
                </span>
              ))}
              {prompt.tags.length > 3 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs text-gray-500 bg-gray-100">
                  +{prompt.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* 统计信息 */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <span>{prompt.views || 0}</span>
              </div>
              <div className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>{prompt.likes || 0}</span>
              </div>
            </div>
            
            <div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
              <span className="text-sm font-medium mr-1">查看详情</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PromptCard; 