const totalCompraSpan = document.getElementById("total-compra");

const urlParams = new URLSearchParams(window.location.search);
const totalCompra = urlParams.get("total");
totalCompraSpan.textContent = totalCompra || "0"; 

const metodosPagoContainer = document.getElementById("metodo-pago-container");

const metodosPago = ["Efectivo", "Mercado Pago", "Crédito/Débito"];
metodosPago.forEach((metodo, index) => {
  const button = document.createElement("button");
  button.textContent = metodo;
  button.addEventListener("click", () => {
    Swal.fire(`Has seleccionado ${metodo}`, "Gracias por tu compra!", "success");
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
