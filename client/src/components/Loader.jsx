import React from 'react';

const Loader = () => (
  <div className="flex flex-col items-center justify-center gap-3" role="status">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#6469ff] border-r-[#9575ff] animate-spin"></div>
    </div>
    <p className="text-sm text-gray-600 font-medium">Loading...</p>
  </div>
);

export default Loader;