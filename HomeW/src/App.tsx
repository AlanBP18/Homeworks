import { useState } from 'react'
import './App.css'
import { Navbar } from './Navbar'
import { CatsRoutes } from './CatsRoutes'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="content">
        <CatsRoutes />
      </main>
    </div>
  )
}

export default App
