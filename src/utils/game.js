export const ROOM_KEY_REGEX = /^[a-z0-9]{6,8}$/i;

export const generateRoomKey = (length = 7) => {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  let key = "";

  for (let i = 0; i < length; i += 1) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }

  return key;
};

export const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};
