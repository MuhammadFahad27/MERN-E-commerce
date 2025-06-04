import React from 'react';

const Loader= () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      {/* Main spinner container */}
      <div className="relative w-20 h-20">
        
        {/* Outer ring (fast) */}
        <div className="absolute w-full h-full border-4 border-transparent rounded-full
                      border-t-blue-500 border-r-blue-400
                      animate-spin-fast"></div>
        
        {/* Middle ring (medium) */}
        <div className="absolute w-3/4 h-3/4 border-3 border-transparent rounded-full
                      border-b-emerald-500 border-l-emerald-400
                      animate-spin-medium top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Inner dot (pulse) */}
        <div className="absolute w-2 h-2 bg-cyan-400 rounded-full
                      animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                      shadow-[0_0_8px_#00FFFF]"></div>
        
        {/* Glow effect */}
        <div className="absolute w-full h-full rounded-full
                      shadow-[0_0_15px_#00FFFF] opacity-70"></div>
      </div>
    </div>
  );
};

export default Loader;