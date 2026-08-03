import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

const Premium = () => {
  const [policies, setPolicies] = useState([]);
  const [payments, setPayments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    policyId: "",
    paymentDate: "",
    amount: "",
    paymentStatus: "Paid",
  });

  const fetchPolicies = async () => {
    try {
      const res = await api.get("/policies");
      setPolicies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPayments = async () => {
  try {
    const res = await api.get("/premiums");
    setPayments(res.data);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
  const loadData = async () => {
    await fetchPolicies();
    await fetchPayments();
  };

  loadData();
}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    if (editingId) {

      await api.put(`/premiums/${editingId}`, formData);

      alert("Payment Updated Successfully");

    } else {

      await api.post("/premiums", formData);

      alert("Payment Added Successfully");

    }

    setEditingId(null);

    setFormData({
      policyId: "",
      paymentDate: "",
      amount: "",
      paymentStatus: "Paid",
    });

    await fetchPayments();

  } catch (err) {
    console.log(err);

    if (err.response?.data?.message) {
      alert(err.response.data.message);
    } else {
      alert("Operation Failed");
    }
  }
};

  const deletePayment = async (id) => {
  if (!window.confirm("Delete this payment?")) return;

  try {
    await api.delete(`/premiums/${id}`);

    alert("Payment Deleted Successfully");

    fetchPayments();

  } catch (err) {
    console.log(err);
    alert("Delete Failed");
  }
};

const editPayment = (payment) => {

  setEditingId(payment.id);

  setFormData({
    policyId: payment.policyId,
    paymentDate: payment.paymentDate.substring(0,10),
    amount: payment.amount,
    paymentStatus: payment.paymentStatus,
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Premium Tracking</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        <select
  name="policyId"
  value={formData.policyId}
  onChange={handleChange}
  style={inputStyle}
  required
>
  <option value="">Select Policy</option>

  {policies.map((policy) => (
    <option
      key={policy.id}
      value={policy.id}
    >
      {policy.policyNumber}
    </option>
  ))}
</select>
<input
  type="date"
  name="paymentDate"
  value={formData.paymentDate}
  onChange={handleChange}
  style={inputStyle}
  required
/>
<input
  type="number"
  name="amount"
  placeholder="Amount"
  value={formData.amount}
  onChange={handleChange}
  style={inputStyle}
  required
/>
<select
  name="paymentStatus"
  value={formData.paymentStatus}
  onChange={handleChange}
  style={inputStyle}
>
  <option value="Paid">Paid</option>
  <option value="Pending">Pending</option>
  <option value="Overdue">Overdue</option>
</select>
<button
  type="submit"
  style={buttonStyle}
>
  Save Payment
</button>
      </form>
      <hr className="my-5" />

<div className="card shadow border-0">

  <div className="card-header bg-primary text-white">

    <h4 className="mb-0">
      Premium Payment History
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
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {payments.length === 0 ? (

            <tr>

              <td colSpan="6" className="text-center">

                No Payments Found

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
                  {new Date(payment.paymentDate).toLocaleDateString()}
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
                    onClick={() => editPayment(payment)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deletePayment(payment.id)}
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
<>
  <Navbar />

  <div className="container py-5">

    {/* Premium Page */}

  </div>
</>
    </div>
  );
};
const containerStyle = {
  width: "90%",
  maxWidth: "900px",
  margin: "30px auto",
  fontFamily: "Arial",
};

const headingStyle = {
  textAlign: "center",
  marginBottom: "20px",
};

const formStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2,1fr)",
  gap: "15px",
  background: "#f5f5f5",
  padding: "20px",
  borderRadius: "8px",
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  fontSize: "15px",
};

const buttonStyle = {
  gridColumn: "span 2",
  padding: "12px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Premium;
      