const login = (user, password) => {
    const correctUser = 'coderUser';
    const correctPassword = '123';
    if (!password) {
        console.log('No se ha proporcionado un password');
        return;
    }
    if (!user) {
        console.log('No se ha proporcionado un usuario');
        return;
    }
    if (user !== correctUser) {
        console.log('Credenciales incorrectas');
        return;
    }
    if (user === correctUser && password !== correctPassword) {
        console.log('Contraseña incorrecta');
        return;
    }
    if(user === correctUser && password === correctPassword)
        console.log('Login exitoso');
}

//1. Pasword vacío -- console.log("No se ha proporcionado un password")
console.log("--- Test 1: Pasword vacío ----")
login("coderUser",'');
console.log("--- Test 1: Fin test ----")

//2. Usuario vacío -- console.log("No se ha proporcionado un usuario")
console.log("--- Test 2: Usuario vacío ----")
login('','password');
console.log("--- Test 2: Fin test ----")

//3. Password incorrecto -- console.log("Contraseña incorrecta")
console.log("--- Test 3: Password incorrecto ----")
login('coderUser','incorrect');
console.log("--- Test 3: Fin test ----")

//4. Usuario incorrecto -- console.log("Credenciales incorrectas")
console.log("--- Test 4: Usuario incorrecto ----")
login('user','incorrect');
console.log("--- Test 4: Fin test ----")

//5. Login exitoso -- console.log("Login exitoso")
console.log("--- Test 5:Login exitoso ----")
login('coderUser','123');
console.log("--- Test 5: Fin test ----")
