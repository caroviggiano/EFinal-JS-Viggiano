class Producto {
    constructor(nombre, precio) {
      this.nombre = nombre;
      this.precio = precio;
    }
  }
  
  const productos = [
    new Producto("Alfajores", 250),
    new Producto("Caramelos", 10),
    new Producto("Gomitas", 100),
    new Producto("Chocolates", 150),
    new Producto("Bebidas energéticas", 400),
    new Producto("Agua", 120),
    new Producto("Gaseosas", 280),
    new Producto("Jugos", 170),
    new Producto("Marlboro", 500),
    new Producto("Camel", 600),
    new Producto("Chesterfield", 300),
    new Producto("Lucky Strike", 450)
  ];
  
  function calculoMonto(productoIndex, cantidad) {
    const producto = productos[productoIndex];
    if (producto) {
      return producto.precio * cantidad;
    } else {
      return 0;
    }
  }
  
  function mostrarOpciones(opciones) {
    return Number(
      prompt(
        `Bienvenido a Kioskito De Maní! Presione lo que necesite para continuar\n${opciones
          .map((o, index) => `${index + 1}. ${o}`)
          .join("\n")}`
      )
    );
  }
  
  function mostrarProductos(tipoProductos) {
    const opcionesProductos = tipoProductos.map((producto) => producto.nombre);
    let productoSeleccionado = mostrarOpciones(opcionesProductos);
  
    if (productoSeleccionado < 1 || productoSeleccionado > opcionesProductos.length) {
      mostrarMensaje("El número que seleccionó no está dentro de las opciones. Por favor, inténtelo nuevamente.");
      return null;
    } else {
      return productoSeleccionado - 1;
    }
  }
  
  let mensajeActual = null;
  
  function mostrarMensajeEnContenedor(mensaje) {
    if (mensajeActual) {
      mensajeActual.remove();
    }
  
    const mensajeContainer = document.createElement("p");
    mensajeContainer.textContent = mensaje;
    document.getElementById("mensaje-container").appendChild(mensajeContainer);
  
    mensajeActual = mensajeContainer;
  }
  
  function mostrarMetodosPago() {
    const metodosPago = ["Efectivo", "Mercado Pago", "Crédito/Débito"];
    const container = document.getElementById("metodo-pago-container");
  
    metodosPago.forEach((metodo, index) => {
      const button = document.createElement("button");
      button.textContent = metodo;
      button.id = `metodo-pago-${index + 1}`;
      button.addEventListener("click", () => {
        if (index === 0) {
          mostrarMensajeEnContenedor("Paguele al vendedor. ¡Muchas gracias por su compra!");
        } else if (index === 1) {
          mostrarMensajeEnContenedor("Pídale al vendedor el QR. ¡Muchas gracias por su compra!");
        } else if (index === 2) {
          mostrarMensajeEnContenedor("Pásele la tarjeta al vendedor. ¡Muchas gracias por su compra!");
        } else {
          mostrarMensajeEnContenedor("Opción no válida");
        }
      });
  
      container.appendChild(button);
    });
  }
  
  function crearTablaProductos() {
    const tablaContainer = document.getElementById("tabla-container");
    const tabla = document.createElement("table");
  
   
    const thead = document.createElement("thead");
    const encabezadoFila = document.createElement("tr");
    const encabezadoProducto = document.createElement("th");
    encabezadoProducto.textContent = "Producto";
    const encabezadoCantidad = document.createElement("th");
    encabezadoCantidad.textContent = "Cantidad";
    encabezadoFila.appendChild(encabezadoProducto);
    encabezadoFila.appendChild(encabezadoCantidad);
    thead.appendChild(encabezadoFila);
    tabla.appendChild(thead);
  
   
    const tbody = document.createElement("tbody");
    productos.forEach((producto, index) => {
      const fila = document.createElement("tr");
  
      const celdaProducto = document.createElement("td");
      celdaProducto.textContent = producto.nombre;
  
      const celdaCantidad = document.createElement("td");
      const inputCantidad = document.createElement("input");
      inputCantidad.type = "number";
      inputCantidad.min = "0";
      inputCantidad.id = `cantidad-${index}`;
      celdaCantidad.appendChild(inputCantidad);
  
      fila.appendChild(celdaProducto);
      fila.appendChild(celdaCantidad);
      tbody.appendChild(fila);
    });
  
    tabla.appendChild(tbody);
    tablaContainer.appendChild(tabla);
  }
  
  function obtenerCantidadesSeleccionadas() {
    const cantidades = [];
  
    productos.forEach((_, index) => {
      const inputCantidad = document.getElementById(`cantidad-${index}`);
      const cantidad = Number(inputCantidad.value);
      cantidades.push(cantidad);
    });
  
    return cantidades;
  }
  
  function procesarCompra() {
    const cantidades = obtenerCantidadesSeleccionadas();
  
    let montoTotal = 0;
  
    cantidades.forEach((cantidad, index) => {
      const montoProducto = calculoMonto(index, cantidad);
      montoTotal += montoProducto;
    });
  
    mostrarMensajeEnContenedor("El monto a pagar es de: $" + montoTotal);
  
    setTimeout(() => {
      mostrarMensajeEnContenedor("Seleccioná tu método de pago");
    }, 2000); 
  }
  
  
  localStorage.setItem("productos", JSON.stringify(productos));
  
  const storedProductos = JSON.parse(localStorage.getItem("productos"));
  if (storedProductos) {
    productos.length = 0;
    storedProductos.forEach((producto) => {
      productos.push(new Producto(producto.nombre, producto.precio));
    });
  }
  
  const procesarCompraButton = document.getElementById("procesar-compra-button");
  procesarCompraButton.addEventListener("click", procesarCompra);
  
  mostrarMetodosPago();
  crearTablaProductos();
  
  