import { useGame } from "../context/GameContext";

export const Scoreboard = () => {
  const { scoreboard } = useGame();

  return (
    <div className="mb-4 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-slate-950/50 p-3">
      <div className="rounded-xl bg-cyan-500/15 border border-cyan-300/20 py-2">
        <p className="text-xs uppercase tracking-wider text-cyan-200 px-3">X Wins</p>
        <p className="text-2xl font-extrabold text-cyan-100 px-3">{scoreboard.X}</p>
      </div>
      <div className="rounded-xl bg-amber-500/15 border border-amber-300/20 py-2">
        <p className="text-xs uppercase tracking-wider text-amber-200 px-3">O Wins</p>
        <p className="text-2xl font-extrabold text-amber-100 px-3">{scoreboard.O}</p>
      </div>
      <div className="rounded-xl bg-slate-500/15 border border-slate-300/20 py-2">
        <p className="text-xs uppercase tracking-wider text-slate-200 px-3">Draws</p>
        <p className="text-2xl font-extrabold text-slate-100 px-3">{scoreboard.draws}</p>
      </div>
    </div>
  );
};
