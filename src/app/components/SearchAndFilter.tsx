'use client';

import React, { useState } from 'react';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilterByTag: (tag: string | null) => void;
  availableTags: string[];
  currentTag: string | null;
  totalCount: number;
  filteredCount: number;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
  onFilterByTag,
  availableTags,
  currentTag,
  totalCount,
  filteredCount
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllTags, setShowAllTags] = useState(false);

  // 默认显示的标签数量
  const defaultTagsToShow = 8;
  const hasMoreTags = availableTags.length > defaultTagsToShow;
  const visibleTags = showAllTags ? availableTags : availableTags.slice(0, defaultTagsToShow);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleTagFilter = (tag: string | null) => {
    onFilterByTag(tag);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 mb-8 space-y-6">
      {/* 搜索框 */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="搜索 Prompts..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
      </div>

      {/* 标签筛选 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">按标签筛选</h3>
          {hasMoreTags && (
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <span>{showAllTags ? '收起' : `展开 (${availableTags.length - defaultTagsToShow} 个更多)`}</span>
              <svg 
                className={`w-3 h-3 transition-transform duration-200 ${showAllTags ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
        
        <div className="space-y-3">
          {/* 全部按钮 */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleTagFilter(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                currentTag === null
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              全部 ({totalCount})
            </button>
          </div>

          {/* 标签网格 - 使用动画过渡 */}
          <div className={`gap-2 transition-all duration-300 ease-in-out ${
            showAllTags 
              ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' 
              : 'flex flex-wrap'
          }`}>
            {visibleTags.map((tag, index) => (
              <button
                key={tag}
                onClick={() => handleTagFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 whitespace-nowrap ${
                  currentTag === tag
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200'
                } ${showAllTags ? 'animate-fadeInUp w-full' : 'w-auto'}`}
                style={{
                  animationDelay: showAllTags ? `${index * 50}ms` : '0ms'
                }}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* 折叠状态下的展开提示 */}
          {!showAllTags && hasMoreTags && (
            <div className="text-center pt-2">
              <button
                onClick={() => setShowAllTags(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                <span>还有 {availableTags.length - defaultTagsToShow} 个标签</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 结果统计 */}
      <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-200">
        <span>
          显示 {filteredCount} 个结果
          {currentTag && ` (标签: ${currentTag})`}
          {searchQuery && ` (搜索: "${searchQuery}")`}
        </span>
        {(currentTag || searchQuery) && (
          <button
            onClick={() => {
              setSearchQuery('');
              onSearch('');
              onFilterByTag(null);
            }}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            清除筛选
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;
