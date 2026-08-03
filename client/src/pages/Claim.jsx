import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Claim() {
  const [policies, setPolicies] = useState([]);
const [claims, setClaims] = useState([]);

const [editingId, setEditingId] = useState(null);

const [formData, setFormData] = useState({
  policyId: "",
  claimAmount: "",
  reason: "",
  submissionDate: "",
  status: "Pending",
});
  // Fetch Policies
  const fetchPolicies = async () => {
    try {
      const res = await api.get("/policies");
      setPolicies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch Claims
  const fetchClaims = async () => {
    try {
      const res = await api.get("/claims");
      setClaims(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  const loadData = async () => {
    await Promise.all([
      fetchPolicies(),
      fetchClaims(),
    ]);
  };

  loadData();
}, []);

  // Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Save / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/claims/${editingId}`, formData);
        alert("Claim Updated Successfully");
      } else {
        await api.post("/claims", formData);
        alert("Claim Added Successfully");
      }

      setEditingId(null);

      setFormData({
        policyId: "",
        claimAmount: "",
        reason: "",
        submissionDate: "",
        status: "Pending",
      });

      fetchClaims();
    } catch (err) {
      console.log(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server Error");
      }
    }
  };

  // Edit
  const editClaim = (claim) => {
    setEditingId(claim.id);

    setFormData({
      policyId: claim.policyId,
      claimAmount: claim.claimAmount,
      reason: claim.reason,
      submissionDate: claim.submissionDate.substring(0, 10),
      status: claim.status,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete
  const deleteClaim = async (id) => {
    if (!window.confirm("Delete this claim?")) return;

    try {
      await api.delete(`/claims/${id}`);

      alert("Claim Deleted Successfully");

      fetchClaims();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="container py-5"
        style={{
          maxWidth: "1100px",
        }}
      >
        {/* Heading */}

        <div className="text-center mb-5">

          <h1 className="fw-bold text-primary">
            📋 Claim Management
          </h1>

          <p className="text-muted">
            Submit, review and manage insurance claims.
          </p>

        </div>

        {/* Form */}

        <div className="card shadow-lg border-0 mb-5">

          <div className="card-header bg-primary text-white">

            <h4 className="mb-0">
              {editingId ? "Update Claim" : "Submit New Claim"}
            </h4>

          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Policy
                  </label>

                  <select
                    className="form-select"
                    name="policyId"
                    value={formData.policyId}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Policy
                    </option>

                    {policies.map((policy) => (

                      <option
                        key={policy.id}
                        value={policy.id}
                      >
                        {policy.policyNumber}
                      </option>

                    ))}

                  </select>

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Claim Amount
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    name="claimAmount"
                    value={formData.claimAmount}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Submission Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="submissionDate"
                    value={formData.submissionDate}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Status
                  </label>

                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >

                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>

                  </select>

                </div>

                <div className="col-12 mb-4">

                  <label className="form-label">
                    Reason
                  </label>

                  <textarea
                    rows="4"
                    className="form-control"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              <button
                className={`btn btn-lg ${
                  editingId
                    ? "btn-warning"
                    : "btn-success"
                }`}
              >
                {editingId
                  ? "Update Claim"
                  : "Save Claim"}
              </button>

            </form>

          </div>

        </div>

        {/* Table */}

        <div className="card shadow-lg border-0">

          <div className="card-header bg-primary text-white">

            <h4 className="mb-0">
              📋 Claim History
            </h4>

          </div>

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-primary">

                  <tr>
                    <th>ID</th>
                    <th>Policy</th>
                    <th>Amount</th>
                    <th>Reason</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th width="180">
                      Actions
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {claims.length === 0 ? (

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center"
                      >
                        No Claims Found
                      </td>

                    </tr>

                  ) : (

                    claims.map((claim) => (

                      <tr key={claim.id}>

                        <td>{claim.id}</td>

                        <td>
                          {claim.policy?.policyNumber}
                        </td>

                        <td>
                          ₹{claim.claimAmount}
                        </td>

                        <td>
                          {claim.reason}
                        </td>

                        <td>
                          {claim.submissionDate.substring(0,10)}
                        </td>

                        <td>

                          <span
                            className={`badge ${
                              claim.status === "Approved"
                                ? "bg-success"
                                : claim.status === "Rejected"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {claim.status}
                          </span>

                        </td>

                        <td>

                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() =>
                              editClaim(claim)
                            }
                          >
                            ✏ Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              deleteClaim(claim.id)
                            }
                          >
                            🗑 Delete
                          </button>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Claim;