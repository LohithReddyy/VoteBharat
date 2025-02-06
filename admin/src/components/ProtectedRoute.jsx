import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const isAuthenticated = !!localStorage.getItem('adminToken');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;