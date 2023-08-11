class Producto {
  constructor(nombre, precio, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }
}

const productos = [
  new Producto("Alfajor Fulbito de Mani", 50, "img/alfajor.webp"),
  new Producto("Caramelo Butter Toffee", 15, "img/caramelos.jpg"),
  new Producto("Gomitas ácidas Mogul", 345, "img/gomitas.webp"),
  new Producto("Shot chocolate", 400, "img/chocolates.jpg"),
  new Producto("Monster bebida energizante", 800, "img/bebidaenergizante.webp"),
  new Producto("Agua", 250, "img/agua.webp"),
  new Producto("Coca Cola", 750, "img/gaseosa.webp"),
  new Producto("Aquarius", 520, "img/jugos.webp"),
  new Producto("Marlboro", 710, "img/marlboro.png"),
  new Producto("Camel", 810, "img/camel.jpg"),
  new Producto("Chesterfield", 590, "img/chesterfield.jpg"),
  new Producto("Lucky Strike", 720, "img/luckystrike.jpg")
 
];

function mostrarProductos() {
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
procesarCompraButton.addEventListener("click", procesarCompra);

mostrarProductos();
