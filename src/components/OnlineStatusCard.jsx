import { useGame } from "../context/GameContext";

export const OnlineStatusCard = () => {
  const { connectionStatus, mySymbol, myRoomKey, copyRoomKey } = useGame();

  return (
    <div className="mb-4 text-left text-xs text-emerald-100 space-y-1 rounded-xl border border-emerald-300/30 bg-emerald-500/10 p-3">
      <p>Status: {connectionStatus}</p>
      <p>You are: {mySymbol}</p>
      {myRoomKey && (
        <div className="flex items-center gap-2">
          <span className="text-slate-100/90">Room key:</span>
          <code className="rounded-md bg-slate-950/80 border border-white/10 px-2 py-1 text-[13px] tracking-[0.14em] uppercase">
            {myRoomKey}
          </code>
          <button
            className="px-2 py-1 rounded bg-white/20 hover:bg-white/30 transition"
            onClick={copyRoomKey}
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
};
