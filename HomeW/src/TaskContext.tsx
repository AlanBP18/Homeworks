import { createContext, useContext, useState, useEffect } from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  editTask: (id: string, newTitle: string, newDesc: string) => void;
  deleteTask: (id: string) => void;
  toggleDone: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
};

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const stored = localStorage.getItem("my_tasks");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("my_tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (title: string, description: string) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title,
            description,
            isDone: false
        };
        setTasks(prev => [...prev, newTask]);
    };

    const editTask = (id: string, newTitle: string, newDesc: string) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, title: newTitle, description: newDesc } : t));
    };

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const toggleDone = (id: string) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, isDone: !t.isDone } : t));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, editTask, deleteTask, toggleDone }}>
            {children}
        </TaskContext.Provider>
    );
};
