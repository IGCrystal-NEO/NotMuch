import React from 'react';
import Link from 'next/link';

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
  const truncateContent = (content: string, maxLength: number = 200) => {
    return content.length > maxLength 
      ? `${content.substring(0, maxLength)}...` 
      : content;
  };

  return (
    <Link href={`/prompt/${prompt.id}`} className="block">
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
        <div className="flex items-center mb-2">
          {prompt.owner?.avatar_url && (
            <img 
              src={prompt.owner.avatar_url} 
              alt={prompt.owner.username} 
              className="w-8 h-8 rounded-full mr-2"
            />
          )}
          <h2 className="text-xl font-bold line-clamp-2">{prompt.title}</h2>
        </div>

        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {truncateContent(prompt.content || prompt.description || 'No content available')}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {prompt.tags?.slice(0, 3).map((tag) => (
              <span 
                key={tag.id} 
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
              >
                {tag.name}
              </span>
            ))}
            {(prompt.tags?.length || 0) > 3 && (
              <span className="text-xs text-gray-500">
                +{(prompt.tags?.length || 0) - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center text-sm text-gray-500 space-x-2">
            {prompt.is_r18 === 1 && (
              <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs">
                R18
              </span>
            )}
            <span>👀 {prompt.views || 0}</span>
            <span>❤️ {prompt.likes || 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PromptCard; 