import { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      }
    );

    alert(res.data.message);
  } catch (err) {
  console.log(err.response?.data);
  console.log(err.response?.status);

  alert(err.response?.data?.message || "Server Error");
}
};
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f6fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "#fff",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <FaShieldAlt size={55} color="#2563eb" />

          <h1
  style={{
    fontSize: "34px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "10px",
    lineHeight: "1.3",
    textAlign: "center",
  }}
>
  Insurance Management
</h1>

<h2
  style={{
    fontSize: "34px",
    fontWeight: "700",
    color: "#1e293b",
    marginTop: "0",
    marginBottom: "15px",
    textAlign: "center",
  }}
>
  Platform
</h2>

          <p
            style={{
              color: "#64748b",
              marginBottom: "30px",
            }}
          >
            Create your account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <label>Email Address</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />

          <label>Select Role</label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={inputStyle}
          >
            <option>Customer</option>
            <option>Insurance Agent</option>
            <option>Administrator</option>
          </select>

          <button style={buttonStyle}>
            Create Account
          </button>
        </form>

       <div
  style={{
    textAlign: "center",
    marginTop: "20px",
    color: "#64748b",
  }}
>
  Already have an account?{" "}
  <Link
    to="/login"
    style={{
      color: "#2563eb",
      fontWeight: "bold",
      textDecoration: "none",
    }}
  >
    Login
  </Link>
</div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "18px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Register;