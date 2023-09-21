import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.token.authenticated);
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} />;
}
