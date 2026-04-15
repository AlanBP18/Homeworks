import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, authError, isLoading } = useFirebaseAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/home");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4 text-primary">Iniciar Sesión</h2>
        {authError && <div className="alert alert-danger">{authError}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              className="form-control"
              placeholder="tu@correito.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-control"
              placeholder="********" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
            {isLoading ? "Iniciando..." : "Ingresar"}
          </button>
        </form>
        
        <div className="mt-3 text-center">
          <span className="text-muted">¿No tienes cuenta? </span>
          <Link to="/register" className="text-primary text-decoration-none fw-bold">Regístrate</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;