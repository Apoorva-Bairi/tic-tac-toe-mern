const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    moves: {
      type: [String],
      default: [],
    },
    winner: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["win", "lose", "draw"],
      required: true,
    },
    mode: {
  type: String,
  default: "pvp",
},
difficulty: {
  type: String,
  default: "easy",
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);