import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Grafo } from "../models/grafo";

interface MusicaItem {
  id: string;
  link: string;
  nombre: string;
  generos: string[];
  quienLoSubio: string;
  cantReproducciones: number;
}

export default function SongDetails() {
  const { id } = useParams<{ id: string }>();
  const [cancion, setCancion] = useState<MusicaItem | null>(null);
  const [cancionesRelacionadas, setCancionesRelacionadas] = useState<MusicaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongAndRelated = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const docRef = doc(db, "musica", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setCancion(null);
          setLoading(false);
          return;
        }

        const currentSong = { id: docSnap.id, ...docSnap.data() } as MusicaItem;
        setCancion(currentSong);

        const querySnapshot = await getDocs(collection(db, "musica"));
        const allSongs: MusicaItem[] = [];
        querySnapshot.forEach((doc) => {
          allSongs.push({ id: doc.id, ...doc.data() } as MusicaItem);
        });

        const grafo = new Grafo();
        grafo.construirGrafoDeGeneros(allSongs);

        const vecinosIds = grafo.obtenerVecinos(id);

        const related = allSongs.filter(song => vecinosIds.includes(song.id));
        setCancionesRelacionadas(related);
      } catch (error) {
        console.error("Error al cargar detalles e información de grafo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongAndRelated();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 d-flex justify-content-center">
        <div className="spinner-border text-primary-custom" role="status"></div>
      </div>
    );
  }

  if (!cancion) {
    return (
      <div className="container py-5 text-center">
        <div className="spotify-card p-5 d-inline-block">
          <h2 className="mb-4 text-white">Canción no encontrada</h2>
          <button className="btn btn-primary-custom px-4 py-2" onClick={() => navigate("/")}>Volver al inicio</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-0">
      <div 
        className="w-100 pt-5 pb-4 px-4 d-flex flex-column justify-content-end" 
        style={{ 
          background: 'linear-gradient(transparent 0%, rgba(0,0,0,0.8) 100%), var(--card-hover)', 
          minHeight: '40vh',
          borderBottom: '1px solid #282828'
        }}
      >
        <div className="container d-flex flex-column flex-md-row align-items-md-end">
          <div className="bg-dark shadow-lg me-md-4 mb-4 mb-md-0 d-flex align-items-center justify-content-center" style={{ width: '200px', height: '200px', borderRadius: '4px' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="var(--text-secondary)"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>
          </div>
          <div>
            <span className="text-white fw-bold mb-2 d-block small text-uppercase" style={{ letterSpacing: '1px' }}>Sencillo</span>
            <h1 className="fw-black text-white display-2 mb-3" style={{ fontWeight: 900 }}>{cancion.nombre}</h1>
            <div className="d-flex align-items-center text-white fw-bold small">
              <span className="me-1">Usuario: {cancion.quienLoSubio}</span>
              <span className="mx-2">•</span>
              <span>{cancion.cantReproducciones.toLocaleString()} reproducciones</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4" style={{ background: 'linear-gradient(rgba(0,0,0,0.2) 0%, var(--bg-color) 100%)' }}>
        <div className="d-flex align-items-center mb-5 mt-2">
          <a href={cancion.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary-custom d-flex align-items-center justify-content-center rounded-circle p-0 me-4 shadow" style={{ width: '56px', height: '56px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#000"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
          </a>
          <button className="btn btn-outline-secondary rounded-pill fw-bold border-secondary text-white hover-scale" onClick={() => navigate("/")}>
            Volver a la Lista
          </button>
        </div>

        <div className="row g-4">
          <div className="col-12">
            <h4 className="fw-bold text-white mb-3">Géneros</h4>
            <div className="d-flex flex-wrap gap-2">
              {cancion.generos.map((g, idx) => (
                <span key={idx} className="badge bg-dark fs-6 px-3 py-2 rounded-pill shadow-sm border border-secondary text-white">
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="row g-4 mt-5">
          <div className="col-12">
            <h4 className="fw-bold text-white mb-4">Canciones similares que te pueden gustar</h4>
            {cancionesRelacionadas.length === 0 ? (
              <p className="text-secondary-custom">No hay canciones recomendadas con géneros similares en este momento.</p>
            ) : (
              <div className="list-group border-0 bg-transparent">
                {cancionesRelacionadas.map((rel, idx) => (
                  <button
                    key={rel.id}
                    onClick={() => navigate(`/song/${rel.id}`)}
                    className="list-group-item list-group-item-action border-0 hover-scale mb-1 p-3 text-start d-flex align-items-center rounded"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <div className="me-3 text-secondary-custom fw-bold" style={{ width: '20px', textAlign: 'right' }}>
                      {idx + 1}
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="fw-bold text-white text-truncate mb-1">{rel.nombre}</div>
                      <small className="text-secondary-custom d-block text-truncate">
                        {rel.generos.join(", ")}
                      </small>
                    </div>
                    <div className="ms-3 text-end d-none d-md-block" style={{ width: '150px' }}>
                      <small className="text-secondary-custom text-truncate d-block">{rel.quienLoSubio}</small>
                    </div>
                    <div className="ms-4 text-end">
                      <small className="text-secondary-custom">{rel.cantReproducciones} rep.</small>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
