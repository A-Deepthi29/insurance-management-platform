import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Report() {
  const [report, setReport] = useState({
    customers: 0,
    policies: 0,
    claims: 0,
    premiums: 0,
  });

  // Fetch Report Data
  const fetchReport = async () => {
    try {
      const res = await api.get("/reports");
      setReport(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  const loadData = async () => {
    await fetchReport();
  };

  loadData();
}, []);

const chartData = {
  labels: [
    "Customers",
    "Policies",
    "Premiums",
    "Claims",
  ],

  datasets: [
    {
      label: "Insurance Report",

      data: [
        report.customers,
        report.policies,
        report.premiums,
        report.claims,
      ],

      backgroundColor: [
        "#0d6efd",
        "#198754",
        "#ffc107",
        "#dc3545",
      ],

      borderRadius: 8,
    },
  ],
};

  return (
    <>
      <Navbar />

      <div className="container py-5">

        {/* Heading */}

        <div className="text-center mb-5">
          <h1 className="fw-bold text-primary">
            📊 Reports Dashboard
          </h1>

          <p className="text-muted">
            Business Summary and Analytics
          </p>
        </div>

        {/* Dashboard Cards */}

        <div className="row g-4">

          <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h1>👥</h1>

                <h5>Total Customers</h5>

                <h2 className="text-primary">
                  {report.customers}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h1>📄</h1>

                <h5>Total Policies</h5>

                <h2 className="text-success">
                  {report.policies}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h1>💳</h1>

                <h5>Premium Payments</h5>

                <h2 className="text-warning">
                  {report.premiums}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0 text-center">
              <div className="card-body">
                <h1>📋</h1>

                <h5>Total Claims</h5>

                <h2 className="text-danger">
                  {report.claims}
                </h2>
              </div>
            </div>
          </div>

        </div>

        <div className="card shadow-lg border-0 mt-5">

  <div className="card-header bg-primary text-white">
    <h4 className="mb-0">
      📊 Business Overview
    </h4>
  </div>

  <div className="card-body">

    <div style={{ height: "400px", width: "100%" }}>
  <Bar
    data={chartData}
    options={{
      responsive: true,
      maintainAspectRatio: false,
    }}
  />
</div>

  </div>

</div>

      </div>
    </>
  );
}

export default Report;