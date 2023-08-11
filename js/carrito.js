const totalCompraSpan = document.getElementById("total-compra");

const urlParams = new URLSearchParams(window.location.search);
const totalCompra = urlParams.get("total");
totalCompraSpan.textContent = totalCompra || "0"; 

const metodosPagoContainer = document.getElementById("metodo-pago-container");

const metodosPago = [
  { nombre: "Efectivo", preference_id: "efectivo_preference_id" },
  { nombre: "Mercado Pago", preference_id: "mercadopago_preference_id" },
  { nombre: "Crédito/Débito", preference_id: "tarjeta_preference_id" }
];

metodosPago.forEach((metodo, index) => {
  const button = document.createElement("button");
  button.textContent = metodo.nombre;
  button.addEventListener("click", () => {
    if (metodo.nombre === "Mercado Pago") {

      const montoAPagar = totalCompra || 0;
      window.location.href = `https://www.mercadopago.com.ar/home`;
    } else {
      Swal.fire(`Has seleccionado ${metodo.nombre}`, "Gracias por tu compra!", "success");
    }
  });

  metodosPagoContainer.appendChild(button);
});

setTimeout(() => {
  Swal.fire({
    title: "Seleccionar su método de pago",
    timer: 2000,
    icon: "info",
    showConfirmButton: false
  });
}, 0);
