export class Nodo<T> {
  valor: T;
  hijos: Nodo<T>[];

  constructor(valor: T) {
    this.valor = valor;
    this.hijos = [];
  }

  agregarHijo(nodo: Nodo<T>): void {
    this.hijos.push(nodo);
  }
}
