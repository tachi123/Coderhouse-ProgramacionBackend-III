function sumar(){
    let result = 0;
    for (let i = 0; i < 5e9; i++) {
      result += i;
    }
    return sumar;
};

process.on('message', (msg) => {
  const resultado = sumar();
  process.send(resultado);
})