const PRECIO_EMPANADA = 1500;
const COSTO_DELIVERY = 500;
const DIRECCION_TIENDA = "Pasaje 47 Casa 2156";

let carrito = [];

// Agregar empanada (Napolitana y Queso)
function agregarAlCarrito(tipo, coccion) {
  carrito.push({ tipo, coccion });
  actualizarCarrito();
}

// Agregar empanada de Pino con cocción
function agregarEmpanadaPino() {
  const coccion = document.getElementById("tipoPino").value;
  carrito.push({ tipo: "Pino", coccion });
  actualizarCarrito();
}

// Eliminar empanada del carrito
function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  actualizarCarrito();
}

// Actualizar carrito visualmente
function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalCarrito = document.getElementById("total-carrito");

  lista.innerHTML = "";

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `Empanada ${item.tipo} (${item.coccion}) - $${PRECIO_EMPANADA}`;
    
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "❌";
    botonEliminar.onclick = () => eliminarDelCarrito(index);
    botonEliminar.style.marginLeft = "10px";
    
    li.appendChild(botonEliminar);
    lista.appendChild(li);
  });

  const total = carrito.length * PRECIO_EMPANADA;
  totalCarrito.innerHTML = `<strong>Total:</strong> $${total}`;
}

// Cambiar estado del campo dirección
function cambiarEntrega() {
  const entrega = document.getElementById("entrega").value;
  const direccionInput = document.getElementById("direccion");
  const direccionTienda = document.getElementById("direccion-casa");

  if (entrega === "Retiro en Casa") {
    direccionInput.disabled = true;
    direccionInput.value = "";
    direccionTienda.style.display = "block";
  } else {
    direccionInput.disabled = false;
    direccionTienda.style.display = "none";
  }
}

// Enviar pedido a WhatsApp
function enviarPedido() {
  const direccionInput = document.getElementById("direccion");
  const entrega = document.getElementById("entrega").value;
  const pago = document.getElementById("pago").value;

  if (carrito.length === 0) {
    alert("El carrito está vacío. Agrega empanadas antes de enviar.");
    return;
  }

  let direccion = (entrega === "Direccion de Retiro") ? DIRECCION_TIENDA : direccionInput.value;

  if (entrega === "Despacho a Domicilio" && direccion.trim() === "") {
    alert("Por favor, ingresa tu dirección para el despacho.");
    return;
  }

  let total = carrito.length * PRECIO_EMPANADA;
  if (entrega === "Despacho a Domicilio") {
    total += COSTO_DELIVERY;
  }

  let mensaje = "¡Hola! Quiero hacer el siguiente pedido:\n\n";
  carrito.forEach((item, index) => {
    mensaje += `${index + 1}. Empanada ${item.tipo} (${item.coccion}) - $${PRECIO_EMPANADA}\n`;
  });
  mensaje += `\nMétodo de entrega: ${entrega}`;
  mensaje += `\nDirección: ${direccion}`;
  mensaje += `\nMétodo de pago: ${pago}`;
  mensaje += `\n\nTOTAL: $${total}`;

  const numeroWhatsApp = "56988039496"; 
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
