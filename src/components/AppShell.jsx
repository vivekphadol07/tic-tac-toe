import { useGame } from "../context/GameContext";

export const AppShell = ({ children }) => {
  const { isDashboard } = useGame();

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 text-slate-100 flex items-center justify-center p-4 md:p-8 font-[Manrope]">
      <div className="pointer-events-none absolute -top-20 -left-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-8 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-blue-700/20 blur-3xl" />

      <div
        className={`relative w-full rounded-[28px] border border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.45)] ${
          isDashboard ? "max-w-6xl p-6 md:p-10" : "max-w-4xl p-6 md:p-8"
        }`}
      >
        <h1 className="font-[Cinzel] text-4xl md:text-6xl font-extrabold tracking-wide text-white">
          Tic-Tac-Toe Arena
        </h1>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          Pick your battle mode and start the match.
        </p>

        {children}
      </div>
    </div>
  );
};
