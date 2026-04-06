import './App.css'
import { AuthProvider } from './AuthContext'
import { TaskProvider } from './TaskContext'
import { AppRouter } from './router/AppRouter'

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppRouter />
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
