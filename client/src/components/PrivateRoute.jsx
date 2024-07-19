import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  return isAuthenticated && user ? children : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
