import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home-container">
      <section className="home-card">
        <div>
          <p className="home-badge">MERN Stack Game</p>
          <h1>Tic Tac Toe Arena</h1>
          <p className="home-text">
            Play Tic Tac Toe with friends or challenge the computer. Track your
            scores, view match history, check leaderboard rankings, and enjoy a
            polished game experience with sounds and confetti.
          </p>

          <div className="home-actions">
            <Link to="/register" className="primary-link">
              Get Started
            </Link>
            <Link to="/login" className="secondary-link">
              Login
            </Link>
          </div>
        </div>

        <div className="home-board">
          <span>X</span>
          <span>O</span>
          <span>X</span>
          <span>O</span>
          <span>X</span>
          <span></span>
          <span></span>
          <span>O</span>
          <span>X</span>
        </div>
      </section>
    </main>
  );
}