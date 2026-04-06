import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../views/login";
import Register from "../views/register";
import Home from "../views/home";
import ErrorPage from "../views/error";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
    return (
        <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Ruta por defecto*/}
            <Route path="/*" element={<ErrorPage />} />

            {/* Rutas Privadas */}
            <Route element={<PrivateRoute />}>
                <Route path="/home" element={<Home />} />
            </Route>
        </Routes>
    );
}