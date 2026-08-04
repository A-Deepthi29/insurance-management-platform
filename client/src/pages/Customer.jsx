import { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Customer() {

  const [customers, setCustomers] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    address: "",
    email: "",
  });

  // -----------------------
  // Fetch Customers
  // -----------------------

  const fetchCustomers = useCallback(async () => {
  try {
    const res = await api.get(
      `/customers?search=${search}&page=${page}`
    );

    setCustomers(res.data.customers);
    setTotalPages(res.data.totalPages);

  } catch (err) {
    console.log(err);
  }
}, [search, page]);

  useEffect(() => {
  fetchCustomers();
}, [fetchCustomers]);

    // -----------------------
  // Handle Change
  // -----------------------

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };
    // -----------------------
  // Save Customer
  // -----------------------

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (editingId) {

        await api.put(
          `/customers/${editingId}`,
          formData
        );

        alert("Customer Updated Successfully");

      } else {

        await api.post(
          "/customers",
          formData
        );

        alert("Customer Added Successfully");

      }

      setEditingId(null);

      setFormData({

        name: "",
        dob: "",
        phone: "",
        address: "",
        email: "",

      });

      fetchCustomers();

    } catch (err) {
  console.log(err);

  console.log(err.response?.data);

  alert(err.response?.data?.message || "Operation Failed");
}

  };
    // -----------------------
  // Edit Customer
  // -----------------------

  const editCustomer = (customer) => {

    setEditingId(customer.id);

    setFormData({
      name: customer.name,
      dob: customer.dob.substring(0, 10),
      phone: customer.phone,
      address: customer.address,
      email: customer.email,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  // -----------------------
  // Delete Customer
  // -----------------------

  const deleteCustomer = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/customers/${id}`);

      alert("Customer Deleted Successfully");

      fetchCustomers();

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
            👥 Customer Management
          </h1>

          <p className="text-muted">
            Add, update and manage customer information.
          </p>

        </div>

        {/* Form */}

        <div className="card shadow-lg border-0 mb-5">

          <div className="card-header bg-primary text-white">

            <h4 className="mb-0">
              {editingId
                ? "Update Customer"
                : "Add New Customer"}
            </h4>

          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Phone
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="col-12 mb-4">

                  <label className="form-label">
                    Address
                  </label>

                  <textarea
                    rows="3"
                    className="form-control"
                    name="address"
                    value={formData.address}
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
                  ? "Update Customer"
                  : "Save Customer"}
              </button>

            </form>

          </div>

        </div>

        {/* Search */}

        <div className="card shadow border-0 mb-4">

          <div className="card-body">

            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search by Name, Email or Phone"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

          </div>

        </div>
                {/* Customer Table */}

        <div className="card shadow-lg border-0">

          <div className="card-header bg-primary text-white">

            <h4 className="mb-0">
              👥 Customer List
            </h4>

          </div>

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-primary">

                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>DOB</th>
                    <th>Address</th>
                    <th width="170">Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {customers.length === 0 ? (

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center"
                      >
                        No Customers Found
                      </td>

                    </tr>

                  ) : (

                    customers.map((customer) => (

                      <tr key={customer.id}>

                        <td>{customer.id}</td>

                        <td>{customer.name}</td>

                        <td>{customer.email}</td>

                        <td>{customer.phone}</td>

                        <td>
                          {customer.dob.substring(0,10)}
                        </td>

                        <td>{customer.address}</td>

                        <td>

                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() =>
                              editCustomer(customer)
                            }
                          >
                            ✏ Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              deleteCustomer(customer.id)
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

export default Customer;