import { useGame } from "../context/GameContext";
import localModeImage from "../images/local_mode.png";
import onlineModeImage from "../images/online_mode.png";

export const DashboardPage = () => {
  const { roomKeyInput, setRoomKeyInput, switchToLocal, startHostGame, joinWithKey } = useGame();

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
      <section className="rounded-2xl border border-cyan-300/20 bg-gradient-to-b from-cyan-500/15 to-blue-900/20 p-4 md:p-5 shadow-[0_18px_40px_rgba(14,120,255,0.2)]">
        <img
          src={localModeImage}
          alt="Local mode artwork"
          className="w-full h-40 object-cover rounded-xl border border-white/10"
        />
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-cyan-200/90">Mode 1</p>
        <h2 className="mt-1 text-2xl font-extrabold text-white">Local Pass & Play</h2>
        <p className="mt-2 text-sm text-slate-200">Two players, one screen, quick rounds.</p>
        <button
          className="mt-5 w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-4 py-3 transition"
          onClick={switchToLocal}
        >
          Start Local Match
        </button>
      </section>

      <section className="rounded-2xl border border-emerald-300/20 bg-gradient-to-b from-emerald-500/15 to-blue-900/20 p-4 md:p-5 shadow-[0_18px_40px_rgba(16,185,129,0.2)]">
        <img
          src={onlineModeImage}
          alt="Online mode artwork"
          className="w-full h-40 object-cover rounded-xl border border-white/10"
        />
        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-emerald-200/90">Mode 2</p>
        <h2 className="mt-1 text-2xl font-extrabold text-white">Online Room Key</h2>
        <p className="mt-2 text-sm text-slate-200">Create or join a private room with your friend.</p>
        <button
          className="mt-5 w-full rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-4 py-3 transition"
          onClick={startHostGame}
        >
          Create Online Room
        </button>
        <div className="mt-3 flex gap-2">
          <input
            className="flex-1 rounded-xl border border-white/20 bg-slate-900/60 text-slate-100 placeholder:text-slate-400 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter 6-8 char key"
            value={roomKeyInput}
            onChange={(event) => setRoomKeyInput(event.target.value)}
            maxLength={8}
          />
          <button
            className="rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-bold px-4 py-2.5 transition"
            onClick={joinWithKey}
          >
            Join
          </button>
        </div>
      </section>
    </div>
  );
};
