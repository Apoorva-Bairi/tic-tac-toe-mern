const Game = require("../models/Game");

const saveGame = async (req, res) => {
  try {
    const { moves, winner, status } = req.body;

    const game = await Game.create({
      player: req.user,
      moves,
      winner,
      status,
    });

    res.status(201).json({
      message: "Game saved successfully",
      game,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyGames = async (req, res) => {
  try {
    const games = await Game.find({ player: req.user }).sort({ createdAt: -1 });

    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyStats = async (req, res) => {
  try {
    const games = await Game.find({ player: req.user });

    const totalGames = games.length;
    const xWins = games.filter((game) => game.winner === "X").length;
    const oWins = games.filter((game) => game.winner === "O").length;
    const draws = games.filter((game) => game.status === "draw").length;

    const winRate =
    totalGames > 0 ? ((xWins / totalGames) * 100).toFixed(1) : 0;

    res.json({
    totalGames,
    xWins,
    oWins,
    draws,
    winRate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Game.aggregate([
      { $match: { status: "win" } },
      {
        $group: {
          _id: "$player",
          wins: { $sum: 1 },
        },
      },
      { $sort: { wins: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "player",
        },
      },
      { $unwind: "$player" },
      {
        $project: {
          _id: 0,
          playerId: "$player._id",
          name: "$player.name",
          email: "$player.email",
          wins: 1,
        },
      },
    ]);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  saveGame,
  getMyGames,
  getMyStats,
  getLeaderboard,
};