import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Insurance Management Dashboard</h1>

      <br />

      <Link to="/customers">
        <button>Customer Management</button>
      </Link>

      <br />
      <br />

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;