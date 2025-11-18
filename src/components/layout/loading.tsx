'use client';

import { useLoadingStore } from '@/services/loadingService';

export const Loading = () => {
  const isLoading = useLoadingStore().isLoading;

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative flex flex-col items-center justify-center">
        {/* Modern spinner with gradient and pulse effect */}
        <div className="relative">
          {/* Outer ring */}
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200"></div>
          {/* Inner spinning ring */}
          <div className="absolute top-0 left-0 h-16 w-16 animate-spin rounded-full border-6 border-transparent border-t-primary-500"></div>
        </div>
        {/* Loading text with better styling */}
        <span className="mt-6 text-lg font-medium text-white tracking-wide">Loading...</span>
      </div>
    </div>
  );
};