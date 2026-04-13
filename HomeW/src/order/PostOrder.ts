export function postorden(nodo) {
    const result = [];
    function traverse(node) {
        if (!node) return;
        traverse(node.izquierda);
        traverse(node.derecha);
        result.push(node.valor);
    }
    traverse(nodo);
    return result;
}
