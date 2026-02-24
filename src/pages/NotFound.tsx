import React from 'react';
import { Package, Home, ArrowLeft, MapPin } from 'lucide-react';

const NotFound: React.FC = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .fade-in { animation: fadeIn 1s ease-out; }
        .slide-down { animation: slideDown 0.8s ease-out; }
        .slide-up { animation: slideUp 0.8s ease-out; }
        .float { animation: float 4s ease-in-out infinite; }
        .pulse { animation: pulse 2s ease-in-out infinite; }
        .shake { animation: shake 0.5s ease-in-out; }
        .bounce { animation: bounce 2s ease-in-out infinite; }
        
        .error-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #ecfdf5, #fef3c7, #ecfdf5);
          position: relative;
          overflow: hidden;
        }
        
        .floating-element {
          position: absolute;
          opacity: 0.15;
          pointer-events: none;
        }
        
        .number-404 {
          font-size: 200px;
          font-weight: 900;
          background: linear-gradient(135deg, #10b981, #f59e0b, #10b981);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 20px;
          text-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
          animation: shimmer 3s linear infinite;
        }
        
        .package-icon-large {
          width: 180px;
          height: 180px;
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 40px;
          box-shadow: 0 20px 60px rgba(16, 185, 129, 0.4);
          border: 4px solid rgba(255, 255, 255, 0.5);
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          padding: 60px 40px;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.5);
          max-width: 700px;
          margin: 0 auto;
        }
        
        .title-text {
          font-size: 48px;
          font-weight: 800;
          background: linear-gradient(135deg, #10b981, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
        }
        
        .description-text {
          font-size: 20px;
          color: #6b7280;
          margin-bottom: 40px;
          line-height: 1.6;
        }
        
        .button-group {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 18px 36px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(16, 185, 129, 0.4);
          background: linear-gradient(135deg, #059669, #047857);
        }
        
        .btn-primary:active {
          transform: translateY(-1px);
        }
        
        .btn-secondary {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          padding: 18px 36px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);
        }
        
        .btn-secondary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(245, 158, 11, 0.4);
          background: linear-gradient(135deg, #d97706, #b45309);
        }
        
        .btn-secondary:active {
          transform: translateY(-1px);
        }
        
        .suggestions {
          margin-top: 50px;
          padding-top: 40px;
          border-top: 2px solid rgba(16, 185, 129, 0.2);
        }
        
        .suggestions-title {
          font-size: 20px;
          font-weight: 700;
          color: #374151;
          margin-bottom: 20px;
        }
        
        .suggestion-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          align-items: center;
        }
        
        .suggestion-item {
          color: #10b981;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
          cursor: pointer;
          padding: 10px 20px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ecfdf5, #d1fae5);
          border: 1px solid #6ee7b7;
        }
        
        .suggestion-item:hover {
          transform: translateX(10px);
          background: linear-gradient(135deg, #d1fae5, #a7f3d0);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
        }
        
        @media (max-width: 768px) {
          .number-404 {
            font-size: 120px;
          }
          
          .package-icon-large {
            width: 120px;
            height: 120px;
          }
          
          .title-text {
            font-size: 32px;
          }
          
          .description-text {
            font-size: 16px;
          }
          
          .glass-card {
            padding: 40px 24px;
          }
          
          .button-group {
            flex-direction: column;
          }
          
          .btn-primary, .btn-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="error-container fade-in">
        {/* Floating Background Elements */}
        <div className="floating-element" style={{top: '10%', left: '5%'}}>
          <div style={{width: '100px', height: '100px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '50%', opacity: 0.3}} className="float"></div>
        </div>
        <div className="floating-element" style={{top: '60%', right: '8%'}}>
          <div style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '50%', opacity: 0.3}} className="float" ></div>
        </div>
        <div className="floating-element" style={{bottom: '15%', left: '15%'}}>
          <div style={{width: '120px', height: '120px', background: 'linear-gradient(135deg, #10b981, #f59e0b)', borderRadius: '50%', opacity: 0.2}} className="float"></div>
        </div>
        <div className="floating-element" style={{top: '30%', right: '20%'}}>
          <Package size={60} style={{color: '#10b981', opacity: 0.2}} className="bounce" />
        </div>
        <div className="floating-element" style={{bottom: '25%', right: '10%'}}>
          <MapPin size={50} style={{color: '#f59e0b', opacity: 0.2}} className="pulse" />
        </div>

        {/* Main Content */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '40px 20px',
          position: 'relative',
          zIndex: 1
        }}>
          <div className="glass-card">
            {/* Package Icon */}
            <div className="package-icon-large float">
              <Package size={90} color="white" strokeWidth={2.5} />
            </div>

            {/* 404 Number */}
            <div className="slide-down">
              <h1 className="number-404">404</h1>
            </div>

            {/* Title and Description */}
            <div className="slide-up">
              <h2 className="title-text">Parcel Not Found!</h2>
              <p className="description-text">
                Oops! It seems like this package has been misplaced. The page you're looking for doesn't exist or has been moved to a different location.
              </p>

              {/* Action Buttons */}
              <div className="button-group">
                <button className="btn-primary" onClick={handleGoHome}>
                  <Home size={20} />
                  <span>Go to Home</span>
                </button>
                <button className="btn-secondary" onClick={handleGoBack}>
                  <ArrowLeft size={20} />
                  <span>Go Back</span>
                </button>
              </div>

              {/* Suggestions */}
              <div className="suggestions">
                <h3 className="suggestions-title">🔍 Quick Links:</h3>
                <div className="suggestion-list">
                  <div className="suggestion-item" onClick={() => window.location.href = '/'}>
                    🏠 Dashboard
                  </div>
                  <div className="suggestion-item" onClick={() => window.location.href = '/track'}>
                    📦 Track Parcel
                  </div>
                  <div className="suggestion-item" onClick={() => window.location.href = '/contact'}>
                    📞 Contact Support
                  </div>
                  <div className="suggestion-item" onClick={() => window.location.href = '/about'}>
                    ℹ️ About Us
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;