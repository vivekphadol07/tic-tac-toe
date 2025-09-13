import React from "react";

export const Square = ({ value, onClick }) => {
  const textColor = value === 'X' ? 'text-blue-500' : 'text-red-500';
  return (
    <button
      className={`
        w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32
        bg-white
        rounded-lg
        shadow-md
        flex items-center justify-center
        text-5xl md:text-6xl lg:text-7xl font-bold
        transition-all duration-200
        hover:scale-105
        focus:outline-none focus:ring-4 focus:ring-opacity-50
        ${value ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${textColor}
      `}
      onClick={onClick}
    >
      {value}
    </button>
  );
};