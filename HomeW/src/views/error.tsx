import { useLocation, useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Verificamos si fuimos redirigidos aquí con un estado desde PrivateRoute
    const isAuthError = location.state?.type === "auth";

    const title = isAuthError ? "Acceso Denegado" : "Página no encontrada";
    const message = isAuthError 
        ? "Necesitas iniciar sesión para poder ver esta página. Por favor, autentícate." 
        : "La URL a la que intentas acceder no existe en nuestra aplicación o tiene algún problema.";

    return (
        <div 
            className="d-flex align-items-center justify-content-center vh-100" 
            style={{
                backgroundImage: 'url("https://i.pinimg.com/originals/1c/c9/1d/1cc91df54bf32963cd43e122ca364bb9.gif")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="card shadow-lg p-5 text-center" style={{ maxWidth: "450px", backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
                <h1 className={`mb-3 fw-bold ${isAuthError ? "text-danger" : "text-warning"}`}>
                    {title}
                </h1>
                <p className="text-muted fs-5 mb-4">{message}</p>
                <div>
                    {isAuthError ? (
                        <button className="btn btn-danger px-4 py-2 fw-bold" onClick={() => navigate("/login")}>
                            Ir al Login
                        </button>
                    ) : (
                        <button className="btn btn-warning px-4 py-2 fw-bold" onClick={() => navigate("/home")}>
                            Ir al Inicio
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
