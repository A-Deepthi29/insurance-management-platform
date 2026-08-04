import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Customer from "./pages/Customer";
import Policy from "./pages/Policy";
import Premium from "./pages/Premium";
import Dashboard from "./pages/Dashboard";
import Claim from "./pages/Claim";
import Document from "./pages/Document";
import Report from "./pages/Report";

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

        <Route path="/claim" element={<Claim />} />

        <Route path="/document" element={<Document />} />

        <Route path="/report" element={<Report />} />
      </Routes>
    
  );
}

export default App;