import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  return user ? children : <Navigate to="/sign-in" />;
}

export default PrivateRoute;
