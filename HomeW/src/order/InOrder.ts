export function inorden(nodo) {
    const result = [];
    function traverse(node) {
        if (!node) return;
        traverse(node.izquierda);
        result.push(node.valor);
        traverse(node.derecha);
    }
    traverse(nodo);
    return result;
}
