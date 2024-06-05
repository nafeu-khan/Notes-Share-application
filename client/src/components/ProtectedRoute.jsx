import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isAuthChecked } = useContext(AuthContext);

    if (!isAuthChecked) {
        return <div>Loading...</div>;  // Optionally, a spinner or loading component
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
