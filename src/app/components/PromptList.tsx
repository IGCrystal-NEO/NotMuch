'use client';

import React, { useState, useEffect } from 'react';
import PromptCard from './PromptCard';
import SearchAndFilter from './SearchAndFilter';
import Pagination from './Pagination';

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

// 加载骨架屏组件
const SkeletonCard = () => (
  <div className="relative bg-white/80 border border-gray-200/50 rounded-2xl p-6 animate-pulse">
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-3 bg-gray-200 rounded"></div>
      <div className="h-3 bg-gray-200 rounded"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
    </div>
    <div className="flex justify-between items-center">
      <div className="flex space-x-2">
        <div className="h-6 bg-gray-200 rounded-full w-16"></div>
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      </div>
      <div className="flex space-x-3">
        <div className="h-4 bg-gray-200 rounded w-12"></div>
        <div className="h-4 bg-gray-200 rounded w-12"></div>
      </div>
    </div>
  </div>
);

// 错误状态组件
const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
    <div className="w-16 h-16 mb-6 text-gray-400">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.982 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">加载失败</h3>
    <p className="text-gray-600 mb-6 max-w-md">
      无法获取 Prompt 数据，可能是网络问题。请检查网络连接后重试。
    </p>
    <button
      onClick={onRetry}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span>重新加载</span>
    </button>
  </div>
);

// 获取模拟数据
function getMockData(): Prompt[] {
  return [
    {
      id: 1,
      title: "创意写作助手",
      content: "你是一个专业的创意写作助手，能够帮助用户创作各种类型的文章、故事和内容。请根据用户的需求提供高质量的写作建议和内容创作。",
      description: "专业的创意写作助手，提供高质量的写作建议",
      tags: [
        { id: 1, name: "写作" },
        { id: 2, name: "创意" },
        { id: 3, name: "助手" }
      ],
      is_r18: 0,
      likes: 128,
      views: 1024,
      owner: {
        username: "WritingMaster",
        avatar_url: "https://avatars.githubusercontent.com/u/1?v=4"
      }
    },
    {
      id: 2,
      title: "代码审查专家",
      content: "你是一个经验丰富的代码审查专家，能够识别代码中的问题、提供优化建议，并确保代码质量。请仔细审查用户提供的代码并给出专业建议。",
      description: "专业的代码审查和优化建议",
      tags: [
        { id: 4, name: "编程" },
        { id: 5, name: "代码审查" },
        { id: 6, name: "优化" }
      ],
      is_r18: 0,
      likes: 256,
      views: 2048,
      owner: {
        username: "CodeReviewer",
        avatar_url: "https://avatars.githubusercontent.com/u/2?v=4"
      }
    },
    {
      id: 3,
      title: "学习计划制定师",
      content: "你是一个专业的学习计划制定师，能够根据用户的学习目标、时间安排和个人情况，制定个性化的学习计划和学习策略。",
      description: "制定个性化的学习计划和策略",
      tags: [
        { id: 7, name: "学习" },
        { id: 8, name: "计划" },
        { id: 9, name: "教育" }
      ],
      is_r18: 0,
      likes: 192,
      views: 1536,
      owner: {
        username: "LearnGuru",
        avatar_url: "https://avatars.githubusercontent.com/u/3?v=4"
      }
    },
    {
      id: 4,
      title: "数据分析师",
      content: "你是一个专业的数据分析师，能够处理和分析各种数据，提供有洞察力的分析报告和可视化图表。",
      description: "专业的数据分析和可视化",
      tags: [
        { id: 10, name: "数据分析" },
        { id: 11, name: "可视化" },
        { id: 12, name: "报告" }
      ],
      is_r18: 0,
      likes: 184,
      views: 1280,
      owner: {
        username: "DataAnalyst",
        avatar_url: "https://avatars.githubusercontent.com/u/4?v=4"
      }
    },
    {
      id: 5,
      title: "UI/UX 设计顾问",
      content: "你是一个经验丰富的UI/UX设计顾问，能够提供用户体验设计建议、界面设计方案和可用性测试指导。",
      description: "专业的UI/UX设计咨询服务",
      tags: [
        { id: 13, name: "设计" },
        { id: 14, name: "UI/UX" },
        { id: 15, name: "用户体验" }
      ],
      is_r18: 0,
      likes: 320,
      views: 2560,
      owner: {
        username: "DesignGuru",
        avatar_url: "https://avatars.githubusercontent.com/u/5?v=4"
      }
    },
    {
      id: 6,
      title: "营销策略专家",
      content: "你是一个专业的营销策略专家，能够制定有效的营销方案、分析市场趋势并提供品牌推广建议。",
      description: "专业的营销策略和品牌推广",
      tags: [
        { id: 16, name: "营销" },
        { id: 17, name: "策略" },
        { id: 18, name: "品牌" }
      ],
      is_r18: 0,
      likes: 276,
      views: 1920,
      owner: {
        username: "MarketingPro",
        avatar_url: "https://avatars.githubusercontent.com/u/6?v=4"
      }
    }
  ];
}

