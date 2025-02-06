import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Pencil, Trash2 } from 'lucide-react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/a/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        setUsers(users.filter(user => user._id !== id));
        toast.success('User deleted successfully');
      } catch (error) {
        console.error("Error fetching users:", error.response ? error.response.data : error.message);
        toast.error('Failed to delete user');
      }
    }
  };

  const handleUpdate = (user) => {
    // Implement update logic (e.g., opening a modal with user data)
    toast.info(`Update user: ${user.name}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">Name: {user.name}</h3>
              <p className="mt-1 text-sm text-gray-500">Aadhar Number: {user.aadharNumber}</p>
              <p className="mt-1 text-sm text-gray-500">Age: {user.age}</p>
              <p className="mt-1 text-sm text-gray-500">Gender: {user.gender}</p>
              <p className="mt-1 text-sm text-gray-500">Has Voted: {user.hasVoted ? 'Yes' : 'No'}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleUpdate(user)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Update
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
