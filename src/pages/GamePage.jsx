import { OnlineStatusCard } from "../components/OnlineStatusCard";
import { Scoreboard } from "../components/Scoreboard";
import { Square } from "../components/Square";
import { useGame } from "../context/GameContext";

export const GamePage = () => {
  const {
    mode,
    board,
    winner,
    isDraw,
    isMyTurn,
    statusText,
    goToDashboard,
    onCellClick,
    resetGame,
  } = useGame();

  return (
    <>
      <div className="mt-6 mb-4 flex justify-between items-center gap-3 text-sm">
        <button
          className="px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-slate-100 font-semibold hover:bg-slate-700 transition"
          onClick={goToDashboard}
        >
          Back to Dashboard
        </button>
        <span className="font-semibold text-slate-300">
          Mode: {mode === "online" ? "Online Room" : "Local Match"}
        </span>
      </div>

      <Scoreboard />

      {mode === "online" && <OnlineStatusCard />}

      <div className="grid grid-cols-3 gap-3 md:gap-4 place-items-center">
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => onCellClick(index)}
            disabled={Boolean(winner || isDraw || value || (mode === "online" && !isMyTurn))}
            ariaLabel={`Cell ${index + 1}: ${value ?? "empty"}`}
          />
        ))}
      </div>

      <div className="mt-8">
        <p
          className={`text-2xl font-bold mb-4 ${
            winner ? (winner === "X" ? "text-cyan-300" : "text-amber-300") : "text-slate-100"
          }`}
        >
          {statusText}
        </p>
        <button
          className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold shadow-lg transition focus:outline-none focus:ring-4 focus:ring-blue-400/40"
          onClick={resetGame}
        >
          New Game
        </button>
      </div>
    </>
  );
};
