import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <h1 id="title">
        <Link to="/">Budgtr</Link>
      </h1>
      <button className="new-btn">
        <Link to="/transactions/new">New Transactions</Link>
      </button>
    </nav>
  );
}