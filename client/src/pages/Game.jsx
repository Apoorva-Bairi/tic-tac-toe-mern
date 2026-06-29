import { useMemo, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import confetti from "canvas-confetti";

export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState("");
  const [mode, setMode] = useState("pvp");
  const [difficulty, setDifficulty] = useState("easy");
  const [winningCells, setWinningCells] = useState([]);

  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [drawScore, setDrawScore] = useState(0);

  const [playerX, setPlayerX] = useState("Player 1");
  const [playerO, setPlayerO] = useState("Player 2");

  const { user } = useAuth();

  const sounds = useMemo(
    () => ({
      click: new Audio("/sounds/click.wav"),
      win: new Audio("/sounds/win.wav"),
      draw: new Audio("/sounds/draw.wav"),
    }),
    []
  );

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const showConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  const checkWinner = (newBoard) => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;

      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        setWinningCells([a, b, c]);
        return newBoard[a];
      }
    }

    return null;
  };

  const saveGame = async (finalBoard, winnerSymbol, status) => {
    await API.post(
      "/game/save",
      {
        moves: finalBoard,
        winner: winnerSymbol,
        status,
        mode,
        difficulty,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
  };

  const getRandomMove = (currentBoard) => {
    const emptyCells = currentBoard
      .map((cell, index) => (cell === "" ? index : null))
      .filter((val) => val !== null);

    if (emptyCells.length === 0) return null;

    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };

  const getSmartMove = (currentBoard) => {
    let move = null;

    for (let pattern of winningPatterns) {
      const values = pattern.map((index) => currentBoard[index]);

      if (values.filter((v) => v === "O").length === 2 && values.includes("")) {
        return pattern[values.indexOf("")];
      }

      if (values.filter((v) => v === "X").length === 2 && values.includes("")) {
        move = pattern[values.indexOf("")];
      }
    }

    return move;
  };

  const getComputerMove = (currentBoard) => {
    if (difficulty === "easy") {
      return getRandomMove(currentBoard);
    }

    const smartMove = getSmartMove(currentBoard);

    if (smartMove !== null) {
      return smartMove;
    }

    if (difficulty === "hard") {
      if (currentBoard[4] === "") return 4;

      const corners = [0, 2, 6, 8].filter(
        (index) => currentBoard[index] === ""
      );

      if (corners.length > 0) {
        return corners[Math.floor(Math.random() * corners.length)];
      }
    }

    return getRandomMove(currentBoard);
  };

  const computerMove = async (currentBoard) => {
    const move = getComputerMove(currentBoard);

    if (move === null) return;

    const updatedBoard = [...currentBoard];
    updatedBoard[move] = "O";
    setBoard(updatedBoard);

    const gameWinner = checkWinner(updatedBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      sounds.win.play();
      showConfetti();
      setOScore((prev) => prev + 1);
      await saveGame(updatedBoard, gameWinner, "lose");
      return;
    }

    if (!updatedBoard.includes("")) {
      setWinner("Draw");
      sounds.draw.play();
      setDrawScore((prev) => prev + 1);
      await saveGame(updatedBoard, "", "draw");
    }
  };

  const handleClick = async (index) => {
    if (board[index] || winner) return;
    if (mode === "cpu" && !isXTurn) return;

    sounds.click.play();

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      sounds.win.play();
      showConfetti();

      if (gameWinner === "X") {
        setXScore((prev) => prev + 1);
      } else {
        setOScore((prev) => prev + 1);
      }

      await saveGame(newBoard, gameWinner, "win");
      return;
    }

    if (!newBoard.includes("")) {
      setWinner("Draw");
      sounds.draw.play();
      setDrawScore((prev) => prev + 1);
      await saveGame(newBoard, "", "draw");
      return;
    }

    if (mode === "cpu") {
      setIsXTurn(false);

      setTimeout(async () => {
        await computerMove(newBoard);
        setIsXTurn(true);
      }, 500);
    } else {
      setIsXTurn(!isXTurn);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setWinner("");
    setWinningCells([]);
    setIsXTurn(true);
  };

  const resetMatch = () => {
    resetGame();
    setXScore(0);
    setOScore(0);
    setDrawScore(0);
  };

  return (
    <>
      <Navbar />

      <div className="game-container">
        <div className="game-card">
          <h1>Tic Tac Toe</h1>

          <div className="mode-buttons">
            <button
              className={mode === "pvp" ? "active-mode" : ""}
              onClick={() => {
                setMode("pvp");
                resetMatch();
              }}
            >
              Player vs Player
            </button>

            <button
              className={mode === "cpu" ? "active-mode" : ""}
              onClick={() => {
                setMode("cpu");
                resetMatch();
              }}
            >
              Player vs Computer
            </button>
          </div>

          <p className="mode-text">
            Current Mode:{" "}
            {mode === "pvp" ? "Player vs Player" : "Player vs Computer"}
          </p>

          {mode === "cpu" && (
            <div className="difficulty-buttons">
              <button
                className={difficulty === "easy" ? "active-difficulty" : ""}
                onClick={() => setDifficulty("easy")}
              >
                Easy
              </button>

              <button
                className={difficulty === "medium" ? "active-difficulty" : ""}
                onClick={() => setDifficulty("medium")}
              >
                Medium
              </button>

              <button
                className={difficulty === "hard" ? "active-difficulty" : ""}
                onClick={() => setDifficulty("hard")}
              >
                Hard
              </button>
            </div>
          )}

          <div className="player-inputs">
            <input
              value={playerX}
              onChange={(e) => setPlayerX(e.target.value)}
              placeholder="Player X name"
            />

            <input
              value={mode === "cpu" ? "Computer" : playerO}
              onChange={(e) => setPlayerO(e.target.value)}
              placeholder="Player O name"
              disabled={mode === "cpu"}
            />
          </div>

          <div className="game-layout">
            <div className="scoreboard">
              <div className="score-box">
                <h3>X</h3>
                <p>{xScore}</p>
              </div>

              <div className="score-box">
                <h3>O</h3>
                <p>{oScore}</p>
              </div>

              <div className="score-box">
                <h3>Draw</h3>
                <p>{drawScore}</p>
              </div>
            </div>

            <div className="game-main">
              <div className="board">
                {board.map((cell, index) => (
                  <button
                    key={index}
                    onClick={() => handleClick(index)}
                    className={`cell ${
                      winningCells.includes(index) ? "winning-cell" : ""
                    }`}
                  >
                    {cell}
                  </button>
                ))}
              </div>

              <h2 className={winner ? "winner-text" : "turn-text"}>
                {winner
                  ? winner === "Draw"
                    ? "🤝 It's a Draw!"
                    : `🎉 Yay! ${
                        winner === "X"
                          ? playerX
                          : mode === "cpu"
                          ? "Computer"
                          : playerO
                      } Wins!`
                  : mode === "cpu"
                  ? isXTurn
                    ? `Your Turn: ${playerX}`
                    : "Computer Thinking..."
                  : `Turn: ${isXTurn ? playerX : playerO}`}
              </h2>

              <div className="game-actions">
                {winner && (
                  <button onClick={resetGame} className="play-again-btn">
                    ↻ Play Again
                  </button>
                )}

                <button onClick={resetMatch} className="reset-btn">
                  ⟳ Reset Match
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}