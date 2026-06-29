import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    if (!form.email.trim()) return "Email is required";
    if (!form.email.includes("@")) return "Enter a valid email";
    if (!form.password.trim()) return "Password is required";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) return setError(validationError);

    try {
      const { data } = await API.post("/auth/login", form);
      login(data);
      navigate("/game");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-card">
        <h1>Login</h1>

        {error && <p className="error-msg">{error}</p>}

        <input
          className="auth-input"
          placeholder="Email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="auth-btn" type="submit">Login</button>

        <p className="auth-link">
          Don&apos;t have an account? <Link to="/">Register</Link>
        </p>
      </form>
    </div>
  );
}