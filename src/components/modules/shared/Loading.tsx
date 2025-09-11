

const Loader = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex flex-col items-center space-y-4">
        {/* Main Morphing Animation */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-ping opacity-75"></div>
          <div className="absolute inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full animate-pulse"></div>
        </div>
        
        {/* Loading Text */}
        <div className="text-white/80 text-sm font-medium tracking-wide animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loader ;