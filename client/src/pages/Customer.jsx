import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Customer() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    dob: "",
    phone: "",
    address: "",
    email: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch Customers
  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load customers");
    }
  };

  useEffect(() => {
    const loadCustomers = async () => {
      await fetchCustomers();
    };

    loadCustomers();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Save or Update Customer
  const saveCustomer = async () => {
    try {
      if (
        !form.name ||
        !form.dob ||
        !form.phone ||
        !form.address ||
        !form.email
      ) {
        alert("Please fill all fields");
        return;
      }

      if (editingId) {
        await api.put(`/customers/${editingId}`, form);
        alert("Customer Updated Successfully");
      } else {
        await api.post("/customers", form);
        alert("Customer Added Successfully");
      }

      setForm({
        name: "",
        dob: "",
        phone: "",
        address: "",
        email: "",
      });

      setEditingId(null);

      await fetchCustomers();
    } catch (err) {
      console.log(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server Error");
      }
    }
  };

  // Edit Customer
  const editCustomer = (customer) => {
    setEditingId(customer.id || customer._id);

    setForm({
      name: customer.name,
      dob: customer.dob?.substring(0, 10),
      phone: customer.phone,
      address: customer.address,
      email: customer.email,
    });
  };

  // Delete Customer
  const deleteCustomer = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await api.delete(`/customers/${id}`);

      alert("Customer Deleted Successfully");

      await fetchCustomers();
    } catch (err) {
      console.log(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server Error");
      }
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
  <div
    className="container-fluid py-5"
    style={{
      background: "#f4f7fc",
      minHeight: "100vh",
    }}
  >
    {/* Header */}
    <div className="card shadow border-0 mb-4">
      <div
        className="card-body d-flex justify-content-between align-items-center"
        style={{
          background: "linear-gradient(90deg,#0d6efd,#4f9dff)",
          color: "white",
          borderRadius: "10px",
        }}
      >
        <>
  <Navbar />

  <div className="container-fluid py-5">

    {/* Your Customer Page */}

  </div>
</>

        <button
          className="btn btn-light text-danger fw-bold"
          onClick={logout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>
    </div>

    {/* Form */}
    <div className="card shadow-lg border-0 mb-5">

      <div className="card-header bg-white">
        <h4 className="fw-bold text-primary mb-0">
          <i className="bi bi-person-plus-fill me-2"></i>

          {editingId
            ? "Update Customer"
            : "Add New Customer"}
        </h4>
      </div>

      <div className="card-body">

        <div className="row">

          <div className="col-md-6 mb-3">

            <label className="form-label fw-semibold">
              Full Name
            </label>

            <input
              type="text"
              className="form-control form-control-lg"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

          </div>

          <div className="col-md-6 mb-3">

            <label className="form-label fw-semibold">
              Date of Birth
            </label>

            <input
              type="date"
              className="form-control form-control-lg"
              name="dob"
              value={form.dob}
              onChange={handleChange}
            />

          </div>

          <div className="col-md-6 mb-3">

            <label className="form-label fw-semibold">
              Phone Number
            </label>

            <input
              type="text"
              className="form-control form-control-lg"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

          </div>

          <div className="col-md-6 mb-3">

            <label className="form-label fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              className="form-control form-control-lg"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

          </div>

          <div className="col-12 mb-4">

            <label className="form-label fw-semibold">
              Address
            </label>

            <textarea
              rows="3"
              className="form-control"
              name="address"
              value={form.address}
              onChange={handleChange}
            />

          </div>

        </div>

        <button
          className={`btn btn-lg ${
            editingId
              ? "btn-warning"
              : "btn-success"
          }`}
          onClick={saveCustomer}
        >
          <i className="bi bi-check-circle-fill me-2"></i>

          {editingId
            ? "Update Customer"
            : "Save Customer"}
        </button>

      </div>

    </div>

    {/* Table */}

    <div className="card shadow-lg border-0">

      <div className="card-header bg-primary text-white">

        <h4 className="mb-0">
          <i className="bi bi-table me-2"></i>
          Customer List
        </h4>

      </div>

      <div className="card-body">

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead className="table-primary">

              <tr>
                <th>#</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th width="180">Actions</th>
              </tr>

            </thead>

            <tbody>

              {customers.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center py-5"
                  >
                    <h5 className="text-muted">
                      No Customers Found
                    </h5>
                  </td>

                </tr>

              ) : (

                customers.map((customer, index) => (

                  <tr key={customer.id}>

                    <td>{index + 1}</td>

                    <td className="fw-semibold">
                      {customer.name}
                    </td>

                    <td>
                      {customer.dob?.substring(0,10)}
                    </td>

                    <td>{customer.phone}</td>

                    <td>{customer.email}</td>

                    <td>{customer.address}</td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() =>
                          editCustomer(customer)
                        }
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          deleteCustomer(customer.id)
                        }
                      >
                        <i className="bi bi-trash-fill"></i>
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
);
}

export default Customer;