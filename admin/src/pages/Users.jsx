import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Loader, Trash2, Edit, PlusCircle} from "lucide-react";

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

  const handleAddUser = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add New User",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Name">
        <input id="swal-aadhar" class="swal2-input" placeholder="Aadhar Number">
        <input id="swal-age" class="swal2-input" type="number" placeholder="Age">
        <select id="swal-gender" class="swal2-input">
          <option value="" disabled selected>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input id="swal-password" class="swal2-input" type="password" placeholder="Password">
      `,
      showCancelButton: true,
      confirmButtonText: "Add User",
      preConfirm: () => {
        return {
          name: document.getElementById("swal-name").value,
          aadharNumber: document.getElementById("swal-aadhar").value,
          age: document.getElementById("swal-age").value,
          gender: document.getElementById("swal-gender").value,
          password: document.getElementById("swal-password").value,
        };
      },
    });

    if (formValues) {
      try {
        await axios.post("http://localhost:5000/admin/adduser", formValues, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        toast.success("User added successfully!");
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to add user");
      }
    }
  };

  const handleUpdateUser = async (id, user) => {
    const { value: formValues } = await Swal.fire({
      title: "Update User",
      html: `
        <input id="swal-name" class="swal2-input" placeholder="Name" value="${user.name}">
        <input id="swal-aadhar" class="swal2-input" placeholder="Aadhar Number" value="${user.aadharNumber}">
        <input id="swal-age" class="swal2-input" type="number" placeholder="Age" value="${user.age}">
        <select id="swal-gender" class="swal2-input">
          <option value="Male" ${user.gender === "Male" ? "selected" : ""}>Male</option>
          <option value="Female" ${user.gender === "Female" ? "selected" : ""}>Female</option>
          <option value="Other" ${user.gender === "Other" ? "selected" : ""}>Other</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Update User",
      preConfirm: () => {
        return {
          name: document.getElementById("swal-name").value,
          aadharNumber: document.getElementById("swal-aadhar").value,
          age: document.getElementById("swal-age").value,
          gender: document.getElementById("swal-gender").value,
        };
      },
    });

    if (formValues) {
      try {
        await axios.put(`http://localhost:5000/admin/updateuser/${id}`, formValues, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        toast.success("User updated successfully!");
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to update user");
      }
    }
  };

  const handleDeleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/admin/deleteuser/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        toast.success("User deleted successfully!");
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to delete user");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <button
          onClick={handleAddUser}
         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          <PlusCircle className="h-4 w-4 mr-1" /> Add User
        </button>
      </div>

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

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleUpdateUser(user._id, user)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center hover:bg-yellow-600"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Update
                </button>

                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded flex items-center hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
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
