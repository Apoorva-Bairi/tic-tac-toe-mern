import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await API.get("/game/my-stats", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setStats(data);
    };

    fetchStats();
  }, [user]);

  if (!stats) return <h2 className="loading">Loading...</h2>;

  return (
    <>
      <Navbar />

      <main className="page-container">
        <h1>My Dashboard</h1>
        <p className="page-subtitle">Track your Tic Tac Toe performance</p>

        <div className="stats-grid">
          <div className="stat-box">
            <span>Total Games</span>
            <h2>{stats.totalGames}</h2>
          </div>

          <div className="stat-box win">
            <span>X Wins</span>
            <h2>{stats.xWins}</h2>
          </div>

          <div className="stat-box loss">
            <span>O Wins</span>
            <h2>{stats.oWins}</h2>
          </div>

          <div className="stat-box draw">
            <span>Draws</span>
            <h2>{stats.draws}</h2>
          </div>

          <div className="stat-box">
            <span>Win Rate</span>
            <h2>{stats.winRate}%</h2>
          </div>

          <div className="stat-box">
            <span>Best Result</span>
            <h2>{stats.xWins >= stats.oWins ? "X Lead" : "O Lead"}</h2>
          </div>
        </div>
      </main>
    </>
  );
}