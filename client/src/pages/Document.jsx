import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
function Document() {
    const [customers, setCustomers] = useState([]);
const [documents, setDocuments] = useState([]);
const [selectedFile, setSelectedFile] = useState(null);

const [formData, setFormData] = useState({
  customerId: "",
});
const fetchCustomers = async () => {
  try {
    const res = await api.get("/customers");
    setCustomers(res.data);
  } catch (err) {
    console.log(err);
  }
};
const fetchDocuments = async () => {
  try {
    const res = await api.get("/documents");
    setDocuments(res.data);
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  const loadData = async () => {
    await fetchCustomers();
    await fetchDocuments();
  };

  loadData();
}, []);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);
};
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedFile) {
    alert("Please choose a file");
    return;
  }

  const uploadData = new FormData();

  uploadData.append("customerId", formData.customerId);
  uploadData.append("file", selectedFile);

  try {
    const res = await api.post(
      "/documents",
      uploadData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert(res.data.message);

    setFormData({
      customerId: "",
    });

    setSelectedFile(null);

    fetchDocuments();

  } catch (err) {
    console.log(err);

    alert("Upload Failed");
  }
};

const deleteDocument = async (id) => {

  if (!window.confirm("Delete this document?")) return;

  try {

    await api.delete(`/documents/${id}`);

    alert("Document Deleted Successfully");

    fetchDocuments();

  } catch (err) {

    console.log(err);

    alert("Delete Failed");

  }

};
return (
  <>
    <Navbar />

    <div className="container mt-5">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">

          <h3>📁 Document Upload</h3>

        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

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

            <div className="mb-3">

              <label className="form-label">
                Select File
              </label>

              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
                required
              />

            </div>

            <button
              className="btn btn-success"
              type="submit"
            >
              Upload Document
            </button>

          </form>

          <div className="card shadow-lg border-0 mt-5">

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
                No Documents Uploaded
              </td>

            </tr>

          ) : (

            documents.map((doc) => (

              <tr key={doc.id}>

                <td>{doc.id}</td>

                <td>{doc.customer?.name}</td>

                <td>{doc.fileName}</td>

                <td>
                  {doc.uploadDate.substring(0,10)}
                </td>

                <td>

                  <a
                    href={`http://localhost:5000/uploads/${doc.filePath}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    View
                  </a>

                </td>

                <td>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteDocument(doc.id)
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

      </div>

    </div>

  </>
);
}
export default Document;