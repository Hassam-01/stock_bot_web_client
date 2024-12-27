// ProtectedRoute.jsx (React Router v6+)
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const token = useSelector((state) => state.auth.token);
const token  = true;
  return token ? <Component {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
