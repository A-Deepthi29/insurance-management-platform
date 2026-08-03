import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">

      <div className="container-fluid">

        <Link className="navbar-brand fw-bold" to="/dashboard">
          🛡 Insurance Platform
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/dashboard"
              >
                🏠 Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/customers"
              >
                👥 Customers
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/policy"
              >
                📄 Policies
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/premium"
              >
                💳 Premiums
              </Link>
            </li>

            <li className="nav-item">
  <Link className="nav-link" to="/claim">
    📋 Claims
  </Link>
</li>

          </ul>

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;