import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data } = await API.get("/game/leaderboard");
      setLeaders(data);
    };

    fetchLeaderboard();
  }, []);

  return (
    <>
      <Navbar />
      <main className="page-container">
        <h1>Leaderboard</h1>
        <p className="page-subtitle">Top players ranked by wins</p>

        <div className="leaderboard-box">
          {leaders.length > 0 ? (
            leaders.map((player, index) => (
              <div key={index} className="leader-row">
                <div className="rank">#{index + 1}</div>

                <div className="leader-info">
                  <h3>{player.name}</h3>
                  <p>{player.email}</p>
                </div>

                <div className="leader-wins">
                  <strong>{player.wins}</strong>
                  <span>Wins</span>
                </div>
              </div>
            ))
          ) : (
            <p>No leaderboard data</p>
          )}
        </div>
      </main>
    </>
  );
}