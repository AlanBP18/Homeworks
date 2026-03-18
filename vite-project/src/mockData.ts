import type { Persona } from "./Queue";

function fechaPRE(Numi:number): Date {
  const ahora = new Date();
  return new Date(ahora.getTime() + Numi);
}

export const personasMock: Persona[] = [
  {
    id: "1",
    nombre: "Carlos Rodríguez",
    monto: 150000,
    fechaLlegada: fechaPRE(20),
  },
  {
    id: "2",
    nombre: "María López",
    monto: 80000,
    fechaLlegada: fechaPRE(20),
  },
  {
    id: "3",
    nombre: "Juan Pérez",
    monto: 200000,
    fechaLlegada: fechaPRE(-10),
  },
].sort((a, b) => a.fechaLlegada.getTime() - b.fechaLlegada.getTime());
