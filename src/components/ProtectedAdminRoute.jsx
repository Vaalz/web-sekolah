import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AdminLogin from '../components/admin/AdminLogin';

const ProtectedAdminRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const adminAuth = sessionStorage.getItem('adminAuth');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem('adminAuth', 'true');
    setIsAuthenticated(true);
  };

  if (isChecking) {
    return null; // or a loading spinner
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return children;
};

export default ProtectedAdminRoute;
