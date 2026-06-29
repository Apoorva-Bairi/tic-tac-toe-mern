# 🎮 Tic Tac Toe MERN

A full-stack Tic Tac Toe game built using the MERN stack where users can play against another player or the computer, track game history, view stats, and compete on the leaderboard.

---

## 🚀 Live Demo

### Frontend (Netlify)
https://tic-tac-toe-mern.netlify.app/

### Backend (Render)
https://tic-tac-toe-mern-dqm8.onrender.com/

---

## ✨ Features

- 🔐 User Authentication (Register/Login)
- 🎯 Play in two modes:
  - Player vs Player
  - Player vs Computer
- 🤖 AI Difficulty Levels:
  - Easy
  - Medium
  - Hard
- 🎉 Winner Confetti Animation
- 🔊 Sound Effects
- 📊 Live Scoreboard
- 📈 Personal Dashboard
- 🏆 Leaderboard Ranking
- 🕘 Match History
- 📱 Fully Responsive UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

### Deployment
- Netlify (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## 📂 Project Structure

```bash
tic-tac-toe-mern/
│── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
│── server/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone repository

```bash
git clone https://github.com/Apoorva-Bairi/tic-tac-toe-mern.git
cd tic-tac-toe-mern
```

---

## Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=8000
MONGO_URI=mongodb+srv://apoorvappu6534_db_user:Apoorva1234@cluster0.pmnabpb.mongodb.net/?appName=Cluster0
JWT_SECRET=tictactoe

```

Run backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:8000/api
```

Run frontend:

```bash
npm run dev
```

---

## 📌 API Routes

### Auth Routes

- POST `/api/auth/register` → Register user
- POST `/api/auth/login` → Login user

### Game Routes

- POST `/api/game/save` → Save game
- GET `/api/game/my-stats` → Get player stats
- GET `/api/game/leaderboard` → Get leaderboard
- GET `/api/game/history` → Get game history

---

## 🎯 Future Improvements

- Multiplayer with Socket.IO
- Dark/Light Theme Toggle
- Game Timer
- Online Room System
- Rematch System
- Player Avatars

---

## 👨‍💻 Author

**Apoorva Bairi**

GitHub: https://github.com/Apoorva-Bairi

LinkedIn: [Add your LinkedIn here](https://www.linkedin.com/in/apoorva-bairi-1641b838b/)

---
