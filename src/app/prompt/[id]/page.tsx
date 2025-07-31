import React from 'react';
import PromptDetailClient from './PromptDetailClient';

export default async function PromptDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return <PromptDetailClient id={id} />;
} 