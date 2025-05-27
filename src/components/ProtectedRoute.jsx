import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // 인증 context에서 user 가져오기

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
