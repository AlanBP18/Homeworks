import { useEffect, useState, useMemo } from "react";
import { collection, onSnapshot, orderBy, query, doc, updateDoc, increment } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { Trie } from "../utils/trie";
import { MaxHeap } from "../utils/maxHeap";

interface MusicaItem {
  id: string;
  link: string;
  nombre: string;
  generos: string[];
  quienLoSubio: string;
  cantReproducciones: number;
}

export default function Home() {
  const [canciones, setCanciones] = useState<MusicaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "musica"), orderBy("fechaDeAdicion", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const songsList: MusicaItem[] = [];
      snapshot.forEach((doc) => {
        songsList.push({ id: doc.id, ...doc.data() } as MusicaItem);
      });
      setCanciones(songsList);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const songTrie = useMemo(() => {
    const trie = new Trie();
    canciones.forEach((c) => trie.insertPhrase(c.nombre, c.id));
    return trie;
  }, [canciones]);

  const displayedCanciones = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const matchedIds = new Set(songTrie.searchPrefix(searchTerm.trim()));
    return canciones.filter((c) => matchedIds.has(c.id));
  }, [searchTerm, canciones, songTrie]);

  const top5Canciones = useMemo(() => {
    const heap = new MaxHeap<MusicaItem>(canciones);
    const top: MusicaItem[] = [];
    const count = Math.min(5, canciones.length);
    for (let i = 0; i < count; i++) {
      const maxSong = heap.extractMax();
      if (maxSong) {
        top.push(maxSong);
      }
    }
    return top;
  }, [canciones]);

  const todosGeneros = useMemo(() => {
    const set = new Set<string>();
    canciones.forEach((c) => {
      c.generos.forEach((g) => {
        if (g.trim()) {
          set.add(g.trim());
        }
      });
    });
    return Array.from(set);
  }, [canciones]);

  const filteredSongs = useMemo(() => {
    if (!selectedGenre) return canciones;
    return canciones.filter((c) =>
      c.generos.some((g) => g.toLowerCase().trim() === selectedGenre.toLowerCase().trim())
    );
  }, [canciones, selectedGenre]);

  const handleSongClick = async (cancion: MusicaItem) => {
    try {
      const songRef = doc(db, "musica", cancion.id);
      await updateDoc(songRef, {
        cantReproducciones: increment(1)
      });
      navigate(`/song/${cancion.id}`);
    } catch (error) {
      console.error("Error al actualizar reproducciones", error);
      navigate(`/song/${cancion.id}`);
    }
  };

  return (
    <div className="container py-4">
      <div className="position-relative mb-4 z-3" style={{ zIndex: 1050 }}>
        <div className="input-group input-group-lg shadow-sm rounded-pill overflow-hidden" style={{ backgroundColor: '#242424' }}>
          <span className="input-group-text border-0 text-white" style={{ backgroundColor: '#242424' }}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z"></path></svg>
          </span>
          <input 
            type="text" 
            className="form-control border-0 py-3 text-white" 
            style={{ backgroundColor: '#242424', outline: 'none', boxShadow: 'none' }}
            placeholder="¿Qué quieres escuchar?" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {searchTerm.trim() !== "" && (
          <div className="position-absolute w-100 shadow-lg rounded-3 mt-2 overflow-auto border-0" style={{ backgroundColor: '#282828', maxHeight: '350px', zIndex: 1050 }}>
            {displayedCanciones.length === 0 ? (
              <div className="p-4 text-center text-secondary-custom">No se encontraron resultados para "{searchTerm}"</div>
            ) : (
              <div className="list-group list-group-flush p-2">
                {displayedCanciones.map((cancion) => (
                  <button 
                    key={cancion.id} 
                    onClick={() => handleSongClick(cancion)}
                    className="list-group-item list-group-item-action border-0 rounded p-2 mb-1 hover-scale d-flex align-items-center"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <div className="bg-dark rounded p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--text-secondary)"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>
                    </div>
                    <div className="text-start flex-grow-1">
                      <strong className="d-block mb-1 text-white">{cancion.nombre}</strong>
                      <small className="text-secondary-custom">{cancion.quienLoSubio}</small>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="d-flex flex-wrap gap-2 mb-5 justify-content-start align-items-center">
        <button
          onClick={() => setSelectedGenre(null)}
          className={`btn btn-sm rounded-pill px-3 py-2 fw-bold text-uppercase border-0`}
          style={{ 
            backgroundColor: selectedGenre === null ? 'var(--primary-color)' : '#242424',
            color: selectedGenre === null ? '#000000' : 'var(--text-main)',
            fontSize: '0.8rem',
            letterSpacing: '0.5px'
          }}
        >
          Todos
        </button>
        {todosGeneros.map((genero) => (
          <button
            key={genero}
            onClick={() => setSelectedGenre(selectedGenre === genero ? null : genero)}
            className={`btn btn-sm rounded-pill px-3 py-2 fw-bold text-uppercase border-0`}
            style={{ 
              backgroundColor: selectedGenre === genero ? 'var(--primary-color)' : '#242424',
              color: selectedGenre === genero ? '#000000' : 'var(--text-main)',
              fontSize: '0.8rem',
              letterSpacing: '0.5px'
            }}
          >
            {genero}
          </button>
        ))}
      </div>

      <div className="row g-5">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-end mb-4 border-bottom border-secondary pb-2">
            <h2 className="fw-bold m-0 text-white">Canciones agregadas</h2>
          </div>
          
          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <div className="spinner-border text-primary-custom" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : (
            <div className="list-group border-0 bg-transparent">
              {filteredSongs.length === 0 ? (
                <div className="text-center py-5">
                  <h4 className="fw-bold text-white mb-3">No hay canciones</h4>
                  <p className="text-secondary-custom">No se encontraron canciones en este género.</p>
                </div>
              ) : (
                filteredSongs.map((cancion, idx) => (
                  <button 
                    key={cancion.id} 
                    onClick={() => handleSongClick(cancion)}
                    className="list-group-item list-group-item-action border-0 hover-scale mb-1 p-3 text-start d-flex align-items-center rounded"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <div className="me-3 text-secondary-custom fw-bold" style={{ width: '20px', textAlign: 'right' }}>
                      {idx + 1}
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="fw-bold text-white text-truncate mb-1">{cancion.nombre}</div>
                      <small className="text-secondary-custom d-block text-truncate">
                        {cancion.generos.join(", ")}
                      </small>
                    </div>
                    <div className="ms-3 text-end d-none d-md-block" style={{ width: '150px' }}>
                      <small className="text-secondary-custom text-truncate d-block">{cancion.quienLoSubio}</small>
                    </div>
                    <div className="ms-4 text-end">
                      <small className="text-secondary-custom">{cancion.cantReproducciones} rep.</small>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <div className="col-lg-4">
          <div className="spotify-card overflow-hidden sticky-top" style={{ top: '100px' }}>
            <div className="p-4 bg-dark">
              <h4 className="fw-bold mb-1 text-white">Top 5 Hits</h4>
              <p className="text-secondary-custom mb-0 small">Las más escuchadas de la plataforma</p>
            </div>
            <div className="list-group list-group-flush p-2">
              {top5Canciones.length === 0 ? (
                <div className="p-4 text-secondary-custom text-center">Sin datos</div>
              ) : (
                top5Canciones.map((cancion, index) => (
                  <button 
                    key={cancion.id} 
                    onClick={() => handleSongClick(cancion)}
                    className="list-group-item list-group-item-action d-flex align-items-center border-0 rounded hover-scale p-3"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <div className="me-3 d-flex align-items-center justify-content-center fw-bold" style={{ width: '24px', height: '24px', color: index === 0 ? 'var(--primary-color)' : 'var(--text-secondary)' }}>
                      {index + 1}
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <strong className={`d-block text-truncate ${index === 0 ? 'text-primary-custom' : 'text-white'}`}>{cancion.nombre}</strong>
                      <small className="text-secondary-custom">{cancion.quienLoSubio}</small>
                    </div>
                    <div className="ms-2">
                      <small className="text-secondary-custom fw-bold">{cancion.cantReproducciones}</small>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
