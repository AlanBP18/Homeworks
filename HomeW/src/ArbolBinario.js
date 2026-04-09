class ArbolBinario {
    constructor() {
        this.raiz = null;
    }

    insertar(valor) {
        const nuevoNodo = new Nodo(valor);
        if (!this.raiz) {
            this.raiz = nuevoNodo;
            return;
        }



        let actual = this.raiz;
        while (true) {
            if (valor < actual.valor) {
                if (!actual.izquierda) {
                    actual.izquierda = nuevoNodo;
                    return;
                }
                actual = actual.izquierda;
            } else {
                if (!actual.derecha) {
                    actual.derecha = nuevoNodo;
                    return;
                }
                actual = actual.derecha;
            }
        }
    }
}