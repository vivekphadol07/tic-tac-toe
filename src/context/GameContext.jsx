import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { ROOM_KEY_REGEX, calculateWinner, generateRoomKey } from "../utils/game";

const GameContext = createContext(null);
const BASE_PATH = "/tic-tac-toe";
const DASHBOARD_PATH = BASE_PATH;
const LOCAL_MODE_PATH = `${BASE_PATH}/local-mode`;
const ONLINE_MODE_PATH = `${BASE_PATH}/online-mode`;

const normalizePath = (pathname = "/") => {
  const trimmedPath = pathname.replace(/\/+$/, "");
  return trimmedPath || "/";
};

export const GameProvider = ({ children }) => {
  const [page, setPage] = useState("dashboard");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState("local");
  const [mySymbol, setMySymbol] = useState("X");
  const [roomKeyInput, setRoomKeyInput] = useState("");
  const [myRoomKey, setMyRoomKey] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("Offline");
  const [scoreboard, setScoreboard] = useState({ X: 0, O: 0, draws: 0 });

  const peerRef = useRef(null);
  const connRef = useRef(null);
  const boardRef = useRef(board);
  const xIsNextRef = useRef(xIsNext);
  const roundScoredRef = useRef(false);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(Boolean);
  const currentTurnSymbol = xIsNext ? "X" : "O";
  const isMyTurn = mode === "local" ? true : currentTurnSymbol === mySymbol;
  const onlineConnected = mode === "online" && connectionStatus === "Connected";
  const isDashboard = page === "dashboard";

  const syncPath = (nextPath, replace = false) => {
    if (typeof window === "undefined") {
      return;
    }

    const currentPath = normalizePath(window.location.pathname);
    const targetPath = normalizePath(nextPath);
    if (currentPath === targetPath) {
      return;
    }

    const updateHistory = replace ? window.history.replaceState : window.history.pushState;
    updateHistory.call(window.history, null, "", targetPath);
  };

  const sendState = (nextBoard, nextXIsNext, explicitConn) => {
    const conn = explicitConn ?? connRef.current;
    if (!conn || !conn.open) {
      return;
    }

    conn.send({
      type: "state",
      board: nextBoard ?? boardRef.current,
      xIsNext: nextXIsNext ?? xIsNextRef.current,
    });
  };

  const disconnectOnline = useCallback(() => {
    if (connRef.current) {
      connRef.current.close();
      connRef.current = null;
    }

    if (peerRef.current) {
      peerRef.current.destroy();
      peerRef.current = null;
    }

    setConnectionStatus("Offline");
    setMyRoomKey("");
  }, []);

  const resetRoundState = useCallback(() => {
    roundScoredRef.current = false;
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }, []);

  const applyPathState = useCallback((pathname) => {
    const normalizedPath = normalizePath(pathname);

    if (normalizedPath === normalizePath(LOCAL_MODE_PATH) || normalizedPath === "/local-mode") {
      disconnectOnline();
      resetRoundState();
      setMode("local");
      setMySymbol("X");
      setPage("game");
      return;
    }

    if (normalizedPath === normalizePath(ONLINE_MODE_PATH) || normalizedPath === "/online-mode") {
      disconnectOnline();
      resetRoundState();
      setMode("online");
      setMySymbol("X");
      setConnectionStatus("Offline");
      setPage("game");
      return;
    }

    disconnectOnline();
    resetRoundState();
    setMode("local");
    setMySymbol("X");
    setPage("dashboard");
  }, [disconnectOnline, resetRoundState]);

  const goToDashboard = () => {
    disconnectOnline();
    resetRoundState();
    setMode("local");
    setMySymbol("X");
    setPage("dashboard");
    syncPath(DASHBOARD_PATH);
  };

  const switchToLocal = () => {
    disconnectOnline();
    resetRoundState();
    setMode("local");
    setMySymbol("X");
    setPage("game");
    syncPath(LOCAL_MODE_PATH);
  };

  const attachConnectionHandlers = (conn) => {
    connRef.current = conn;

    conn.on("open", () => {
      setConnectionStatus("Connected");
      if (mySymbol === "X") {
        sendState(board, xIsNext, conn);
      }
    });

    conn.on("data", (message) => {
      if (message?.type !== "state") {
        return;
      }
      if (!Array.isArray(message.board) || message.board.length !== 9) {
        return;
      }

      setBoard(message.board);
      setXIsNext(Boolean(message.xIsNext));
    });

    conn.on("close", () => {
      setConnectionStatus("Disconnected");
    });

    conn.on("error", () => {
      setConnectionStatus("Connection Error");
    });
  };

  const startHostGame = () => {
    disconnectOnline();

    const roomId = generateRoomKey(7);
    resetRoundState();
    setMode("online");
    setMySymbol("X");
    setConnectionStatus("Creating Room...");
    setMyRoomKey(roomId);
    setPage("game");
    syncPath(ONLINE_MODE_PATH);

    const peer = new Peer(roomId);
    peerRef.current = peer;

    peer.on("open", () => {
      setConnectionStatus("Waiting for friend...");
    });

    peer.on("connection", (conn) => {
      if (connRef.current) {
        conn.close();
        return;
      }
      attachConnectionHandlers(conn);
    });

    peer.on("error", (error) => {
      if (error?.type === "unavailable-id") {
        setConnectionStatus("Key in use. Create room again.");
        return;
      }

      setConnectionStatus("Peer Error");
    });
  };

  const joinWithKey = () => {
    const key = roomKeyInput.trim().toLowerCase();
    if (!ROOM_KEY_REGEX.test(key)) {
      setConnectionStatus("Use a 6-8 char room key");
      return;
    }

    disconnectOnline();
    resetRoundState();
    setMode("online");
    setMySymbol("O");
    setConnectionStatus("Joining Room...");
    setPage("game");
    syncPath(ONLINE_MODE_PATH);

    const peer = new Peer();
    peerRef.current = peer;

    peer.on("open", () => {
      const conn = peer.connect(key, { reliable: true });
      attachConnectionHandlers(conn);
    });

    peer.on("error", () => {
      setConnectionStatus("Peer Error");
    });
  };

  const onCellClick = (index) => {
    if (winner || board[index] || isDraw) {
      return;
    }

    if (mode === "online" && (!onlineConnected || !isMyTurn)) {
      return;
    }

    const nextBoard = board.slice();
    nextBoard[index] = currentTurnSymbol;
    const nextTurn = !xIsNext;

    setBoard(nextBoard);
    setXIsNext(nextTurn);

    if (mode === "online") {
      sendState(nextBoard, nextTurn);
    }
  };

  const resetGame = () => {
    resetRoundState();
    if (mode === "online") {
      sendState(Array(9).fill(null), true);
    }
  };

  const copyRoomKey = async () => {
    if (!myRoomKey) {
      return;
    }

    try {
      await navigator.clipboard.writeText(myRoomKey);
      setConnectionStatus("Room key copied");
    } catch {
      setConnectionStatus("Copy failed");
    }
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    }

    if (isDraw) {
      return "Draw!";
    }

    if (mode === "online" && !onlineConnected) {
      return "Waiting for connection...";
    }

    return `Next player: ${currentTurnSymbol}`;
  };

  useEffect(() => {
    boardRef.current = board;
    xIsNextRef.current = xIsNext;
  }, [board, xIsNext]);

  useEffect(() => {
    if (!winner && !isDraw) {
      return;
    }

    if (roundScoredRef.current) {
      return;
    }

    setScoreboard((prev) => {
      if (winner === "X") {
        return { ...prev, X: prev.X + 1 };
      }
      if (winner === "O") {
        return { ...prev, O: prev.O + 1 };
      }
      return { ...prev, draws: prev.draws + 1 };
    });

    roundScoredRef.current = true;
  }, [winner, isDraw]);

  useEffect(() => {
    return () => {
      disconnectOnline();
    };
  }, [disconnectOnline]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handlePopState = () => {
      applyPathState(window.location.pathname);
    };

    handlePopState();
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [applyPathState]);

  const value = {
    page,
    isDashboard,
    mode,
    board,
    winner,
    isDraw,
    isMyTurn,
    mySymbol,
    myRoomKey,
    connectionStatus,
    scoreboard,
    roomKeyInput,
    statusText: getStatus(),
    setRoomKeyInput,
    switchToLocal,
    startHostGame,
    joinWithKey,
    goToDashboard,
    onCellClick,
    resetGame,
    copyRoomKey,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
};
