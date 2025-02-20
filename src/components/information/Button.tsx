import React from "react";

interface GradientButtonProps {
  buttonText: string | undefined;
  isSelected?: boolean;
  onClick: () => void;
  shouldDisable?: boolean;
}

const InteractiveGradientButton: React.FC<GradientButtonProps> = ({
  buttonText,
  isSelected,
  onClick,
  shouldDisable,
}) => {
  return (
    <button
      className={`z-0 ${isSelected ? "transform scale-120" : ""}
    ${shouldDisable ? "cursor-not-allowed opacity-50" : ""}
    px-2 sm:px-4 md:px-6 py-2 rounded-md transition duration-300 ease-in-out bg-[linear-gradient(90deg,_#03081A_0%,_#2b4361_100%)]
    ${!shouldDisable && "transform hover:scale-110"}`}
      onClick={shouldDisable ? undefined : onClick}
      disabled={shouldDisable}
    >
      <span className="text-xs sm:text-sm md:text-lg text-white">
        {buttonText}
      </span>
    </button>
  );
};

export default InteractiveGradientButton;
