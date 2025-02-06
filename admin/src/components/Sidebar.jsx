import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Flag, X, BarChart3 } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { name: 'Parties', to: '/parties', icon: Flag },
  { name: 'Users', to: '/users', icon: Users },
  { name: 'Votes', to: '/votes', icon: BarChart3 }, // Added Votes Section
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Top Admin Panel */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
          <span className="text-xl font-semibold"> Admin Panel</span>
          {/* X button appears only on small screens */}
          <button
            onClick={onClose}
            className="p-2 text-white rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-full">
          {/* Sidebar Content */}
          <nav className="flex flex-col w-full px-3 py-4 overflow-y-auto bg-gray-50">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center p-2 text-gray-900 rounded-lg hover:bg-indigo-100 ${isActive ? 'bg-indigo-200' : ''}`
                    }
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="ml-3">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Black vertical line to the right of the sidebar */}
        <div className="w-[2px] bg-black h-full absolute right-0 top-0 z-50"></div>
      </div>
    </>
  );
}

export default Sidebar;
