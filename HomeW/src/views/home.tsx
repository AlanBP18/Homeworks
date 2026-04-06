import React, { useState } from "react";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { useAuth } from "../AuthContext";

// Importando los proyectos
import App4 from "../mod/src 04/App";
import App5 from "../mod/src 05/App";
import TasksApp from "./tasks/TasksApp";

const Home = () => {
    const { user, loading } = useAuth();
    const { logout } = useFirebaseAuth();
    const [activeTab, setActiveTab] = useState<'04' | '05' | 'tasks'>('tasks');

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-light min-vh-100 pb-5 position-relative overflow-hidden">
            <div >porfa funciona :c</div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4 position-relative" style={{ zIndex: 10 }}>
                <div className="container">
                    <span className="navbar-brand fw-bold text-dark">
                        <i className="bi bi-grid-1x2-fill me-2"></i> Mi Dashboard
                    </span>
                    <div className="d-flex align-items-center">
                        <span className="text-dark me-3 d-none d-md-block">
                            Hola, <strong>{user?.email}</strong>
                        </span>
                        <button onClick={logout} className="btn btn-outline-danger btn-sm fw-bold">
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container position-relative" style={{ zIndex: 10 }}>
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card shadow-sm">
                            <div className="card-header bg-white pt-3 pb-0 border-0">
                                <ul className="nav nav-tabs border-bottom-0">
                                    <li className="nav-item">
                                        <button 
                                            className={`nav-link text-dark fw-bold border-0 border-bottom ${activeTab === 'tasks' ? 'active border-primary border-3 text-primary bg-white' : 'bg-transparent'}`}
                                            onClick={() => setActiveTab('tasks')}
                                        > Task App
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button 
                                            className={`nav-link text-dark fw-bold border-0 border-bottom ${activeTab === '04' ? 'active border-primary border-3 text-primary bg-white' : 'bg-transparent'}`}
                                            onClick={() => setActiveTab('04')}
                                        >Biblioteca
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button 
                                            className={`nav-link text-dark fw-bold border-0 border-bottom ${activeTab === '05' ? 'active border-primary border-3 text-primary bg-white' : 'bg-transparent'}`}
                                            onClick={() => setActiveTab('05')}
                                        >Cajero
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenido Dinámico */}
                <div className="bg-white rounded-3 shadow-sm p-4 min-vh-50">
                    {activeTab === 'tasks' && <TasksApp />}
                    {activeTab === '04' && <App4 />}
                    {activeTab === '05' && <App5 />}
                </div>
            </div>
        </div>
    );
};

export default Home;
