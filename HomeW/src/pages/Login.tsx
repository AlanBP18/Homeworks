import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <div className="card spotify-card p-5">
          <div className="card-body p-0">
            <div className="text-center mb-5">
              <img src="/log2.svg" alt="Icon" height="60" className="mb-4" style={{ filter: 'brightness(0) invert(1)' }} />
              <h2 className="fw-bold mb-2">{isRegistering ? "Regístrate para escuchar" : "Inicia sesión en Spotify kids"}</h2>
            </div>
            
            {error && <div className="alert alert-danger rounded text-sm bg-danger text-white border-0">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold small mb-2">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control bg-transparent text-white p-3 border-secondary"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-bold small mb-2">Contraseña</label>
                <input
                  type="password"
                  className="form-control bg-transparent text-white p-3 border-secondary"
                  placeholder="Contraseña"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary-custom w-100 py-3 mt-2">
                {isRegistering ? "Registrarse" : "Iniciar sesión"}
              </button>
            </form>
            
            <hr className="border-secondary my-5" />
            
            <div className="text-center">
              <span className="text-secondary-custom me-2">
                {isRegistering ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
              </span>
              <button
                className="btn btn-link text-white text-decoration-none fw-bold p-0"
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering ? "INICIA SESIÓN" : "REGÍSTRATE EN SPOTIFY KIDS"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
