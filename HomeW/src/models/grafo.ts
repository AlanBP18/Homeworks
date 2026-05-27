export class Grafo {
  private listaAdyacencia: Map<string, Set<string>>;

  constructor() {
    this.listaAdyacencia = new Map();
  }

  agregarNodo(idCancion: string): void {
    if (!this.listaAdyacencia.has(idCancion)) {
      this.listaAdyacencia.set(idCancion, new Set());
    }
  }

  agregarArista(idCancion1: string, idCancion2: string): void {
    this.agregarNodo(idCancion1);
    this.agregarNodo(idCancion2);
    
    this.listaAdyacencia.get(idCancion1)!.add(idCancion2);
    this.listaAdyacencia.get(idCancion2)!.add(idCancion1);
  }

  obtenerVecinos(idCancion: string): string[] {
    if (!this.listaAdyacencia.has(idCancion)) return [];
    return Array.from(this.listaAdyacencia.get(idCancion)!);
  }

  construirGrafoDeGeneros(canciones: { id: string; generos: string[] }[]): void {
    this.listaAdyacencia.clear();

    canciones.forEach((c) => this.agregarNodo(c.id));

    for (let i = 0; i < canciones.length; i++) {
      const c1 = canciones[i];
      for (let j = i + 1; j < canciones.length; j++) {
        const c2 = canciones[j];
        
        const tienenGeneroEnComun = c1.generos.some(g1 => 
          c2.generos.some(g2 => g1.toLowerCase().trim() === g2.toLowerCase().trim())
        );

        if (tienenGeneroEnComun) {
          this.agregarArista(c1.id, c2.id);
        }
      }
    }
  }
}
