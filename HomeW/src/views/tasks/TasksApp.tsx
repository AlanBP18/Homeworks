import React, { useState } from "react";
import { useTasks, type Task } from "../../TaskContext";

const TasksApp = () => {
    const { tasks, addTask, editTask, deleteTask, toggleDone } = useTasks();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !desc.trim()) return;

        if (editingId) {
            editTask(editingId, title, desc);
            setEditingId(null);
        } else {
            addTask(title, desc);
        }
        setTitle("");
        setDesc("");
    };

    const startEditing = (task: Task) => {
        setEditingId(task.id);
        setTitle(task.title);
        setDesc(task.description);
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4 text-primary">
                <i className="bi bi-list-task me-2"></i>Gestor de Tareas (CRUD)
            </h2>
            
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="row g-3 align-items-end">
                        <div className="col-md-4">
                            <label className="form-label">Título</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Ej: Comprar pan"
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Descripción</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="Ej: Ir a la panadería de la esquina..."
                            />
                        </div>
                        <div className="col-md-2 d-grid">
                            <button type="submit" className={`btn ${editingId ? 'btn-warning' : 'btn-primary'}`}>
                                {editingId ? "Actualizar" : "Añadir"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="row">
                {tasks.length === 0 ? (
                    <div className="col-12 text-center text-muted py-5">
                        <p>No tienes tareas pendientes. ¡Añade una nueva!</p>
                    </div>
                ) : (
                    tasks.map(task => (
                        <div key={task.id} className="col-12 col-md-6 col-lg-4 mb-3">
                            <div className={`card h-100 shadow-sm transition-hover ${task.isDone ? 'border-success' : 'border-secondary'}`}>
                                <div className="card-body">
                                    <h5 className={`card-title ${task.isDone ? 'text-decoration-line-through text-muted' : ''}`}>
                                        {task.title}
                                    </h5>
                                    <p className={`card-text ${task.isDone ? 'text-decoration-line-through text-muted' : ''}`}>
                                        {task.description}
                                    </p>
                                    
                                    <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                                        <div className="form-check form-switch">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                checked={task.isDone}
                                                onChange={() => toggleDone(task.id)}
                                                id={`flexSwitchCheck-${task.id}`}
                                            />
                                            <label className="form-check-label text-sm" htmlFor={`flexSwitchCheck-${task.id}`}>
                                                {task.isDone ? 'Hecho' : 'Pendiente'}
                                            </label>
                                        </div>
                                        <div className="btn-group btn-group-sm">
                                            <button 
                                                className="btn btn-outline-warning" 
                                                onClick={() => startEditing(task)}
                                                disabled={task.isDone}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="btn btn-outline-danger" 
                                                onClick={() => deleteTask(task.id)}
                                            >
                                                Borrar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TasksApp;
