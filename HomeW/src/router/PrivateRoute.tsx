import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../AuthContext";

export const PrivateRoute = () => {
    const { user, loading } = useAuth();
    
    if (loading) {
        return <div>Cargando...</div>;
    }

    // Redirigir a pantalla de error en lugar del login directo
    return user ? <Outlet /> : <Navigate to="/error" state={{ type: "auth" }} replace />;
};
