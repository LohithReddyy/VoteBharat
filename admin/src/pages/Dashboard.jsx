import { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Flag } from 'lucide-react';

function Dashboard() {
  const [stats, setStats] = useState({ userCount: 0, partyCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/dashboard', {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        });
        setStats(response.data);
      } catch (error) {
        setError('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>

      {loading ? (
        <p className="text-gray-600 mt-4">Loading dashboard data...</p>
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total Parties */}
          <div className="bg-white overflow-hidden shadow rounded-lg p-5 flex items-center">
            <Flag className="h-10 w-10 text-blue-500" />
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Parties</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.partyCount}</p>
            </div>
          </div>

          {/* Total Users */}
          <div className="bg-white overflow-hidden shadow rounded-lg p-5 flex items-center">
            <Users className="h-10 w-10 text-green-500" />
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.userCount}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
