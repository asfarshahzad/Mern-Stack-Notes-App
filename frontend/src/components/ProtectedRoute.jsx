import { Navigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "../context/userContext";
import Loader from "../components/Loader"

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(userContext);

    // ✅ Agar abhi verify ho raha hai
    if (loading) return <Loader />

    // ✅ Agar user exist nahi karta
    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    // ✅ Agar user valid hai
    return children;
};

export default ProtectedRoute;