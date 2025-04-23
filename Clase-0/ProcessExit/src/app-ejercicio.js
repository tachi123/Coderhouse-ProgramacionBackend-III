//Corroborar el tipo de los valores ingresados, que sean todos numéricos
function listNumbers(...numbers){//Uso el operador rest para recibir un numero indefinidos de elementos de argumentos
    const types = numbers.map(number => typeof number);

    if(types.some(type => type !== 'number')){
        console.error('Invalid parameters', types);
        process.exit(4);
    }
    console.log(numbers);
}

listNumbers(1,2,"a",true);
listNumbers(1,2,3,4);