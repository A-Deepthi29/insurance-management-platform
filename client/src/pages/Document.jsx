import { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Document() {

  const [customers, setCustomers] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [formData, setFormData] = useState({
    customerId: "",
  });

  // ==========================
  // Fetch Customers
  // ==========================

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

  // ==========================
  // Fetch Documents
  // ==========================

  const fetchDocuments = useCallback(async () => {
  try {

    const res = await api.get("/documents");

    setDocuments(res.data);

  } catch (err) {
    console.log(err);
  }
}, []);

    
  useEffect(() => {
  fetchCustomers();
  fetchDocuments();
}, [fetchCustomers, fetchDocuments]);
    // ==========================
  // Handle Input Change
  // ==========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // ==========================
  // Handle File Selection
  // ==========================

  const handleFileChange = (e) => {

    setSelectedFile(e.target.files[0]);

  };

  // ==========================
  // Upload Document
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!selectedFile) {

      alert("Please select a file");

      return;

    }

    const uploadData = new FormData();

    uploadData.append(
      "customerId",
      formData.customerId
    );

    uploadData.append(
      "file",
      selectedFile
    );

    try {

      await api.post(
        "/documents",
        uploadData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert("Document Uploaded Successfully");

      setFormData({
        customerId: "",
      });

      setSelectedFile(null);

      // Clear file input
      document.getElementById("documentFile").value = "";

      fetchDocuments();

    } catch (err) {

      console.log(err);

      if (err.response?.data?.message) {

        alert(err.response.data.message);

      } else {

        alert("Upload Failed");

      }

    }

  };

  // ==========================
  // Delete Document
  // ==========================

  const deleteDocument = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/documents/${id}`
      );

      alert(
        "Document Deleted Successfully"
      );

      fetchDocuments();

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
            📁 Document Management
          </h1>

          <p className="text-muted">
            Upload and manage customer documents securely.
          </p>

        </div>

        {/* Upload Form */}

        <div className="card shadow-lg border-0 mb-5">

          <div className="card-header bg-primary text-white">

            <h4 className="mb-0">
              Upload Document
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

                {/* File Upload */}

                <div className="col-md-6 mb-3">

                  <label className="form-label">
                    Select File
                  </label>

                  <input
                    id="documentFile"
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                    required
                  />

                </div>

              </div>

              <button
                type="submit"
                className="btn btn-success btn-lg"
              >
                📤 Upload Document
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
              placeholder="🔍 Search by Customer Name or File Name"
              value={search}
              onChange={(e) => {

                setSearch(e.target.value);

                setPage(1);

              }}
            />

          </div>

        </div>
                {/* Uploaded Documents */}

        <div className="card shadow-lg border-0">

          <div className="card-header bg-primary text-white">

            <h4 className="mb-0">
              📂 Uploaded Documents
            </h4>

          </div>

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-primary">

                  <tr>

                    <th>ID</th>

                    <th>Customer</th>

                    <th>Document</th>

                    <th>Upload Date</th>

                    <th>View</th>

                    <th>Delete</th>

                  </tr>

                </thead>

                <tbody>

                  {documents.length === 0 ? (

                    <tr>

                      <td
                        colSpan="6"
                        className="text-center"
                      >
                        No Documents Found
                      </td>

                    </tr>

                  ) : (

                    documents.map((doc) => (

                      <tr key={doc.id}>

                        <td>{doc.id}</td>

                        <td>
                          {doc.customer?.name}
                        </td>

                        <td>
                          {doc.fileName}
                        </td>

                        <td>
                          {doc.uploadDate
                            ? new Date(
                                doc.uploadDate
                              ).toLocaleDateString()
                            : "-"}
                        </td>

                        <td>

                          <a
                            href={`http://localhost:5000/uploads/${doc.filePath}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary btn-sm"
                          >
                            👁 View
                          </a>

                        </td>

                        <td>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              deleteDocument(doc.id)
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

export default Document;