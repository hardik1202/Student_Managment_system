import { NavLink, useNavigate } from "react-router-dom";

export default function NavBar({ dark, onToggleTheme }) {
  const navigate = useNavigate();
  const email = localStorage.getItem("sms_email");

  const logout = () => {
    localStorage.removeItem("sms_token");
    localStorage.removeItem("sms_email");
    navigate("/login");
  };

  return (
    <nav className="nav">
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/students">Students</NavLink>
      <NavLink to="/resources">Resources</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      {email ? (
        <button type="button" className="ghost" onClick={logout}>
          Logout
        </button>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
      <button type="button" className="ghost" onClick={onToggleTheme}>
        {dark ? "Light" : "Dark"} mode
      </button>
    </nav>
  );
}
