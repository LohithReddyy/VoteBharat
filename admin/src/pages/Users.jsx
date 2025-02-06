import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader, Trash2 } from "lucide-react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`http://localhost:5000/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900">Users</h1>

      {loading ? (
        <div className="mt-6 flex justify-center">
          <Loader className="animate-spin h-8 w-8 text-gray-600" />
        </div>
      ) : users.length === 0 ? (
        <p className="mt-4 text-gray-600">No users found.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div key={user._id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
              <p className="mt-1 text-sm text-gray-500">Aadhar Number: {user.aadharNumber}</p>
              <p className="mt-1 text-sm text-gray-500">Age: {user.age}</p>
              <p className="mt-1 text-sm text-gray-500">Gender: {user.gender}</p>
              <p className="mt-1 text-sm text-gray-500">Has Voted: {user.hasVoted ? "Yes" : "No"}</p>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-600 hover:text-red-800 flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
