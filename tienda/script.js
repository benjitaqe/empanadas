let carrito = [];

function agregarAlCarrito(tipo) {
  carrito.push(tipo);
  alert(`Agregaste una empanada ${tipo} al carrito.`);
}

function enviarPedido() {
  const direccion = document.getElementById("direccion").value;
  const entrega = document.getElementById("entrega").value;

  if (carrito.length === 0) {
    alert("El carrito está vacío. Agrega empanadas antes de enviar.");
    return;
  }

  if (direccion.trim() === "") {
    alert("Por favor, ingresa tu dirección.");
    return;
  }

  let mensaje = "¡Hola! Quiero hacer el siguiente pedido:\n\n";
  carrito.forEach((item, index) => {
    mensaje += `${index + 1}. Empanada ${item}\n`;
  });
  mensaje += `\nMétodo de entrega: ${entrega}`;
  mensaje += `\nDirección: ${direccion}`;

  const numeroWhatsApp = "56988039496";
  
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
