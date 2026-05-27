import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  if (!currentUser) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="/log.svg" alt="Spotify kids" height="35" className="d-inline-block align-text-top" style={{ filter: 'brightness(0) invert(1)' }} />
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto ps-3 fw-bold">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'text-white' : 'text-secondary-custom'}`} to="/">
                Canciones
              </Link>
            </li>
            <li className="nav-item ms-lg-3">
              <Link className={`nav-link ${location.pathname === '/new-song' ? 'text-white' : 'text-secondary-custom'}`} to="/new-song">
                Crear Canción
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center mt-3 mt-lg-0">
            <div className="d-none d-lg-block me-4 text-end">
              <small className="text-secondary-custom fw-semibold d-block">{currentUser.email}</small>
            </div>
            <button className="btn btn-outline-light rounded-pill px-4 fw-bold" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
