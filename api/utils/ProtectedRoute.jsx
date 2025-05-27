import { Navigate } from "react-router-dom";
import { useSession } from "../../src/components/lib/utlis";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSession();

  if (loading) {
    return <div className="text-center mt-10">Checking session...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;