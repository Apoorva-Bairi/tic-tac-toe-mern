import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>Tic Tac Toe</h2>

      <div className="nav-links">
        <Link to="/game">Game</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/history">History</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}