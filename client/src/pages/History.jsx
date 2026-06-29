import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function History() {
  const [games, setGames] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchGames = async () => {
      const { data } = await API.get("/game/my-games", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setGames(data);
    };

    fetchGames();
  }, [user]);

  return (
    <>
      <Navbar />

      <main className="page-container">
        <h1>Game History</h1>
        <p className="page-subtitle">Your recent match results</p>

        <div className="history-box">
          {games.length > 0 ? (
            games.map((game) => (
              <div className="history-row" key={game._id}>
                <div>
                  <h3>
                    {game.status === "draw"
                      ? "🤝 Draw"
                      : `🏆 Winner: ${game.winner}`}
                  </h3>

                  <p>Mode: {game.mode || "pvp"}</p>
                  <p>Difficulty: {game.difficulty || "easy"}</p>
                  <p>{new Date(game.createdAt).toLocaleString()}</p>
                </div>

                <div className="mini-board">
                  {game.moves.map((cell, index) => (
                    <span key={index}>{cell}</span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No games played yet</p>
          )}
        </div>
      </main>
    </>
  );
}