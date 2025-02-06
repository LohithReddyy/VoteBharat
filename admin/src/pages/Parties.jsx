import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";

function Parties() {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingParty, setEditingParty] = useState(null);
  const [formData, setFormData] = useState({
    partyId: "",
    name: "",
    manifesto: "",
    symbol: null,
  });

  useEffect(() => {
    fetchParties();
  }, []);

  const fetchParties = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/parties", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setParties(response.data);
    } catch (error) {
      toast.error("Failed to fetch parties");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this party?")) {
      try {
        await axios.delete(`http://localhost:5000/parties/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setParties(parties.filter((party) => party._id !== id));
        toast.success("Party deleted successfully");
      } catch (error) {
        toast.error("Failed to delete party");
      }
    }
  };

  const handleUpdate = (party) => {
    setEditingParty(party);
    setFormData({
      partyId: party.partyId,
      name: party.name,
      manifesto: party.manifesto,
      symbol: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, symbol: e.target.files[0] }));
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("manifesto", formData.manifesto);
    if (formData.symbol) {
      formDataObj.append("symbol", formData.symbol);
    }

    try {
      await axios.put(
        `http://localhost:5000/parties/${editingParty.partyId}`, // Using `partyId`
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Party updated successfully");
      fetchParties();
      setEditingParty(null);
    } catch (error) {
      toast.error("Failed to update party");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Political Parties</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {parties.map((party) => (
          <div
            key={party.partyId}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <img
              src={`http://localhost:5000/${party.symbol}`}
              alt={`${party.name} symbol`}
              className="w-full h-40 object-contain"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">Party Name: {party.name}</h3>
              <p className="mt-1 text-sm text-gray-500">Manifesto: {party.manifesto}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleUpdate(party)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Update
                </button>
                <button
                  onClick={() => handleDelete(party._id)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingParty && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Party</h2>
            <form onSubmit={handleSubmitUpdate} encType="multipart/form-data">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Party Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Manifesto
                </label>
                <textarea
                  name="manifesto"
                  value={formData.manifesto}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Upload New Symbol
                </label>
                <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingParty(null)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  Save
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
