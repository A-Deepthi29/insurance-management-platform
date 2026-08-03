import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div
        className="container-fluid py-5"
        style={{
          background: "#f4f7fc",
          minHeight: "100vh",
        }}
      >
        {/* Hero Section */}
        <div
          className="p-5 rounded-4 text-white shadow mb-5"
          style={{
            background: "linear-gradient(135deg,#0d6efd,#6610f2)",
          }}
        >
          <h1 className="fw-bold">
            🛡 Insurance Management Dashboard
          </h1>

          <p className="mb-0 fs-5">
            Welcome Back! Manage your insurance business from one place.
          </p>
        </div>

        {/* Statistics */}
        <div className="row mb-5">
          <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h1>👥</h1>
                <h5>Total Customers</h5>
                <h3 className="text-primary">0</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h1>📄</h1>
                <h5>Total Policies</h5>
                <h3 className="text-success">0</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h1>💳</h1>
                <h5>Premium Payments</h5>
                <h3 className="text-warning">0</h3>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h1>📋</h1>
                <h5>Total Claims</h5>
                <h3 className="text-danger">0</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <div
              className="card shadow-lg border-0 h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/customers")}
            >
              <div className="card-body text-center">
                <h1>👥</h1>
                <h4>Customers</h4>
                <p className="text-muted">
                  Add, Edit and Delete customers
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div
              className="card shadow-lg border-0 h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/policy")}
            >
              <div className="card-body text-center">
                <h1>📄</h1>
                <h4>Policies</h4>
                <p className="text-muted">
                  Manage insurance policies
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div
              className="card shadow-lg border-0 h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/premium")}
            >
              <div className="card-body text-center">
                <h1>💳</h1>
                <h4>Premium Tracking</h4>
                <p className="text-muted">
                  Manage premium payments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;