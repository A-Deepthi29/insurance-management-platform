import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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
    <div className="container mt-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">
          Customer Management
        </h2>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* Form Card */}
      <div className="card shadow-lg border-0 mb-5">

        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            {editingId ? "Update Customer" : "Add New Customer"}
          </h4>
        </div>

        <div className="card-body">

          <div className="row">

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Full Name
              </label>

              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
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
                value={form.dob}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">
                Phone Number
              </label>

              <input
                type="text"
                className="form-control"
                name="phone"
                value={form.phone}
                onChange={handleChange}
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
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 mb-3">
              <label className="form-label">
                Address
              </label>

              <textarea
                className="form-control"
                rows="3"
                name="address"
                value={form.address}
                onChange={handleChange}
              ></textarea>
            </div>

          </div>

          <button
            className={`btn ${
              editingId ? "btn-warning" : "btn-success"
            }`}
            onClick={saveCustomer}
          >
            {editingId ? "Update Customer" : "Save Customer"}
          </button>

        </div>

      </div>

      {/* Customer Table */}
      <div className="card shadow-lg border-0">

        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">
            Customer List
          </h4>
        </div>

        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-bordered table-hover align-middle">

              <thead className="table-primary">

                <tr>
                  <th>Name</th>
                  <th>DOB</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th width="180">Actions</th>
                </tr>

              </thead>

              <tbody>

                {customers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center text-muted"
                    >
                      No Customers Found
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr
                      key={customer.id || customer._id}
                    >
                      <td>{customer.name}</td>

                      <td>
                        {customer.dob?.substring(0, 10)}
                      </td>

                      <td>{customer.phone}</td>

                      <td>{customer.address}</td>

                      <td>{customer.email}</td>

                      <td>

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            editCustomer(customer)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            deleteCustomer(
                              customer.id || customer._id
                            )
                          }
                        >
                          Delete
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