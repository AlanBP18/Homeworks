import { Nodo } from "./Node";

export const arbolGatos = new Nodo("Gatos");

const solidos = new Nodo("ColoresSolid");
solidos.agregarHijo(new Nodo("Negro"));
solidos.agregarHijo(new Nodo("Blanco"));
solidos.agregarHijo(new Nodo("Gris"));
solidos.agregarHijo(new Nodo("Naranja"));

const atigrados = new Nodo("Atigrados");
atigrados.agregarHijo(new Nodo("Rayas"));
atigrados.agregarHijo(new Nodo("Remolinos"));
atigrados.agregarHijo(new Nodo("Moteado"));

const render = new Nodo("Render");

arbolGatos.agregarHijo(solidos);
arbolGatos.agregarHijo(atigrados);
arbolGatos.agregarHijo(render);

export default arbolGatos;
