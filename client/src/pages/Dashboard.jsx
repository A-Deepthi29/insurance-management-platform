import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {

  const navigate = useNavigate();

  const cards = [

    {
      title: "Customers",
      icon: "👥",
      description: "Add, Edit and Delete Customers",
      color: "primary",
      path: "/customers",
    },

    {
      title: "Policies",
      icon: "📄",
      description: "Manage Insurance Policies",
      color: "success",
      path: "/policy",
    },

    {
      title: "Premium Tracking",
      icon: "💳",
      description: "Track Premium Payments",
      color: "warning",
      path: "/premium",
    },

    {
      title: "Claim Management",
      icon: "📋",
      description: "Submit and Manage Claims",
      color: "danger",
      path: "/claim",
    },

    {
      title: "Document Management",
      icon: "📁",
      description: "Upload and Manage Documents",
      color: "info",
      path: "/document",
    },

    {
      title: "Reports",
      icon: "📊",
      description: "Business Analytics & Reports",
      color: "secondary",
      path: "/report",
    },

  ];
    return (
    <>
      <Navbar />

      <div
        className="container-fluid py-5"
        style={{
          minHeight: "100vh",
          background: "#f4f7fc",
        }}
      >

        {/* Hero */}

        <div
          className="p-5 rounded-4 shadow-lg text-white mb-5"
          style={{
            background:
              "linear-gradient(135deg,#0d6efd,#6610f2)",
          }}
        >

          <h1 className="fw-bold display-5">
            🛡 Insurance Management Platform
          </h1>

          <p className="fs-5 mb-0">

            Welcome Back!

            Manage Customers, Policies,
            Premiums, Claims, Documents
            and Reports from one place.

          </p>

        </div>
                {/* Navigation Cards */}

        <div className="row g-4">

          {cards.map((card) => (

            <div
              key={card.title}
              className="col-lg-4 col-md-6"
            >

              <div
                className="card shadow-lg border-0 h-100"

                style={{
                  cursor: "pointer",
                  transition: "0.3s",
                }}

                onClick={() =>
                  navigate(card.path)
                }

                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-6px)";
                }}

                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                }}

              >

                <div className="card-body text-center p-4">

                  <h1
                    className={`text-${card.color}`}
                    style={{
                      fontSize: "55px",
                    }}
                  >
                    {card.icon}
                  </h1>

                  <h4 className="fw-bold mt-3">

                    {card.title}

                  </h4>

                  <p className="text-muted">

                    {card.description}

                  </p>

                  <button
                    className={`btn btn-${card.color} mt-2`}
                  >
                    Open Module
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
              </div>

    </>

  );

}

export default Dashboard;