import React from 'react';

const Loader: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .loader-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #ecfdf5, #fef3c7, #ecfdf5);
          animation: fadeIn 0.5s ease-out;
        }
        
        .loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }
        
        .spinner-wrapper {
          position: relative;
          width: 80px;
          height: 80px;
        }
        
        .spinner-circle {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 4px solid transparent;
          border-top-color: #10b981;
          border-right-color: #f59e0b;
          animation: spin 1s linear infinite;
        }
        
        .spinner-inner {
          position: absolute;
          inset: 12px;
          border-radius: 50%;
          border: 4px solid transparent;
          border-top-color: #f59e0b;
          border-right-color: #10b981;
          animation: spin 0.7s linear infinite reverse;
        }
        
        .spinner-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #10b981, #f59e0b);
          border-radius: 50%;
          animation: pulse 1.5s ease-in-out infinite;
        }
        
        .loading-text {
          font-size: 18px;
          font-weight: 600;
          background: linear-gradient(135deg, #10b981, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: pulse 2s ease-in-out infinite;
          letter-spacing: 0.5px;
        }
        
        .package-icon {
          width: 40px;
          height: 40px;
          animation: float 2s ease-in-out infinite;
        }
      `}</style>

      <div className="loader-container">
        <div className="loader-content">
          {/* Package Icon */}
          <svg 
            className="package-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="url(#gradient)" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <path d="M16.5 9.4l-9-5.19" />
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          
          {/* Spinner */}
          <div className="spinner-wrapper">
            <div className="spinner-circle"></div>
            <div className="spinner-inner"></div>
            <div className="spinner-dot"></div>
          </div>
          

          <div className="loading-text">wait a moment...</div>
        </div>
      </div>
    </>
  );
};

export default Loader;