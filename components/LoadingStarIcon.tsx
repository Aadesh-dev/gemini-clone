import React from "react";
import GeminiStarIcon from "./icons/GeminiStarIcon";

const LoadingStarIcon = () => {
  return (
    <div className="relative mr-[20px] inline-block h-fit">
      <div className="absolute inset-0">
        {/* the spinning arc: only the top border is colored, the rest are transparent */}
        <div className="h-full w-full animate-spin rounded-full border-2 border-solid border-t-[#5684D1] border-r-transparent border-b-transparent border-l-transparent" />
      </div>

      {/* place the icon in the center, above the spinner */}
      <div className="relative z-1 grid h-8 w-8 place-items-center">
        <GeminiStarIcon width={18.5} height={18.5} />
      </div>
    </div>
  );
};

export default LoadingStarIcon;
