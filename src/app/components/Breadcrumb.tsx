'use client';

import React from 'react';
import Link from 'next/link';

interface BreadcrumbProps {
  items: {
    label: string;
    href: string;
  }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          <Link 
            href={item.href}
            className={`hover:text-blue-600 transition-colors ${
              index === items.length - 1 ? 'text-gray-900 font-medium' : 'text-gray-600'
            }`}
          >
            {item.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
