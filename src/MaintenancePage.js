import React, { useState } from 'react';

// Material Design Maintenance Page - Dark Mode (Google Gemini Style)
export default function MaintenancePage() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="min-h-screen bg-[#131314] flex items-center justify-center p-4 font-sans">
      {/* Main Content Card - Material Design */}
      <div className="max-w-2xl w-full">
        {/* Material Card */}
        <div className="bg-[#1e1f20] rounded-3xl border border-[#444746] p-8 md:p-12 shadow-2xl">
          
          {/* Logo Section */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {!imageError ? (
                <img 
                  src="/logo.png" 
                  alt="Shankhnaad Logo" 
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full shadow-lg"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#333537] flex items-center justify-center text-5xl text-[#e3e3e3] font-bold shadow-lg">
                  ॐ
                </div>
              )}
            </div>
          </div>

          {/* App Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#e3e3e3] mb-2">
              Shankhnaad
            </h1>
            <p className="text-sm text-[#a8c7fa] font-medium">
              Krishna Consciousness Society
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-[#444746] mb-8"></div>

          {/* Lost in Maya - Now at the top */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 italic mb-6">
              "Lost in Maya"
            </p>
          </div>

          {/* Maintenance Notice - Material Design */}
          <div className="text-center mb-8">
            <p className="text-base md:text-lg text-[#e3e3e3] leading-relaxed mb-3">
              We are undergoing technical maintenance to serve you all better
            </p>
            <p className="text-sm md:text-base text-gray-400">
              We will soon be back again
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-[#444746] my-8"></div>

          {/* Spiritual Message */}
          <div className="text-center mb-6">
            <p className="text-base md:text-lg font-medium text-[#e3e3e3] mb-6">
              Till then, chant the Hare Krishna Mahamantra
            </p>
          </div>

          {/* Mahamantra - English */}
          <div className="bg-[#131314] rounded-2xl border border-[#444746] p-6 md:p-8 mb-8">
            <div className="text-center text-[#a8c7fa] text-lg md:text-xl space-y-3 font-medium leading-relaxed">
              <p>Hare Krishna Hare Krishna</p>
              <p>Krishna Krishna Hare Hare</p>
              <p>Hare Rama Hare Rama</p>
              <p>Rama Rama Hare Hare</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#444746] mb-6"></div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Connecting souls to divine consciousness
            </p>
            <p className="text-xs text-gray-600 mt-2">
              © Krishna Consciousness Society
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
