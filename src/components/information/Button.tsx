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
    ${shouldDisable ? "cursor-not-allowed opacity-50" : ""} p-2
    rounded-md  transition duration-300 ease-in-out bg-[linear-gradient(90deg,_#0062BA_0%,_#009BDE_100%)] transform hover:scale-110 w-[120px] line-clamp-1
    ${!shouldDisable && "transform hover:scale-110"}`}
      onClick={shouldDisable ? undefined : onClick}
      disabled={shouldDisable}
    >
      <span className="text-xs sm:text-sm text-white">{buttonText}</span>
    </button>
  );
};

export default InteractiveGradientButton;
