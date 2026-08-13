import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div>
        <span>404</span>
        <h1>Page not found</h1>
        <p>The page you requested has not been created yet.</p>
        <Link to="/">Return to homepage</Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
