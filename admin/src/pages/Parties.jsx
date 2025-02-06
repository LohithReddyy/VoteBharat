import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import Swal from "sweetalert2";

function Parties() {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingParty, setAddingParty] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    manifesto: "",
    symbol: null,
  });
  const [editingParty, setEditingParty] = useState(null);

  useEffect(() => {
    fetchParties();
  }, []);

  const fetchParties = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/parties");
      setParties(response.data);
    } catch (error) {
      toast.error("Failed to fetch parties");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateParty = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("Session expired! Please log in again.");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("manifesto", formData.manifesto);
    if (formData.symbol) formDataObj.append("symbol", formData.symbol);

    try {
      if (editingParty) {
        await axios.put(`http://localhost:5000/parties/${editingParty._id}`, formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Party updated successfully");
      } else {
        await axios.post("http://localhost:5000/parties/add", formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Party added successfully");
      }

      fetchParties();
      setAddingParty(false);
      setEditingParty(null);
      setFormData({ name: "", manifesto: "", symbol: null });
    } catch (error) {
      console.error("Error adding/updating party:", error.response?.data || error.message);
      toast.error("Failed to add/update party");
    }
  };

  const handleDeleteParty = async (id) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("Session expired! Please log in again.");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/parties/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          toast.success("Party deleted successfully");
          fetchParties();
        } catch (error) {
          console.error("Error deleting party:", error.response?.data || error.message);
          toast.error("Failed to delete party");
        }
      }
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Political Parties</h1>
        <button
          onClick={() => {
            setAddingParty(true);
            setEditingParty(null);
            setFormData({ name: "", manifesto: "", symbol: null });
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          <PlusCircle className="h-4 w-4 mr-1" /> Add Party
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {parties.map((party) => (
          <div key={party._id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={`http://localhost:5000/${party.symbol}`}
              alt={`${party.name} symbol`}
              className="w-full h-40 object-contain"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">Party Name: {party.name}</h3>
              <p className="mt-1 text-sm text-gray-500">Manifesto: {party.manifesto}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => {
                    setEditingParty(party);
                    setAddingParty(true);
                    setFormData({ name: party.name, manifesto: party.manifesto, symbol: null });
                  }}
                  className="px-6 py-2 bg-blue-500 text-white rounded flex items-center justify-center gap-2"
                >
                  <Edit className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={() => handleDeleteParty(party._id)}
                  className="px-6 py-2 bg-red-500 text-white rounded flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {addingParty && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{editingParty ? "Edit Party" : "Add New Party"}</h2>
            <form onSubmit={handleAddOrUpdateParty} encType="multipart/form-data">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Party Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Manifesto</label>
                <textarea
                  name="manifesto"
                  value={formData.manifesto}
                  onChange={(e) => setFormData({ ...formData, manifesto: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Upload Symbol</label>
                <input
                  type="file"
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.files[0] })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setAddingParty(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                  {editingParty ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Parties;

