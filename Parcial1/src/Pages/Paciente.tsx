import React, { useState } from "react";

//Nodo para Pacientes
class NodoPaciente {
    nombre: string;
    IdPaci: number;
    siguiente: NodoPaciente | null;

    constructor(nombre: string, idpaci: number) {
        this.nombre = nombre;
        this.IdPaci = idpaci;
        this.siguiente = null;
    }
}

//Nodo para Historial
class NodoHistorial {
    nombre: string;
    IdPaci: number;
    siguiente: NodoHistorial | null;
    anterior: NodoHistorial | null; // Nuevo puntero para lista doble

    constructor(nombre: string, idpaci: number) {
        this.nombre = nombre;
        this.IdPaci = idpaci;
        this.siguiente = null;
        this.anterior = null;
    }
}

// Definición de la Lista Simplemente Enlazada (Linked List)
class ListaPacientes {
    cabeza: NodoPaciente | null;

    constructor() {
        this.cabeza = null;
    }

    // Método para insertar al final
    insertar(nombre: string, IdPaci: number) {
        const nuevoNodo = new NodoPaciente(nombre, IdPaci);
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
        } else {
            let actual = this.cabeza;
            while (actual.siguiente) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
        }
    }

    toArray(): { nombre: string, idpaci: number }[] {
        const lista: { nombre: string, idpaci: number }[] = [];
        let actual = this.cabeza;
        while (actual) {
            lista.push({ nombre: actual.nombre, idpaci: actual.IdPaci });
            actual = actual.siguiente;
        }
        return lista;
    }

    // Nuevo método para encontrar y extraer un paciente de la lista
    eliminarPorId(IdPaci: number): NodoPaciente | null {
        if (!this.cabeza) return null;

        // Si es el primer nodo
        if (this.cabeza.IdPaci === IdPaci) {
            const nodoEliminado = this.cabeza;
            this.cabeza = this.cabeza.siguiente;
            nodoEliminado.siguiente = null; // Limpiar referencia
            return nodoEliminado;
        }

        let actual = this.cabeza;
        while (actual.siguiente && actual.siguiente.IdPaci !== IdPaci) {
            actual = actual.siguiente;
        }

        if (actual.siguiente) {
            const nodoEliminado = actual.siguiente;
            actual.siguiente = actual.siguiente.siguiente;
            nodoEliminado.siguiente = null; // Limpiar referencia
            return nodoEliminado;
        }

        return null;
    }
}

// Definición de la Lista Doblemente Enlazada para Historial
class ListaHistorial {
    cabeza: NodoHistorial | null;
    cola: NodoHistorial | null; // Mantenemos referencia al último para inserción rápida

    constructor() {
        this.cabeza = null;
        this.cola = null;
    }

    // Insertar al final
    insertar(nombre: string, IdPaci: number) {
        const nuevoNodo = new NodoHistorial(nombre, IdPaci);
        
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;
        } else if (this.cola) {
            this.cola.siguiente = nuevoNodo;
            nuevoNodo.anterior = this.cola;
            this.cola = nuevoNodo;
        }
    }

    toArray(): { nombre: string, idpaci: number }[] {
        const lista: { nombre: string, idpaci: number }[] = [];
        let actual = this.cabeza;
        while (actual) {
            lista.push({ nombre: actual.nombre, idpaci: actual.IdPaci });
            actual = actual.siguiente;
        }
        return lista;
    }
}

export const Paciente: React.FC = () => {
    const [contadorActualizacion, setContadorActualizacion] = useState(0);

    const [listaPacientes] = useState(() => {
        const n = new ListaPacientes();
        n.insertar("Juan Perez", 101);
        n.insertar("Maria Garcia", 102);
        n.insertar("Carlos Lopez", 103);
        n.insertar("Diomedez Diaz", 104);
        n.insertar("Katy Perry", 105);
        n.insertar("Eduard Ruiz", 106);
        return n;
    });

    const [listaHistorial] = useState(() => new ListaHistorial());

    const transferirAHistorial = (id: number) => {
        const pacienteExtraido = listaPacientes.eliminarPorId(id);
        
        // Si lo encontramos y sacamos, lo insertamos en el historial
        if (pacienteExtraido) {
            listaHistorial.insertar(pacienteExtraido.nombre, pacienteExtraido.IdPaci);
            // Avisamos a React que algo ha cambiado y debe repintar
            setContadorActualizacion(prev => prev + 1);
        }
    };

    const pacientesArray = listaPacientes.toArray();
    const historialArray = listaHistorial.toArray();

    return (
        <div >
            <h2 style={{ color: '#ffffffff'}}>Lista de Pacientes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
                {pacientesArray.map((paciente, index) => (
                    <div key={index} style={{
                        padding: '10px 15px',
                        background: '#2d2d2d',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <span>{paciente.nombre}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span style={{ fontSize: '0.9rem', color: '#aaa' }}>{paciente.idpaci} Numero de Paciente</span>
                            <button 
                                onClick={() => transferirAHistorial(paciente.idpaci)}
                                style={{
                                    padding: '5px 10px',
                                    backgroundColor: '#a2a3a7ff',
                                    color: 'black',
                                    cursor: 'pointer'
                                }}
                            >
                                Paciente atendido
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {pacientesArray.length === 0 && <p style={{marginBottom: '30px'}}>No hay pacientes en la lista principal.</p>}

            {/* --- HISTORIAL DE PACIENTES --- */}
            <h2>Historial (Lista Doble)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {historialArray.map((paciente, index) => (
                    <div key={index} style={{
                        padding: '10px 15px',
                        background: '#1b1b1bff', // Un tono diferente para distinguirlo
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',

                    }}>
                        <span>{paciente.nombre}</span>
                        <span style={{ fontSize: '0.9rem', color: '#aaa' }}>ID: {paciente.idpaci}</span>
                    </div>
                ))}
            </div>
            {historialArray.length === 0 && <p>El historial está vacío.</p>}
        </div>
    );
};
