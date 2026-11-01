import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page">
      <h1>404 — Page not found</h1>
      <p>That path is not part of the Student Management System.</p>
      <Link to="/">Back to home</Link>
    </div>
  );
}
