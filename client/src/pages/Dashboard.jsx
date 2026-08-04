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
          background:
"linear-gradient(to bottom,#eef2ff,#ffffff)",
        }}
      >

        <div
  className="rounded-4 shadow-lg p-5 mb-5 text-white"
  style={{
    background:
      "linear-gradient(135deg,#2563eb,#4f46e5,#7c3aed)",
  }}
>
  <div className="d-flex justify-content-between align-items-center flex-wrap">

    <div>

      <h1 className="fw-bold display-5">
        🛡 Insurance Dashboard
      </h1>

      <p
        className="fs-5 mt-3 mb-0"
        style={{
          opacity: "0.9",
        }}
      >
        Manage Customers, Policies, Premiums,
        Claims and Documents from one place.
      </p>

    </div>

    <div className="text-center mt-3 mt-lg-0">

      <h2 className="fw-bold">
        Welcome 👋
      </h2>

      <p className="mb-0">
        Insurance Management Platform
      </p>

    </div>

  </div>
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
                    <button
 className={`btn btn-${card.color} px-4 py-2 rounded-pill`}
>

Open Module →

</button>
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