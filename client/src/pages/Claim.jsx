import { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Claim() {

  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [formData, setFormData] = useState({
    policyId: "",
    claimAmount: "",
    reason: "",
    submissionDate: "",
    status: "Pending",
  });

  // ==========================
  // Fetch Policies
  // ==========================

  const fetchPolicies = useCallback(async () => {
  try {

    const res = await api.get("/policies");

    setPolicies(res.data);

  } catch (err) {
    console.log(err);
  }
}, []);

  // ==========================
  // Fetch Claims
  // ==========================

  const fetchClaims = useCallback(async () => {
  try {

    const res = await api.get(
      `/claims?search=${search}&status=${status}&page=${page}`
    );

    setClaims(res.data.claims);
    setTotalPages(res.data.totalPages);

  } catch (err) {
    console.log(err);
  }
}, [search, status, page]);

  useEffect(() => {
  fetchPolicies();
  fetchClaims();
}, [fetchPolicies, fetchClaims]);
    // ==========================
  // Handle Input Change
  // ==========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // ==========================
  // Save / Update Claim
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        await api.put(
          `/claims/${editingId}`,
          formData
        );

        alert("Claim Updated Successfully");

      } else {

        await api.post(
          "/claims",
          formData
        );

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

      if (err.response?.data?.message) {

        alert(err.response.data.message);

      } else {

        alert("Operation Failed");

      }

    }

  };

  // ==========================
  // Edit Claim
  // ==========================

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

  // ==========================
  // Delete Claim
  // ==========================

  const deleteClaim = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this claim?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/claims/${id}`);

      alert("Claim Deleted Successfully");

      fetchClaims();

    } catch (err) {

      console.log(err);

      alert("Delete Failed");

    }

  };
    return (
    <>
      <Navbar />

      <div className="container py-5">

        {/* Heading */}

        <div className="text-center mb-5">

          <h1 className="fw-bold text-primary">
            📋 Claim Management
          </h1>

          <p className="text-muted">
            Submit, review and manage insurance claims.
          </p>

        </div>

        {/* Claim Form */}

        <div className="card shadow-lg border-0 mb-5">

          <div className="card-header bg-primary text-white">

            <h4 className="mb-0">
              {editingId
                ? "Update Claim"
                : "Submit New Claim"}
            </h4>

          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="row">

                {/* Policy */}

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

                {/* Claim Amount */}

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

                {/* Submission Date */}

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

                {/* Status */}

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

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Approved">
                      Approved
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>

                  </select>

                </div>

                {/* Reason */}

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

        {/* Search + Filter */}

        <div className="card shadow border-0 mb-4">

          <div className="card-body">

            <div className="row">

              <div className="col-md-8">

                <input
                  type="text"
                  className="form-control"
                  placeholder="🔍 Search by Reason or Status"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />

              </div>

              <div className="col-md-4">

                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(1);
                  }}
                >

                  <option value="">
                    All Status
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Approved">
                    Approved
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>
                {/* Claim History Table */}

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

                    <th>Submission Date</th>

                    <th>Status</th>

                    <th width="180">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {claims?.length === 0 ? (

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

                        <td>{claim.reason}</td>

                        <td>
                          {new Date(
                            claim.submissionDate
                          ).toLocaleDateString()}
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

            {/* Pagination */}

            <div className="d-flex justify-content-center align-items-center mt-4">

              <button
                className="btn btn-secondary me-3"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                ◀ Previous
              </button>

              <span className="fw-bold">
                Page {page} of {totalPages}
              </span>

              <button
                className="btn btn-primary ms-3"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next ▶
              </button>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}

export default Claim;