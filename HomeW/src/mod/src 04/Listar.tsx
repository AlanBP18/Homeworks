import Libro from "./Libros";
import React, { useState, forwardRef, useImperativeHandle } from "react";

class Stack {
    private items: Libro[] = [];

    push(value: Libro) {
        this.items.push(value);
    }

    pop(): Libro | null {
        return this.items.length > 0 ? this.items.pop()! : null;
    }

    peek(): Libro | null {
        return this.items.length > 0 ? this.items[this.items.length - 1] : null;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    toArray(): Libro[] {
        return this.items.slice().reverse();
    }
}

const estiloTarjeta = {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    backgroundColor: '#333',
    color: '#fff'
};

const Listar = forwardRef((props, ref) => {
    const [miPilita] = useState(() => {
        const pila = new Stack();
        pila.push(Libro.crear(10000, "Como matar a un ruiseñor", "Gustavo Petro", "Zona America"));
        pila.push(Libro.crear(10001, "En la sala de un hospital", "Simon Varon", "Editorial Verano"));
        pila.push(Libro.crear(10002, "Espera un poco, un poquito mas", "Mon Laferte", "DespechoSA"));
        pila.push(Libro.crear(10003, "Quien es?", "Soyo Martinez", "TainyRecords"));
        return pila;
    });

    const [elementos, setElementos] = useState<Libro[]>(miPilita.toArray());

    useImperativeHandle(ref, () => ({
        agregarLibro(nuevoLibro: Libro) {
            miPilita.push(nuevoLibro);
            setElementos(miPilita.toArray());
        }
    }));

    return (
        <div className="lista-pila">
            <h2 style={{ color: '#000000' }}>Lista de Libros</h2>
            {elementos.length === 0 ? (
                <p>La pila está vacía</p>
            ) : (
                elementos.map((libro) => (
                    <div key={libro.isbn} style={estiloTarjeta}>
                        <h3>{libro.titulo}</h3>
                        <p><strong>Autor:</strong> {libro.autor}</p>
                        <small style={{ color: '#aaa' }}>ISBN: {libro.isbn} | Editorial: {libro.editorial}</small>
                    </div>
                ))
            )}
        </div>
    );
});

export default Listar;