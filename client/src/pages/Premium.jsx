import { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Premium() {

  const [policies, setPolicies] = useState([]);
  const [payments, setPayments] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

 const [totalPages] = useState(1);

  const [formData, setFormData] = useState({
    policyId: "",
    paymentDate: "",
    amount: "",
    paymentStatus: "Paid",
  });

  // ===========================
  // Fetch Policies
  // ===========================

  const fetchPolicies = useCallback(async () => {
  try {

    const res = await api.get("/policies");

    setPolicies(res.data);

  } catch (err) {
    console.log(err);
  }
}, []);

  // ===========================
  // Fetch Payments
  // ===========================

  const fetchPayments = useCallback(async () => {
  try {

    const res = await api.get(
      `/premiums?search=${search}&status=${status}`
    );

    setPayments(res.data);

  } catch (err) {
    console.log(err);
  }
}, [search, status]);


  useEffect(() => {
  fetchPolicies();
  fetchPayments();
}, [fetchPolicies, fetchPayments]);
    // ===========================
  // Handle Input Change
  // ===========================
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // ===========================
  // Save / Update Payment
  // ===========================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        await api.put(
          `/premiums/${editingId}`,
          formData
        );

        alert("Premium Payment Updated Successfully");

      } else {

        await api.post(
          "/premiums",
          formData
        );

        alert("Premium Payment Added Successfully");

      }

      setEditingId(null);

      setFormData({

        policyId: "",
        paymentDate: "",
        amount: "",
        paymentStatus: "Paid",

      });

      fetchPayments();

    } catch (err) {

      console.log(err);

      if (err.response?.data?.message) {

        alert(err.response.data.message);

      } else {

        alert("Operation Failed");

      }

    }

  };

  // ===========================
  // Edit Payment
  // ===========================
  const editPayment = (payment) => {

    setEditingId(payment.id);

    setFormData({

      policyId: payment.policyId,

      paymentDate: payment.paymentDate.substring(0, 10),

      amount: payment.amount,

      paymentStatus: payment.paymentStatus,

    });

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };

  // ===========================
  // Delete Payment
  // ===========================
  const deletePayment = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this payment?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/premiums/${id}`);

      alert("Premium Payment Deleted Successfully");

      fetchPayments();

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
            💳 Premium Tracking
          </h1>

          <p className="text-muted">
            Manage premium payments and payment history.
          </p>

        </div>

        {/* Premium Form */}

        <div className="card shadow-lg border-0 mb-5">

          <div className="card-header bg-primary text-white">

            <h4 className="mb-0">
              {editingId
                ? "Update Premium Payment"
                : "Add Premium Payment"}
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

                {/* Payment Date */}

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Payment Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="paymentDate"
                    value={formData.paymentDate}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* Amount */}

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Amount
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* Payment Status */}

                <div className="col-md-6 mb-4">

                  <label className="form-label">
                    Payment Status
                  </label>

                  <select
                    className="form-select"
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleChange}
                  >

                    <option value="Paid">
                      Paid
                    </option>

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Overdue">
                      Overdue
                    </option>

                  </select>

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
                  ? "Update Payment"
                  : "Save Payment"}
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
                  placeholder="🔍 Search by Policy Number or Status"
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

                  <option value="Paid">
                    Paid
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Overdue">
                    Overdue
                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>
                {/* Premium Payment Table */}

        <div className="card shadow-lg border-0">

          <div className="card-header bg-primary text-white">

            <h4 className="mb-0">
              💳 Premium Payment History
            </h4>

          </div>

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-primary">

                  <tr>

                    <th>ID</th>

                    <th>Policy</th>

                    <th>Payment Date</th>

                    <th>Amount</th>

                    <th>Status</th>

                    <th width="180">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {payments.length === 0 ? (

                    <tr>

                      <td
                        colSpan="6"
                        className="text-center"
                      >
                        No Premium Payments Found
                      </td>

                    </tr>

                  ) : (

                    payments.map((payment) => (

                      <tr key={payment.id}>

                        <td>{payment.id}</td>

                        <td>
                          {payment.policy?.policyNumber}
                        </td>

                        <td>
                          {new Date(
                            payment.paymentDate
                          ).toLocaleDateString()}
                        </td>

                        <td>
                          ₹{payment.amount}
                        </td>

                        <td>

                          <span
                            className={`badge ${
                              payment.paymentStatus === "Paid"
                                ? "bg-success"
                                : payment.paymentStatus === "Pending"
                                ? "bg-warning text-dark"
                                : "bg-danger"
                            }`}
                          >
                            {payment.paymentStatus}
                          </span>

                        </td>

                        <td>

                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() =>
                              editPayment(payment)
                            }
                          >
                            ✏ Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              deletePayment(payment.id)
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

export default Premium;