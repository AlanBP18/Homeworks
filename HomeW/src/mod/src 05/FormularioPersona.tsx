import React, { useState } from "react";
import type { Persona } from "./Queue";

interface FormularioPersonaProps {
  agregarPersona: (datos: Omit<Persona, "id" | "fechaLlegada">) => void;
}

const FormularioPersona: React.FC<FormularioPersonaProps> = ({ agregarPersona }) => {
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !monto) return;

    agregarPersona({ nombre: nombre.trim(), monto: Number(monto) });
    setNombre("");
    setMonto("");
  };

  return (
    <div>
      <h2 style={{ color: '#000000' }}>Agregar persona a la cola</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label htmlFor="nombre">Nombre: </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Ej: Pedro Gómez"
          />
        </div>
        <div>
          <label htmlFor="monto">Monto: </label>
          <input
            id="monto"
            type="number"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
            min={1}
            placeholder="Ej: 100000"
          />
        </div>
        <button style= {{borderRadius:"20px", padding:"5px", margin:"10px"}}type="submit">Agregar a la cola</button>
      </form>
    </div>
  );
};

export default FormularioPersona;
