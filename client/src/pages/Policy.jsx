import { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Policy() {

  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages] = useState(1);

  const [formData, setFormData] = useState({
    customerId: "",
    policyType: "",
    policyNumber: "",
    premiumAmount: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });

  // =============================
  // Fetch Customers
  // =============================

  const fetchCustomers = useCallback(async () => {
  try {
    const res = await api.get("/customers");

    setCustomers(res.data.customers || res.data);

  } catch (err) {
    console.log(err);
  }
}, []);

  // =============================
  // Fetch Policies
  // =============================

  const fetchPolicies = useCallback(async () => {
  try {
    const res = await api.get(
      `/policies?search=${search}&status=${status}`
    );

    setPolicies(res.data);

  } catch (err) {
    console.log(err);
  }
}, [search, status]);

  useEffect(() => {
  fetchCustomers();
  fetchPolicies();
}, [fetchCustomers, fetchPolicies]);
    // =============================
  // Handle Input Change
  // =============================
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // =============================
  // Save / Update Policy
  // =============================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        await api.put(
          `/policies/${editingId}`,
          formData
        );

        alert("Policy Updated Successfully");

      } else {

        await api.post(
          "/policies",
          formData
        );

        alert("Policy Added Successfully");

      }

      setEditingId(null);

      setFormData({

        customerId: "",
        policyType: "",
        policyNumber: "",
        premiumAmount: "",
        startDate: "",
        endDate: "",
        status: "Active",

      });

      fetchPolicies();

    } catch (err) {

      console.log(err);

      if (err.response?.data?.message) {

        alert(err.response.data.message);

      } else {

        alert("Operation Failed");

      }

    }

  };

  // =============================
  // Edit Policy
  // =============================
  const editPolicy = (policy) => {

    setEditingId(policy.id);

    setFormData({

      customerId: policy.customerId,

      policyType: policy.policyType,

      policyNumber: policy.policyNumber,

      premiumAmount: policy.premiumAmount,

      startDate: policy.startDate.substring(0, 10),

      endDate: policy.endDate.substring(0, 10),

      status: policy.status,

    });

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };

  // =============================
  // Delete Policy
  // =============================
  const deletePolicy = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this policy?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/policies/${id}`);

      alert("Policy Deleted Successfully");

      fetchPolicies();

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
            📄 Policy Management
          </h1>

          <p className="text-muted">
            Create, update and manage insurance policies.
          </p>

        </div>

        {/* Policy Form */}

        <div className="card shadow-lg border-0 mb-5">

          <div className="card-header bg-primary text-white">

            <h4 className="mb-0">
              {editingId
                ? "Update Policy"
                : "Add New Policy"}
            </h4>

          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="row">

                {/* Customer */}

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Customer
                  </label>

                  <select
                    className="form-select"
                    name="customerId"
                    value={formData.customerId}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Customer
                    </option>

                    {customers.map((customer) => (

                      <option
                        key={customer.id}
                        value={customer.id}
                      >
                        {customer.name}
                      </option>

                    ))}

                  </select>

                </div>

                {/* Policy Type */}

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Policy Type
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="policyType"
                    value={formData.policyType}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* Policy Number */}

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Policy Number
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="policyNumber"
                    value={formData.policyNumber}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* Premium */}

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Premium Amount
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    name="premiumAmount"
                    value={formData.premiumAmount}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* Start Date */}

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Start Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* End Date */}

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    End Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* Status */}

                <div className="col-md-6 mb-4">

                  <label className="form-label">
                    Status
                  </label>

                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Expired">
                      Expired
                    </option>

                    <option value="Cancelled">
                      Cancelled
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
                  ? "Update Policy"
                  : "Save Policy"}
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
                  placeholder="🔍 Search by Policy Number or Type"
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

                  <option value="Active">
                    Active
                  </option>

                  <option value="Expired">
                    Expired
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>
                {/* Policy Table */}

        <div className="card shadow-lg border-0">

          <div className="card-header bg-primary text-white">

            <h4 className="mb-0">
              📄 Policy List
            </h4>

          </div>

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-primary">

                  <tr>

                    <th>ID</th>

                    <th>Customer</th>

                    <th>Policy Type</th>

                    <th>Policy Number</th>

                    <th>Premium</th>

                    <th>Status</th>

                    <th>Start Date</th>

                    <th>End Date</th>

                    <th width="180">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {policies.length === 0 ? (

                    <tr>

                      <td
                        colSpan="9"
                        className="text-center"
                      >
                        No Policies Found
                      </td>

                    </tr>

                  ) : (

                    policies.map((policy) => (

                      <tr key={policy.id}>

                        <td>{policy.id}</td>

                        <td>
                          {policy.customer?.name}
                        </td>

                        <td>{policy.policyType}</td>

                        <td>{policy.policyNumber}</td>

                        <td>
                          ₹{policy.premiumAmount}
                        </td>

                        <td>

                          <span
                            className={`badge ${
                              policy.status === "Active"
                                ? "bg-success"
                                : policy.status === "Expired"
                                ? "bg-warning text-dark"
                                : "bg-danger"
                            }`}
                          >
                            {policy.status}
                          </span>

                        </td>

                        <td>
                          {new Date(
                            policy.startDate
                          ).toLocaleDateString()}
                        </td>

                        <td>
                          {new Date(
                            policy.endDate
                          ).toLocaleDateString()}
                        </td>

                        <td>

                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() =>
                              editPolicy(policy)
                            }
                          >
                            ✏ Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              deletePolicy(policy.id)
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

            <div className="d-flex justify-content-center mt-4">

              <button
                className="btn btn-secondary me-2"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                >
                Previous
              </button>

              <span className="mt-2">
                 Page {page} of {totalPages}
              </span>

              <button
                className="btn btn-secondary ms-2"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                >
                Next
              </button>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}

export default Policy;