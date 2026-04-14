import { Nodo } from "../../Node";

function bfs(raiz: Nodo<string>): string[] {
  const result: string[] = [];
  const cola: Nodo<string>[] = [raiz];

  while (cola.length > 0) {
    const actual = cola.shift();
    if (actual) {
      result.push(actual.valor);
      if (actual.hijos) {
        cola.push(...actual.hijos);
      }
    }
  }
  return result;
}

export default bfs;
