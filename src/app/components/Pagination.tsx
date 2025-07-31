'use client';

import React, { useState, useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  // 生成页码数组
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;
    // 移动端显示更少的页码
    const mobileMaxPages = 3;
    const actualMaxPages = isMobile ? mobileMaxPages : maxVisiblePages;
    
    if (totalPages <= actualMaxPages) {
      // 如果总页数小于等于最大显示页数，显示所有页
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (isMobile) {
        // 移动端简化显示逻辑
        if (currentPage <= 2) {
          pages.push(1, 2, '...', totalPages);
        } else if (currentPage >= totalPages - 1) {
          pages.push(1, '...', totalPages - 1, totalPages);
        } else {
          pages.push(1, '...', currentPage, '...', totalPages);
        }
      } else {
        // 桌面端复杂分页逻辑
        if (currentPage <= 4) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 3) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 4; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        }
      }
    }
    
    return pages;
  };

  const pageNumbers = generatePageNumbers();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center space-y-4 sm:space-y-6 mt-8 sm:mt-12 mb-6 sm:mb-8">
      {/* 分页信息 */}
      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center px-4">
        <span className="font-medium">
          显示第 {startItem} - {endItem} 条，共 {totalItems} 个神秘收藏
        </span>
      </div>

      {/* 分页控件 */}
      <div className="flex items-center justify-center space-x-1 sm:space-x-2 px-4 w-full max-w-full overflow-x-auto">
        {/* 上一页按钮 */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            group relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex-shrink-0
            ${currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
              : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-400'
            }
          `}
          aria-label="上一页"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 页码按钮 */}
        <div className="flex items-center space-x-0.5 sm:space-x-1 flex-shrink-0">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 text-gray-500 dark:text-gray-400 text-xs sm:text-sm"
                >
                  ⋯
                </span>
              );
            }

            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`
                  group relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex-shrink-0
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105 z-10'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg hover:scale-105 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-400'
                  }
                `}
              >
                {page}
                {isActive && (
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* 下一页按钮 */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            group relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex-shrink-0
            ${currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
              : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md hover:shadow-lg dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-400'
            }
          `}
          aria-label="下一页"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 快速跳转 - 只在桌面端显示 */}
      {totalPages > 10 && (
        <div className="hidden sm:flex items-center space-x-3 text-sm">
          <span className="text-gray-600 dark:text-gray-400">跳转至</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            className="w-16 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const page = parseInt((e.target as HTMLInputElement).value);
                if (page >= 1 && page <= totalPages) {
                  onPageChange(page);
                  (e.target as HTMLInputElement).value = '';
                }
              }
            }}
            placeholder={currentPage.toString()}
          />
          <span className="text-gray-600 dark:text-gray-400">页</span>
        </div>
      )}
    </div>
  );
};

export default Pagination;
