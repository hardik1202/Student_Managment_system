import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api";

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "register") await register({ email, password });
      const data = await login({ email, password });
      localStorage.setItem("sms_token", data.token);
      localStorage.setItem("sms_email", data.email);
      navigate("/students");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page auth-page">
      <section className="auth-card">
        <div className="eyebrow">STAFF PORTAL</div>
        <h1>{mode === "login" ? "Welcome back" : "Create staff account"}</h1>
        <p className="lead">Manage student records securely from one simple workspace.</p>
        <form className="stack" onSubmit={submit}>
          <label>Email<input type="email" placeholder="you@college.edu" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
          <label>Password<input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
          {error && <p className="error-text">{error}</p>}
          <button type="submit">{mode === "login" ? "Sign in" : "Register and sign in"}</button>
        </form>
        {mode === "login" && <div className="demo-hint"><strong>Demo access</strong><span>demo@charusat.edu</span><span>Student@123</span></div>}
        <button type="button" className="ghost full-width" onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "Need an account? Register" : "Already registered? Login"}
        </button>
      </section>
    </div>
  );
}
