const suma = (...nums) => {
    if(nums.length ===0) return 0; 
    if(nums.some(item => !(typeof(item) === "number"))) return null;
    return nums.reduce((acc, currentValue) => acc + currentValue);
}

//Escenarios
let testPasados = 0;
let testTotales = 4;

//1. La función debe devolver null si algún parámetro no es numérico
console.log("Test 1: La función debe devolver null si algún parámetro no es numérico");
let resultTest1 = suma("2",2);
if(resultTest1 === null){
    console.log("Test 1 pasado");
    testPasados++;
}else{
    console.log(`Test 1 no pasado, se recibió ${typeof resultTest1}, pero se esperaba null`);
}

//2. La función debe devolver 0 si no se pasó ningún parámetro
console.log("Test 2: La función debe devolver 0 si no se pasó ningún parámetro");
let resultTest2 = suma();
if(resultTest2 === 0){
    console.log("Test 2 pasado");
    testPasados++;
}else{
    console.log(`Test 2 no pasado, se recibió ${resultTest2}, pero se esperaba 0`);
}

//3. La función debe poder realizar la suma correctamente
console.log("Test 3: La función debe poder realizar la suma correctamente");
let resultTest3 = suma(2,3);
if(resultTest3 === 5){
    console.log("Test 3 pasado");
    testPasados++;
}else{
    console.log(`Test 3 no pasado, se recibió ${resultTest3}, pero se esperaba 5`);
}

//4. La función debe poder hacer la suma con cualquier cantidad de números
//La función 'suma' actual solo acepta 2 argumentos. Este fallará claramente
console.log("Test 4: La función debe poder hacer la suma con cualquier cantidad de números");
let resultTest4 = suma(1,2,3,4,5); //Según la definición actual, solo usará 1 y 2
if(resultTest4 === 15){
    console.log("Test 4 pasado");
    testPasados++;
}else{
    console.log(`Test 4 no pasado, se recibió ${resultTest4}, pero se esperaba 15`);
}

//Resumen final de tests
if(testPasados === testTotales){
    console.log("Todos los tests se han pasado con éxito")
}else{
    console.log(`Se pasaron ${testPasados} tests de un total de ${testTotales}`)
}