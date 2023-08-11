class Producto {
  constructor(nombre, precio, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }
}

async function obtenerProductos() {
  try {
    const response = await fetch("http://localhost:3001/productos");
    if (!response.ok) {
      throw new Error("No se pudieron obtener los productos");
    }
    const productos = await response.json();
    return productos.map(producto => new Producto(producto.nombre, producto.precio, producto.imagen));
  } catch (error) {
    throw new Error("Error al obtener los productos");
  }
}

function mostrarProductos(productos) {
  const productosContainer = document.getElementById("productos-container");

  productos.forEach((producto, index) => {
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto");

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.classList.add("producto-imagen");

    const nombre = document.createElement("p");
    nombre.textContent = producto.nombre;
    nombre.classList.add("producto-nombre");

    const precio = document.createElement("p");
    precio.textContent = `$${producto.precio}`;
    precio.classList.add("producto-precio");

    const cantidadInput = document.createElement("input");
    cantidadInput.type = "number";
    cantidadInput.min = "0";
    cantidadInput.value = "0";
    cantidadInput.classList.add("producto-cantidad");

    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar al carrito";
    botonAgregar.classList.add("boton-agregar");
    botonAgregar.addEventListener("click", () => {
      const cantidad = parseInt(cantidadInput.value, 10);
      if (cantidad > 0) {
        agregarAlCarrito(producto, cantidad);
        Swal.fire("¡Agregado al carrito!", "Tu producto fue agregado al carrito.", "success");
        cantidadInput.value = "0"; 
      }
    });

    productoDiv.appendChild(imagen);
    productoDiv.appendChild(nombre);
    productoDiv.appendChild(precio);
    productoDiv.appendChild(cantidadInput);
    productoDiv.appendChild(botonAgregar);

    productosContainer.appendChild(productoDiv);
  });
}

const carrito = [];

function agregarAlCarrito(producto, cantidad) {
  carrito.push({ producto, cantidad });
}

function procesarCompra() {
  let montoTotal = 0;

  carrito.forEach(({ producto, cantidad }) => {
    const montoProducto = producto.precio * cantidad;
    montoTotal += montoProducto;
  });

  if (carrito.length === 0) {
    Swal.fire("Carrito vacío", "Agrega productos al carrito antes de procesar la compra.", "warning");
    return;
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  window.location.href = `carrito.html?total=${montoTotal}`;
}

const procesarCompraButton = document.getElementById("procesar-compra-button");

async function cargarProductosYProcesarCompra() {
  try {
    const productos = await obtenerProductos();
    mostrarProductos(productos);
    procesarCompraButton.addEventListener("click", procesarCompra);
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
}

cargarProductosYProcesarCompra();
