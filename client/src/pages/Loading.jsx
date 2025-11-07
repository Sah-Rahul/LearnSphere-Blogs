import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-300 rounded-full animate-spin border-t-violet-600"></div>

        <div className="absolute w-16 h-16 rounded-full bg-violet-500 blur-xl opacity-30 animate-pulse"></div>
      </div>

      <p className="mt-6 text-violet-600 text-lg font-semibold tracking-wide animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loading;
