import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, User, LogOut } from 'lucide-react';
import { toast } from 'react-toastify';

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-gray-100 border-b-2 border-black">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">
              Admin Dashboard
            </span>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200"
            >
              <User className="w-6 h-6" />
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
