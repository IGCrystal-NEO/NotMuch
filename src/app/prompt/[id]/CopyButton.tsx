'use client';

import React, { useState } from 'react';

interface CopyButtonProps {
  content: string;
}

export default function CopyButton({ content }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      setError(false);
      
      // 优先使用现代 Clipboard API
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        return;
      }
      
      // 降级方案：使用 execCommand
      const textArea = document.createElement('textarea');
      textArea.value = content;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '-9999px';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      
      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, 99999);
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } else {
        throw new Error('复制命令执行失败');
      }
      
    } catch {
      setError(true);
      setTimeout(() => setError(false), 3000);
      
      // 最后的降级方案：选择文本供用户手动复制
      try {
        const contentElement = document.getElementById('prompt-content');
        if (contentElement) {
          const range = document.createRange();
          range.selectNodeContents(contentElement);
          const selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
      } catch {
        // 静默处理选择失败
      }
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className={`
        absolute top-4 right-4 
        flex items-center space-x-2 
        px-4 py-2 rounded-xl 
        text-sm font-medium 
        transition-all duration-200 
        shadow-lg hover:shadow-xl
        cursor-pointer
        ${copied 
          ? 'bg-green-500 text-white scale-105' 
          : error
          ? 'bg-red-500 text-white scale-105'
          : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
        }
      `}
      disabled={copied || error}
      style={{ zIndex: 10 }}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>已复制!</span>
        </>
      ) : error ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>复制失败</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>复制内容</span>
        </>
      )}
    </button>
  );
} 