/**
 * DIFERENCIAS ENTRE FUNCIONES NORMALES Y FUNCIONES FLECHA
 */

// 1. SINTAXIS
// Las funciones normales requieren la palabra clave 'function'.
function normal(a, b) {
    return a + b;
}

// Las funciones flecha son más concisas.
const flecha = (a, b) => a + b; // Retorno implícito si es una sola línea.


// 2. EL OBJETO 'this' (La diferencia más importante)
// En funciones normales, 'this' es dinámico y depende de CÓMO se llama a la función.
const objetoNormal = {
    nombre: "Objeto Normal",
    mostrar: function() {
        console.log("Normal this:", this.nombre);
    }
};
objetoNormal.mostrar(); // Imprime: "Objeto Normal"

// En funciones flecha, 'this' es léxico. Hereda 'this' del contexto donde fue creada.
const objetoFlecha = {
    nombre: "Objeto Flecha",
    mostrar: () => {
        // 'this' aquí no es 'objetoFlecha', sino el contexto global (o undefined en modo estricto)
        console.log("Flecha this:", this.nombre); 
    }
};
objetoFlecha.mostrar(); // Imprime: "Flecha this: undefined"


// 3. OBJETO 'arguments'
// Las funciones normales tienen acceso al objeto 'arguments' que contiene todos los parámetros pasados.
function conArguments() {
    console.log("Arguments normal:", arguments);
}
conArguments(1, 2, 3); // Funciona

// Las funciones flecha NO tienen su propio objeto 'arguments'.
const sinArguments = () => {
    try {
        console.log(arguments);
    } catch (e) {
        console.log("Error: Las funciones flecha no tienen 'arguments'");
    }
};
sinArguments(1, 2, 3);


// 4. USO COMO CONSTRUCTOR (Palabra clave 'new')
// Las funciones normales pueden ser constructores.
function Persona(nombre) {
    this.nombre = nombre;
}
const juan = new Persona("Juan"); // Funciona

// Las funciones flecha NO pueden ser usadas con 'new'. No son constructores.
const Animal = (tipo) => {
    this.tipo = tipo;
};
// const miPerro = new Animal("Perro"); // Esto daría un TypeError


// 5. PROPIEDAD 'prototype'
// Las funciones normales tienen una propiedad 'prototype'.
console.log("Normal tiene prototype:", normal.prototype); // {}

// Las funciones flecha no tienen 'prototype'.
console.log("Flecha tiene prototype:", flecha.prototype); // undefined


