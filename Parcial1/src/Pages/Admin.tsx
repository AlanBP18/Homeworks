import React, { useState, useEffect } from "react";

class Admin {
    nombre: string;
    siguiente: Admin | null;
    anterior: Admin | null;

    constructor(nombre: string) {
        this.nombre = nombre;
        this.siguiente = null;
        this.anterior = null;
    }
}

class ListaCircularDoble {
    cabeza: Admin | null;

    constructor() {
        this.cabeza = null;
    }
    // con este se agregan todos los valores, no tiene un "boton" que la use
    insertar(nombre: string) {
        const nuevoNodo = new Admin (nombre);
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
            nuevoNodo.siguiente = nuevoNodo;
            nuevoNodo.anterior = nuevoNodo;
        } else {
            const ultimo = this.cabeza.anterior!;
            
            ultimo.siguiente = nuevoNodo;
            nuevoNodo.anterior = ultimo;
            nuevoNodo.siguiente = this.cabeza;
            this.cabeza.anterior = nuevoNodo;
        }
    }

    obtenerNombres(): string[] {
        const nombres: string[] = [];
        if (!this.cabeza) return nombres;

        let actual = this.cabeza;
        do {
            nombres.push(actual.nombre);
            actual = actual.siguiente!;
        } while (actual !== this.cabeza);

        return nombres;
    }
}

export const Admini: React.FC = () => {
    const [lista] = useState(() => {
        const n = new ListaCircularDoble();
        n.insertar("Mario");
        n.insertar("Maria");
        n.insertar("Camilo")
        n.insertar("Camila")
        n.insertar("Aleandro")
        n.insertar("Alejandra")
        return n;
    });

    // Guardamos el nodo actual en el estado para poder navegar
    const [nodoActual, setNodoActual] = useState<Admin | null>(lista.cabeza);

    const irSiguiente = () => {
        if (nodoActual?.siguiente) {
            setNodoActual(nodoActual.siguiente);
        }
    };

    const irAnterior = () => {
        if (nodoActual?.anterior) {
            setNodoActual(nodoActual.anterior);
        }
    };

    if (!nodoActual) return null;

    return (
        <div className="admin-container" style={{ 
            padding: '20px', 
            color: 'white', 
            background: '#2f2f2fff', 
            marginTop: '20px',
            textAlign: 'center'
        }}>
            <h2>Administradores</h2>
            
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '20px',
                margin: '20px 0' 
            }}>
                <button 
                    onClick={irAnterior}
                    style={{
                        padding: '10px 15px',
                        background: '#444',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    {"<"} Anterior
                </button>

                <div style={{ 
                    padding: '20px 40px', 
                    background: '#696969', 
                    borderRadius: '10px',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    minWidth: '150px'
                }}>
                    {nodoActual.nombre}
                </div>

                <button 
                    onClick={irSiguiente}
                    style={{
                        padding: '10px 15px',
                        background: '#444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Siguiente {">"}
                </button>
            </div>
        </div>
    );
};
