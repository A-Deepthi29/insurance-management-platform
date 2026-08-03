const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const policyRoutes = require("./routes/policyRoutes");
const premiumRoutes = require("./routes/premiumRoutes");
const claimRoutes = require("./routes/claimRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/premiums", premiumRoutes);
app.use("/api/claims", claimRoutes);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});