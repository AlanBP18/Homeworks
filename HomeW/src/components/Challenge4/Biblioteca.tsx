import { useState, useRef } from 'react'
import Listar from './Listar'
import Libro from './Libros'

function App() {
  const [titulo, setTitulo] = useState('')
  const [editorial, setEditorial] = useState('')
  const [autor, setAutor] = useState('')
  const [isbn, setIsbn] = useState('')
  
  const listarRef = useRef<any>(null)

  const Agregar = () => {

    const nuevoLibro = Libro.crear(Number(isbn), titulo, autor, editorial)
    
    if (listarRef.current) {
      listarRef.current.agregarLibro(nuevoLibro)
      setTitulo('')
      setEditorial('')
      setAutor('')
      setIsbn('')
    }
  }

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Gestión de Biblioteca</h1>
      
      <div className="form-container" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder='Título del libro' 
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input 
          type="text" 
          placeholder='Editorial' 
          value={editorial}
          onChange={(e) => setEditorial(e.target.value)}
        />
        <input 
          type="text" 
          placeholder='Autor' 
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />
        <input 
          type="number" 
          placeholder='ISBN' 
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <button onClick={Agregar} style={{ backgroundColor: '#dadadcff', color: 'black', fontWeight: 'bold' }}>
          Agregar a la Pila
        </button>
      </div>

      <Listar ref={listarRef} />
    </div>
  )
}

export default App