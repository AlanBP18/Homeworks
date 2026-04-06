import React from "react";
import type { Persona } from "./Queue";

const formatearFecha = (fecha: Date): string => {
  return fecha.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const formatearMonto = (monto: number): string => {
  return monto.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });
};

const FilaPersona: React.FC<{ persona: Persona; posicion: number }> = ({
  persona,
  posicion,
}) => (
  <tr>
    <td style={{ padding: "0.4rem 0.8rem" }}>{posicion}</td>
    <td style={{ padding: "0.4rem 0.8rem" }}>{persona.nombre}</td>
    <td style={{ padding: "0.4rem 0.8rem" }}>{formatearMonto(persona.monto)}</td>
    <td style={{ padding: "0.4rem 0.8rem" }}>{formatearFecha(persona.fechaLlegada)}</td>
  </tr>
);

interface ListaColaProps {
  cola: Persona[];
  atenderSiguiente: () => void;
  primeroEnFila: () => Persona | null;
}

const ListaCola: React.FC<ListaColaProps> = ({ cola, atenderSiguiente, primeroEnFila }) => {
  const siguiente = primeroEnFila();

  return (
    <div>
      <h2 style={{ color: '#000000' }}>Cola del cajero automático</h2>

      <p>
        <strong>Personas en espera:</strong> {cola.length}
      </p>

      {siguiente && (
        <p>
          <strong>Próximo a atender:</strong> {siguiente.nombre} —{" "}
          {formatearMonto(siguiente.monto)}
        </p>
      )}

      <button
        onClick={atenderSiguiente}
        disabled={cola.length === 0}
        style={{ marginBottom: "1rem" }}
      >
        Atender siguiente
      </button>

      {cola.length === 0 ? (
        <p>No hay personas en la cola.</p>
      ) : (
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #333" }}>
              <th style={{ padding: "0.4rem 0.8rem", textAlign: "left" }}>#</th>
              <th style={{ padding: "0.4rem 0.8rem", textAlign: "left" }}>Nombre</th>
              <th style={{ padding: "0.4rem 0.8rem", textAlign: "left" }}>Monto</th>
              <th style={{ padding: "0.4rem 0.8rem", textAlign: "left" }}>Hora llegada</th>
            </tr>
          </thead>
          <tbody>
            {cola.map((persona: Persona, index: number) => (
              <FilaPersona key={persona.id} persona={persona} posicion={index + 1} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaCola;
