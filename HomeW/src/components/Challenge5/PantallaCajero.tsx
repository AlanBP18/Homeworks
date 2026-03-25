import React, { useState, useCallback } from "react";
import FormularioPersona from "./FormularioPersona";
import ListaCola from "./ListaCola";
import { Queue } from "./Queue";
import type { Persona } from "./Queue";
import { personasMock } from "./mockData";

const colaInstance = new Queue<Persona>();
personasMock.forEach((p: Persona) => colaInstance.enqueue(p));

const PantallaCajero: React.FC = () => {
  const [cola, setCola] = useState<Persona[]>(colaInstance.getItems());

  const agregarPersona = useCallback(
    (datos: Omit<Persona, "id" | "fechaLlegada">) => {
      const nueva: Persona = {
        ...datos,
        id: Date.now().toString(),
        fechaLlegada: new Date(),
      };
      colaInstance.enqueue(nueva);

      const items = colaInstance.getItems().sort(
        (a: Persona, b: Persona) => a.fechaLlegada.getTime() - b.fechaLlegada.getTime()
      );
      while (!colaInstance.isEmpty()) colaInstance.dequeue();
      items.forEach((p: Persona) => colaInstance.enqueue(p));

      setCola(colaInstance.getItems());
    },
    []
  );

  const atenderSiguiente = useCallback((): Persona | null => {
    const atendida = colaInstance.dequeue();
    setCola(colaInstance.getItems());
    return atendida;
  }, []);

  const primeroEnFila = useCallback((): Persona | null => {
    return colaInstance.peek();
  }, []);

  return (
    <div>
      <h1>Sistema de Cola Cajero</h1>
      <hr />
      <FormularioPersona agregarPersona={agregarPersona} />
      <ListaCola
        cola={cola}
        atenderSiguiente={atenderSiguiente}
        primeroEnFila={primeroEnFila}
      />
    </div>
  );
};

export default PantallaCajero;
