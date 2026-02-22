export const Square = ({ value, onClick, disabled, ariaLabel }) => {
  const textColor = value === "X" ? "text-cyan-200" : "text-amber-200";
  return (
    <button
      className={`
        w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28
        rounded-2xl
        border border-white/10
        bg-gradient-to-br from-slate-900/90 to-slate-800/85
        shadow-[0_10px_30px_rgba(4,8,20,0.35)]
        backdrop-blur
        flex items-center justify-center
        text-5xl md:text-6xl lg:text-7xl font-bold
        transition-all duration-200
        hover:scale-[1.03]
        focus:outline-none focus:ring-4 focus:ring-cyan-500/40
        ${disabled ? "cursor-not-allowed opacity-65" : "cursor-pointer"}
        ${textColor}
      `}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {value}
    </button>
  );
};
