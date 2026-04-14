import { Nodo } from '../../Node';

function dfs(nodo: Nodo<string>, result: string[] = []): string[] {
  result.push(nodo.valor);
  for (let hijo of nodo.hijos) {
    dfs(hijo, result);
  }
  return result;
}

export default dfs;
