'use client';

import React, { useState } from 'react';

interface CopyButtonProps {
  content: string;
}

export default function CopyButton({ content }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button 
      onClick={handleCopy}
      className={`absolute top-2 right-2 px-2 py-1 rounded text-xs transition-colors ${
        copied 
          ? 'bg-green-500 text-white' 
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
    >
      {copied ? '已复制!' : '复制'}
    </button>
  );
} 