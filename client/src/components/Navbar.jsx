import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{
        background: "linear-gradient(90deg,#2563eb,#4f46e5)",
      }}
    >
      <div className="container-fluid">

        <Link
          className="navbar-brand fw-bold fs-4"
          to="/dashboard"
        >
          🛡 Insurance Platform
        </Link>

        {/* Mobile Toggle */}
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
          {/* Left Menu */}
          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                🏠 Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/customers">
                👥 Customers
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/policy">
                📄 Policies
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/premium">
                💳 Premiums
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/claim">
                📋 Claims
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/document">
                📁 Documents
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/report">
                📊 Reports
              </Link>
            </li>

          </ul>

          {/* Right Side */}
          <div className="d-flex align-items-center">

            <div className="text-end me-3">
              <div className="text-white fw-bold">
                👤 {user?.name}
              </div>

              <small className="text-light">
                {role}
              </small>
            </div>

            <button
              className="btn btn-light rounded-pill"
              onClick={logout}
            >
              🚪 Logout
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;