import React from 'react';

export const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="flex gap-5">
        <div
          className="w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 animate-pulse-custom"
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className="w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 animate-pulse-custom"
          style={{ animationDelay: '0.15s' }}
        ></div>
        <div
          className="w-4.5 h-4.5 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 animate-pulse-custom"
          style={{ animationDelay: '0.3s' }}
        ></div>
      </div>

      <style>{`
        @keyframes pulse-custom {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
            box-shadow: 0 0 12px 4px rgba(0, 123, 255, 0.5);
          }
          50% {
            transform: scale(1.4);
            opacity: 1;
            box-shadow: 0 0 24px 8px rgba(0, 123, 255, 1);
          }
        }
        .animate-pulse-custom {
          animation: pulse-custom 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
