import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

const GITHUB_URL = "https://api.github.com/users/github/repos";

export default function Resources() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    fetch(GITHUB_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Could not load GitHub repositories");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Unexpected API response");
        setRepos(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [reload]);

  if (loading) return <Spinner label="Loading public repositories..." />;
  if (error) {
    return (
      <div className="page">
        <ErrorMessage message={error} onRetry={() => setReload((n) => n + 1)} />
      </div>
    );
  }

  const visible = repos.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="page">
      <h1>Learning resources</h1>
      <p className="lead">Public GitHub repositories fetched with loading and error states.</p>
      <input
        className="search"
        placeholder="Filter repositories by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="repo-list">
        {visible.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
            <span className="muted"> ★ {repo.stargazers_count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
