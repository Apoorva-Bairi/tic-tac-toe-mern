const express = require("express");
const {
  saveGame,
  getMyGames,
  getMyStats,
  getLeaderboard,
} = require("../controllers/gameController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/save", protect, saveGame);
router.get("/my-games", protect, getMyGames);
router.get("/my-stats", protect, getMyStats);
router.get("/leaderboard", getLeaderboard);

module.exports = router;