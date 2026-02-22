# Tic-Tac-Toe Arena

A modern Tic-Tac-Toe web app built with React, Vite, Tailwind CSS, and PeerJS.

View it live here: [Tic-Tac-Toe App Demo](https://vivekphadol07.github.io/tic-tac-toe/)

It supports:
- Local mode (2 players on one device)
- Online mode (private room key for friend-vs-friend)
- Mode-specific URLs (`/tic-tac-toe/local-mode`, `/tic-tac-toe/online-mode`)
- Live game status and round scoreboard

## Demo Routes

When running locally with Vite:
- Dashboard: `http://localhost:5173/tic-tac-toe/`
- Local mode: `http://localhost:5173/tic-tac-toe/local-mode`
- Online mode: `http://localhost:5173/tic-tac-toe/online-mode`

## Features

- Local pass-and-play mode
- Online room creation with generated key
- Join online room with a 6-8 character key
- Turn control and winner/draw detection
- Scoreboard tracking (`X`, `O`, and draws)
- Room key copy action
- Styled responsive UI with mode artwork

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- PeerJS

## Project Structure

```text
src/
  components/     # UI components (board cells, shell, status cards, scoreboard)
  context/        # Game state + online connection logic
  images/         # Mode artwork assets
  pages/          # Dashboard and game screens
  utils/          # Winner calculation + room key helpers
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Deployment

This project is configured with:
- `base: "/tic-tac-toe/"` in `vite.config.js`
- GitHub Pages scripts in `package.json`:
  - `npm run predeploy`
  - `npm run deploy`

To deploy:

```bash
npm run deploy
```

## Notes

- Current lint config reports one Fast Refresh rule error in `src/context/GameContext.jsx` (`react-refresh/only-export-components`).
- Build succeeds with `npm run build`.
