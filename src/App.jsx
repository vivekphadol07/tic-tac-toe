import { AppShell } from "./components/AppShell";
import { GameProvider, useGame } from "./context/GameContext";
import { DashboardPage } from "./pages/DashboardPage";
import { GamePage } from "./pages/GamePage";

const AppContent = () => {
  const { isDashboard } = useGame();

  return (
    <AppShell>
      {isDashboard ? <DashboardPage /> : <GamePage />}
    </AppShell>
  );
};

export const App = () => {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
};
