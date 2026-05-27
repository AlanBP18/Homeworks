import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function NewSong() {
  const [nombre, setNombre] = useState("");
  const [link, setLink] = useState("");
  const [generos, setGeneros] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const nuevaCancion = {
        link,
        nombre,
        generos: generos.split(",").map((g) => g.trim()).filter((g) => g !== ""),
        quienLoSubio: currentUser?.email || "Usuario Desconocido",
        fechaDeAdicion: serverTimestamp(),
        cantReproducciones: 0
      };

      await addDoc(collection(db, "musica"), nuevaCancion);
      alert("¡Canción registrada exitosamente!");
      navigate("/");
    } catch (error) {
      console.error("Error al registrar la canción: ", error);
      alert("Error al registrar la canción");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <div className="card spotify-card p-4 p-md-5">
          <div className="card-body p-0">
            <h2 className="fw-bold text-center mb-2 text-white">Sube una nueva canción</h2>
            <p className="text-center text-secondary-custom mb-5">Agrega tus tracks favoritos a la biblioteca.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label fw-bold small text-white">Título de la Canción</label>
                <input
                  type="text"
                  className="form-control bg-transparent text-white p-3 border-secondary"
                  placeholder="Ej: Bohemian Rhapsody"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label fw-bold small text-white">Enlace (URL) de la música</label>
                <input
                  type="url"
                  className="form-control bg-transparent text-white p-3 border-secondary"
                  placeholder="Ej: https://ejemplo.com/cancion.mp3"
                  required
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
              
              <div className="mb-5">
                <label className="form-label fw-bold small text-white">Géneros (Separados por comas)</label>
                <input
                  type="text"
                  className="form-control bg-transparent text-white p-3 border-secondary"
                  placeholder="Ej: Pop, Rock, Electrónica"
                  required
                  value={generos}
                  onChange={(e) => setGeneros(e.target.value)}
                />
              </div>
              
              <button type="submit" className="btn btn-primary-custom w-100 py-3 rounded-pill fw-bold fs-6 shadow-sm" disabled={loading}>
                {loading ? (
                  <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Guardando...</>
                ) : (
                  "Guardar Canción"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
