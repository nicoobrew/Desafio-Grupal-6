let carrito = {};

let precios = {
    "Iphone 13 Pro Max": 699990, 
    "Iphone 14 Pro Max": 899990, 
    "Camara Sony Alfa6400": 499990,
    "Teclado Mecanico VantarMX": 99990,
    "Teclado Mecanico Vantar": 99990,
    "Samsung S22 Ultra": 999990,
    "Samsung S23 Ultra": 1299990,
    "Camara Sony Alfa6000": 499990,
};

// Obtener los valores de los campos de Nombre de Usuario y Contraseña
function validarlogin(event) {
    event.preventDefault();
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;
    // Redireccionar al usuario a la página principal del listado de productos
    if (user === password) {
        window.location.href = "/index.html";
    } else {
        // Limpiar el formulario de inicio de sesión
        user.value = "";
        password.value = "";
        alert("Nombre de usuario y contrasena no coinciden, intentalo nuevamente");
    }
}

let formaLogin = document.getElementById("formulario-login");

if (formaLogin != null) {
    formaLogin.addEventListener("submit", validarlogin);
}

function actualizarCarrito(event) {
    let producto;
    let operacion;

    // Conseguir los valores de producto y operacion
    for (const attr of event.target.attributes) {
        if (attr.name == "data-producto") {
            producto = attr.value;
        } else if (attr.name == "data-op") {
            operacion = attr.value;
        }
    }

    if (!(producto in carrito)) {
        carrito[producto] = 0;
    }

    if (operacion == "menos" && carrito[producto] > 0) {
        carrito[producto] -= 1;
    } else if (operacion == "mas") {
        carrito[producto] += 1;
    }

    // Actualizar el numero de items en input al lado del boton
    let selector = 'input[data-producto="' + producto + '"]';
    let elemNumero = document.querySelector(selector);
    elemNumero.value = carrito[producto];

    // Actualizar la tabla del carrito
    let elemCuerpoTabla = document.querySelector("#tabla-carrito > tbody");
    elemCuerpoTabla.innerHTML = "";

    let total = 0;

    for (let producto of Object.keys(carrito)) {
        let tr = document.createElement("tr");

        let precioUni = precios[producto];
        let cantidad = carrito[producto];

        // Producto, Cantidad, Precio Unidad, Total Producto
        let valoresFila = [producto, cantidad, precioUni, precioUni * cantidad];

        // Crear la fila
        for (let vf of valoresFila) {
            let td = document.createElement("td");
            td.innerText = vf.toString();
            tr.appendChild(td);            
        }

        // Agregar la fila
        elemCuerpoTabla.appendChild(tr);

        // Actualizar el total
        total += valoresFila[3];
    }

    // Incluir el total
    let elemTotal = document.getElementById("total-compra");
    elemTotal.innerText = total.toString();

    console.log(carrito);
}

for (let boton of document.querySelectorAll(".boton-producto")) {
    boton.addEventListener("click", actualizarCarrito);
}

function confirmarDespacho(event){
    const modal = new bootstrap.Modal("#despacho", {});
    const modalActivar = document.getElementById("despacho");
    modal.show(modalActivar);
    setTimeout(function(){
        window.location.href="/index.html";
    },5000);
}

let botonDespacho = document.getElementById("boton-despacho");

if (botonDespacho != null) {
    botonDespacho.addEventListener("click", confirmarDespacho);
}

let botonPago = document.getElementById("boton-pago");

if (botonPago != null) {
    botonPago.addEventListener("click",
        function (event) {window.location.href = "/formulariodespacho.html";});
}