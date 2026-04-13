export function preorden(nodo) {
    const result = [];
    function traverse(node) {
        if (!node) return;
        result.push(node.valor);
        traverse(node.izquierda);
        traverse(node.derecha);
    }
    traverse(nodo);
    return result;
}
