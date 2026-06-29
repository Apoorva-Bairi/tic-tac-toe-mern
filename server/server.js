const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");

app.use(
  cors({
    origin: "https://tic-tac-toe-mern.netlify.app",
    credentials: true,
  })
);
app.use(express.json());
console.log("Auth routes loaded");
app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);

app.get("/", (req, res) => {
  res.send("Tic Tac Toe API Running");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});