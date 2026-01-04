import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
    const user = sessionStorage.getItem("user");

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default AdminProtectedRoute;