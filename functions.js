let LenghtARR = [1, 2, 3, 4, 5]
console.log(LenghtARR.length)

//cuenta los elementos dentro
//===============================================

let AtARR = [1, 2, 3, 4, 5]
console.log (AtARR.at(0), AtARR.at(-1))

// Te da el "dato" en la posicion del at contando desde 0
//===============================================

let ConcARR =[1, 2, 3]
let ConcArr2 = ["A", "B", "C"]

let ConCat = (ConcARR.concat(ConcArr2))
console.log(ConCat)

// Pone un array despues del otro
//===============================================

let CopArr1 = ["A", "B", "C", "D"]
console.log(CopArr1.copyWithin(0, 2, 3)) 
// copyWithin( donde quiero pegar los datos, de donde, a donde)
// copia una parte de la array en el mismo array
//===============================================

let EntryARR = ["A", "B", "C", "D"]
let EntryARR1 = EntryARR.entries()

console.log (EntryARR1.next(0).value)
console.log (EntryARR1.next(0).value)
console.log (EntryARR1.next(0).value)
console.log (EntryARR1.next(0).value)

// crea iteradores por pares [indice, valor]
//===============================================

let EveryARR = ["A", "A", "A", "A", "?"]
console.log ('Son todos "A"?:', EveryARR.every(a=> a === "A") )
//verifica una condicion uno por uno los elementos de un array
//===============================================

let FilARR =[1, 2, 3, 4]
console.log(FilARR.fill(2000000))
//Sustituye cada elemento con un valor especifico
//===============================================

let FilterARR= [1, 2, 3, 4, 5, 6]
console.log ("pares:", FilterARR.filter(a=> a%2===0))
//Quita los elementos que no cumplan con la condicion
//===============================================

let FindARR = [1, 2, 3, 4, 5]
console.log (FindARR.find(a => a > 2))
//devuelve el primer dato que cumple la condicion
//===============================================

let FindIndARR = [1, 2, 3, 4, 5]
console.log (FindIndARR.findIndex(a => a > 2))
//devuelve la posicion del primer dato que cumple la condicion
//===============================================

let FindLARR = [1, 2, 3, 4, 5]
console.log (FindLARR.findLast(a => a < 5))
//devuelve el ultimo dato que cumple la condicion
//===============================================

let FindLIARR = [1, 2, 3, 4, 5]
console.log (FindLARR.findLastIndex(a => a < 5))
//devuelve la posicion del ultimo dato que cumple la condicion
//===============================================

let FlatARR= [1, [1.3, 1.6], 2, [2.3, 2.6], 3 ]
console.log(FlatARR.flat())
// Vuelve los Arrays anidados, datos simples
//===============================================

let FlatMapARR =[1, 2, 3]
console.log (FlatMapARR.flatMap(a=> [a, a +0.3, a+0.6]))
//Hace la operacion uno por uno, luego quita los Arrays anidados
//===============================================

let ForEachARR = [1, 2, 3, 4, 5]
ForEachARR.forEach(a =>(console.log(a,"es menor que ", a + 1)))
//ejecuta una accion por cada elemento del array
//===============================================

let IncludesARR = ["A", "B", "C", "D"]
console.log("Tiene C?:", IncludesARR.includes("C"))
console.log("Tiene F?:", IncludesARR.includes("F"))
//verifica si existe el elemento en el array
//===============================================

let IndexOfARR = ["A", "B", "C", "D"]
console.log(IndexOfARR.indexOf("B"))
//Te da la posicion de un elemento buscado en un array (-1 si no esta)
//===============================================

let JoinARR = ["Juan", "Manuel"]
console.log (JoinARR.join(" y "))
// Convierte los arrays en un string separando los elementos con lo que este dentro del parentesis
//===============================================

let KeysARR= ["Juan", "Camilo", "Sanches"]
for (let Keys1 of KeysARR.keys()){
    console.log (Keys1);
}
//da los indices 
//===============================================

let LastIndARR = [1, 2, 1]
console.log("lastIndexOf(1):", LastIndARR.lastIndexOf(1))
//devuelve la última posición donde aparece un valor
//===============================================

let MapARR = [1, 2, 3]
console.log("map:", MapARR.map(n => n * 2))
//transforma cada elemento y devuelve un nuevo array
//===============================================

let PopARR = [1, 2, 3]
console.log("pop:", PopARR.pop())
console.log("después de pop:", PopARR)
//elimina el último elemento y lo devuelve
//===============================================

let PushARR = [1, 2]
console.log("push:", PushARR.push(3))
console.log("después de push:", PushARR)
//agrega un elemento al final y devuelve la nueva longitud
//===============================================

let ReduceARR = [1, 2, 3]
console.log("reduce:", ReduceARR.reduce((acc, n) => acc + n, 0))
//acumula valores en un solo resultado
//===============================================

let RedRightARR = [1, 2, 3]
console.log("reduceRight:", RedRightARR.reduceRight((acc, n) => acc - n))
//funciona como reduce pero desde derecha a izquierda
//===============================================

let ReverseARR = [1, 2, 3]
console.log("reverse:", ReverseARR.reverse())
//invierte el orden del array
//===============================================

let ShiftARR = [1, 2, 3]
console.log("shift:", ShiftARR.shift())
console.log("después de shift:", ShiftARR)
//elimina el primer elemento y lo devuelve
//===============================================

let SliceARR = [1, 2, 3, 4]
console.log("slice(1, 3):", SliceARR.slice(1, 3))
//devuelve una copia de una parte del array
//===============================================

let SomeARR = [1, 3, 5]
console.log("some (even):", SomeARR.some(n => n % 2 === 0))
//verifica si al menos un elemento cumple la condición
//===============================================

let SortARR = [10, 2, 5]
console.log("sort:", SortARR.sort((a, b) => a - b))
//ordena los elementos (como texto por defecto, aquí numérico)
//===============================================

let SpliceARR = [1, 2, 3]
SpliceARR.splice(1, 1, 99)
console.log("splice:", SpliceARR)
//agrega o elimina elementos modificando el array original
//===============================================

let LocaleARR = [1000, new Date()]
console.log("toLocaleString:", LocaleARR.toLocaleString())
//convierte los elementos a string según configuración regional
//===============================================

let ToStringARR = [1, 2, 3]
console.log("toString:", ToStringARR.toString())
//convierte el array en string separado por comas
//===============================================

let UnshiftARR = [2, 3]
console.log("unshift:", UnshiftARR.unshift(1))
console.log("después de unshift:", UnshiftARR)
//agrega elementos al inicio y devuelve nueva longitud
//===============================================

let ValuesARR = [1, 2, 3]
for (let value of ValuesARR.values()) {
  console.log("values:", value)
}
//devuelve un iterador con los valores
//===============================================
