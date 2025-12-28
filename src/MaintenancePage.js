import React from 'react';

// Maintenance Page Component
export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute w-64 h-64 bg-yellow-500/10 rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl w-full">
        <div className="bg-black/40 backdrop-blur-xl rounded-3xl border-2 border-orange-500/30 p-8 md:p-12 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="Shankhnaad Logo" 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-2xl ring-4 ring-orange-500/50 animate-bounce"
                style={{animationDuration: '3s'}}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              {/* Fallback OM symbol if logo fails to load */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 hidden items-center justify-center text-6xl text-white font-bold shadow-2xl ring-4 ring-orange-500/50">
                ॐ
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent animate-pulse">
            Lost in Maya
          </h1>

          {/* Main Message */}
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6 md:p-8 mb-8">
            <p className="text-lg md:text-2xl text-center text-orange-100 leading-relaxed mb-4">
              We are undergoing technical maintenance
            </p>
            <p className="text-base md:text-xl text-center text-orange-200 leading-relaxed">
              We will soon be back again
            </p>
          </div>

          {/* Mahamantra Section */}
          <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-2 border-purple-500/50 rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-center text-purple-200 mb-4">
              Till then, chant the Hare Krishna Mahamantra
            </h2>
            <div className="bg-black/30 rounded-xl p-4 md:p-6 space-y-2">
              <p className="text-lg md:text-2xl text-center text-yellow-300 font-semibold leading-relaxed animate-pulse">
                हरे कृष्ण हरे कृष्ण
              </p>
              <p className="text-lg md:text-2xl text-center text-yellow-300 font-semibold leading-relaxed animate-pulse" style={{animationDelay: '0.5s'}}>
                कृष्ण कृष्ण हरे हरे
              </p>
              <p className="text-lg md:text-2xl text-center text-yellow-300 font-semibold leading-relaxed animate-pulse" style={{animationDelay: '1s'}}>
                हरे राम हरे राम
              </p>
              <p className="text-lg md:text-2xl text-center text-yellow-300 font-semibold leading-relaxed animate-pulse" style={{animationDelay: '1.5s'}}>
                राम राम हरे हरे
              </p>
            </div>
          </div>

          {/* English Translation */}
          <div className="text-center space-y-3 mb-6">
            <p className="text-base md:text-lg italic text-orange-200">
              Hare Krishna Hare Krishna
            </p>
            <p className="text-base md:text-lg italic text-orange-200">
              Krishna Krishna Hare Hare
            </p>
            <p className="text-base md:text-lg italic text-orange-200">
              Hare Rama Hare Rama
            </p>
            <p className="text-base md:text-lg italic text-orange-200">
              Rama Rama Hare Hare
            </p>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">
              🙏 Krishna Consciousness Society
            </p>
            <p className="text-xs text-gray-500">
              Connecting souls to divine consciousness
            </p>
          </div>
        </div>

        {/* Floating Om symbols for decoration */}
        <div className="absolute top-0 left-0 text-6xl text-orange-500/10 animate-spin" style={{animationDuration: '20s'}}>
          ॐ
        </div>
        <div className="absolute bottom-0 right-0 text-6xl text-purple-500/10 animate-spin" style={{animationDuration: '25s', animationDirection: 'reverse'}}>
          ॐ
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
