import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

const Policy = () => {
  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    customerId: "",
    policyType: "",
    policyNumber: "",
    premiumAmount: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });

  // -----------------------------
  // Load Customers
  // -----------------------------
  const fetchCustomers = async () => {
    try {
      const res = await api.get("/customers");

      setCustomers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // -----------------------------
  // Load Policies
  // -----------------------------
  const fetchPolicies = async () => {
    try {
      const res = await api.get("/policies");

      setPolicies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  const loadData = async () => {
    await fetchCustomers();
    await fetchPolicies();
  };

  loadData();
}, []);

  // -----------------------------
  // Handle Input Change
  // -----------------------------
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // -----------------------------
  // Edit Policy
  // -----------------------------
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

  // -----------------------------
  // Delete Policy
  // -----------------------------
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

  // -----------------------------
  // Save / Update Policy
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        const res = await api.put(
  `/policies/${editingId}`,
  formData
);

        alert(res.data.message);
      } else {
        const res = await api.post("/policies", formData);

        alert(res.data.message);
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
      return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>
        {editingId ? "Update Policy" : "Policy Management"}
      </h2>

      <form onSubmit={handleSubmit} style={formStyle}>

        {/* Customer */}
        <select
          name="customerId"
          value={formData.customerId}
          onChange={handleChange}
          style={inputStyle}
          required
        >
          <option value="">Select Customer</option>

          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>

        {/* Policy Type */}
        <input
          type="text"
          name="policyType"
          placeholder="Policy Type"
          value={formData.policyType}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        {/* Policy Number */}
        <input
          type="text"
          name="policyNumber"
          placeholder="Policy Number"
          value={formData.policyNumber}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        {/* Premium */}
        <input
          type="number"
          name="premiumAmount"
          placeholder="Premium Amount"
          value={formData.premiumAmount}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        {/* Start Date */}
        <div>
          <label style={labelStyle}>Start Date</label>

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label style={labelStyle}>End Date</label>

          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        {/* Status */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button type="submit" style={buttonStyle}>
          {editingId ? "Update Policy" : "Save Policy"}
        </button>

      </form>

      <hr style={{ margin: "40px 0" }} />

      <h2 style={headingStyle}>Policy List</h2>

      <table style={tableStyle}>
  <thead>
    <tr>
      <th>ID</th>
      <th>Customer</th>
      <th>Policy Type</th>
      <th>Policy Number</th>
      <th>Premium</th>
      <th>Status</th>
      <th>Start Date</th>
      <th>End Date</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {policies.length === 0 ? (
      <tr>
        <td
          colSpan="9"
          style={{
            textAlign: "center",
            padding: "20px",
            color: "#666",
          }}
        >
          No Policies Found
        </td>
      </tr>
    ) : (
      policies.map((policy) => (
        <tr key={policy.id}>
          <td>{policy.id}</td>

          <td>
            {policy.customer
              ? policy.customer.name
              : "N/A"}
          </td>

          <td>{policy.policyType}</td>

          <td>{policy.policyNumber}</td>

          <td>₹{policy.premiumAmount}</td>

          <td>{policy.status}</td>

          <td>
            {new Date(policy.startDate).toLocaleDateString()}
          </td>

          <td>
            {new Date(policy.endDate).toLocaleDateString()}
          </td>

          <td>
            <button
              onClick={() => editPolicy(policy)}
              style={editButton}
            >
              Edit
            </button>

            <button
              onClick={() => deletePolicy(policy.id)}
              style={deleteButton}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>
<>
  <Navbar />

  <div className="container py-5">

    {/* Policy Page */}

  </div>
</>
    </div>
  );
};
  // ==============================
// Styles
// ==============================

const containerStyle = {
  width: "90%",
  maxWidth: "1100px",
  margin: "30px auto",
  fontFamily: "Arial, sans-serif",
};

const headingStyle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#333",
};

const formStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "15px",
  background: "#f8f9fa",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
  color: "#444",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "14px",
  boxSizing: "border-box",
};

const buttonStyle = {
  gridColumn: "span 2",
  padding: "12px",
  background: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const editButton = {
  backgroundColor: "#ffc107",
  color: "#000",
  border: "none",
  padding: "8px 12px",
  marginRight: "8px",
  borderRadius: "5px",
  cursor: "pointer",
};

const deleteButton = {
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};


// ==============================
// Export Component
// ==============================

export default Policy;
