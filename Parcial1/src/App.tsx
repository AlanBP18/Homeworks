
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Medicos } from './Pages/Medicos'
import { Admini } from './Pages/Admin'
import { Paciente } from './Pages/Paciente'

function App() {

  return (
    <div className="Contenedorprimario">
      <p className='txt'>Pagina del hospital</p>
      <Paciente />
      <Medicos />
      <Admini />
    </div>
  )
}

export default App
