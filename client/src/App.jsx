import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Customer from "./pages/Customer";
import Policy from "./pages/Policy";
import Premium from "./pages/Premium";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/customers" element={<Customer />} />

        <Route path="/policy" element={<Policy />} />

        <Route path="/premium" element={<Premium />} />
      </Routes>
    
  );
}

export default App;