async function fetchVersionFile(): Promise<Prompt[]> {
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
    
    return jsonData;
  } catch (error) {
    console.error('Error fetching data:', error);
    // 返回模拟数据作为回退
    return getMockData();
  }
}

const PromptList: React.FC = () => {
  const [promptData, setPromptData] = useState<Prompt[]>([]);
  const [filteredData, setFilteredData] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // 分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); // 每页显示9个收藏品

  // 获取所有可用的标签
  const availableTags = React.useMemo(() => {
    const tags = new Set<string>();
    promptData.forEach(prompt => {
      prompt.tags?.forEach(tag => tags.add(tag.name));
    });
    return Array.from(tags).sort();
  }, [promptData]);

  // 筛选数据
  const filterData = React.useCallback(() => {
    let filtered = promptData;

    // 搜索筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(prompt =>
        prompt.title.toLowerCase().includes(query) ||
        prompt.content.toLowerCase().includes(query) ||
        prompt.description?.toLowerCase().includes(query) ||
        prompt.tags?.some(tag => tag.name.toLowerCase().includes(query)) ||
        prompt.owner?.username.toLowerCase().includes(query)
      );
    }

    // 标签筛选
    if (selectedTag) {
      filtered = filtered.filter(prompt =>
        prompt.tags?.some(tag => tag.name === selectedTag)
      );
    }

    setFilteredData(filtered);
    // 重置到第一页当筛选条件改变时
    setCurrentPage(1);
  }, [promptData, searchQuery, selectedTag]);

  // 计算分页数据
  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  React.useEffect(() => {
    filterData();
  }, [filterData]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchVersionFile();
      setPromptData(data);
    } catch (err) {
      console.error('Failed to load prompts:', err);
      setError('加载失败，显示示例数据');
      setPromptData(getMockData());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // 搜索时重置到第一页
  };

  const handleTagFilter = (tag: string | null) => {
    setSelectedTag(tag);
    setCurrentPage(1); // 筛选时重置到第一页
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="space-y-8">
        {/* 搜索框骨架屏 */}
        <div className="bg-white/70 border border-gray-200/50 rounded-2xl p-6 animate-pulse">
          <div className="h-12 bg-gray-200 rounded-xl mb-4"></div>
          <div className="flex space-x-2">
            <div className="h-8 bg-gray-200 rounded-full w-20"></div>
            <div className="h-8 bg-gray-200 rounded-full w-24"></div>
            <div className="h-8 bg-gray-200 rounded-full w-16"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error && promptData.length === 0) {
    return <ErrorState onRetry={loadData} />;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center space-x-3">
          <svg className="w-5 h-5 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-yellow-800 font-medium">网络连接问题</p>
            <p className="text-yellow-700 text-sm">当前显示的是示例数据，请检查网络连接。</p>
          </div>
          <button
            onClick={loadData}
            className="ml-auto text-yellow-600 hover:text-yellow-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      )}

      {/* 搜索和筛选组件 */}
      <SearchAndFilter
        onSearch={handleSearch}
        onFilterByTag={handleTagFilter}
        availableTags={availableTags}
        currentTag={selectedTag}
        totalCount={promptData.length}
        filteredCount={filteredData.length}
      />

      {/* 空状态 */}
      {filteredData.length === 0 && !loading && (
        <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 mb-6 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">没有找到匹配的结果</h3>
          <p className="text-gray-600 mb-6 max-w-md">
            尝试使用不同的关键词或清除筛选条件
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag(null);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            清除筛选
          </button>
        </div>
      )}
      
      {/* Prompt 卡片网格 */}
      {filteredData.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedData.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>

          {/* 分页组件 */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={filteredData.length}
          />
        </>
      )}
    </div>
  );
};

export default PromptList;
