const PRODUCTOS_STORAGE_KEY = "productos";

const productosIniciales = [
  { nombre: "Pollo a la Brasa", categoria: "Pollo", precio: 25, estado: true },
  { nombre: "Papas Fritas", categoria: "Papas", precio: 10, estado: true },
  { nombre: "Coca Cola", categoria: "Bebidas", precio: 5, estado: true }
];

let productos = cargarProductos();
let editIndex = -1;
let productoModal;

function cargarProductos() {
  const productosGuardados = localStorage.getItem(PRODUCTOS_STORAGE_KEY);

  if (!productosGuardados) {
    return productosIniciales;
  }

  try {
    return JSON.parse(productosGuardados);
  } catch {
    return productosIniciales;
  }
}

function guardarProductosEnStorage() {
  localStorage.setItem(PRODUCTOS_STORAGE_KEY, JSON.stringify(productos));
}

function initModal() {
  const modalEl = document.getElementById("productoModal");

  if (modalEl && window.bootstrap) {
    productoModal = new bootstrap.Modal(modalEl);
  }
}

function crearCelda(texto) {
  const celda = document.createElement("td");
  celda.textContent = texto;
  return celda;
}

function crearBadgeEstado(estado) {
  const badge = document.createElement("span");
  badge.className = estado ? "badge bg-success" : "badge bg-secondary";
  badge.textContent = estado ? "Activo" : "Inactivo";
  return badge;
}

function crearBoton(texto, clases, accion, index) {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = clases;
  boton.textContent = texto;
  boton.dataset.accion = accion;
  boton.dataset.index = index;
  return boton;
}

function mostrarProductos() {
  const tabla = document.getElementById("tablaProductos");
  tabla.innerHTML = "";

  productos.forEach((producto, index) => {
    const fila = document.createElement("tr");
    const celdaEstado = document.createElement("td");
    const celdaAccion = document.createElement("td");

    celdaEstado.appendChild(crearBadgeEstado(producto.estado));
    celdaAccion.appendChild(crearBoton("Editar", "btn btn-warning btn-sm me-1", "editar", index));
    celdaAccion.appendChild(crearBoton("Eliminar", "btn btn-danger btn-sm", "eliminar", index));

    fila.appendChild(crearCelda(producto.nombre));
    fila.appendChild(crearCelda(producto.categoria));
    fila.appendChild(crearCelda(`S/ ${Number(producto.precio).toFixed(2)}`));
    fila.appendChild(celdaEstado);
    fila.appendChild(celdaAccion);
    tabla.appendChild(fila);
  });
}

function abrirModalProducto() {
  editIndex = -1;
  document.getElementById("productoModalLabel").textContent = "Crear producto";
  document.getElementById("formProducto").reset();
  document.getElementById("modalCategoria").value = "pollo";
  document.getElementById("modalEstado").checked = true;
  productoModal.show();
}

function obtenerNombreCategoria(categoria) {
  const categorias = {
    pollo: "Pollo",
    papas: "Papas",
    bebidas: "Bebidas"
  };

  return categorias[categoria] || "Bebidas";
}

function guardarProducto(event) {
  event.preventDefault();

  const nombre = document.getElementById("modalNombre").value.trim();
  const categoria = document.getElementById("modalCategoria").value;
  const precio = parseFloat(document.getElementById("modalPrecio").value);
  const estado = document.getElementById("modalEstado").checked;

  if (nombre === "" || Number.isNaN(precio) || precio <= 0) {
    alert("Ingrese un nombre y un precio mayor a cero");
    return;
  }

  const producto = {
    nombre,
    categoria: obtenerNombreCategoria(categoria),
    precio,
    estado
  };

  if (editIndex === -1) {
    productos.push(producto);
  } else {
    productos[editIndex] = producto;
    editIndex = -1;
  }

  guardarProductosEnStorage();
  mostrarProductos();
  productoModal.hide();
}

function editarProducto(index) {
  const producto = productos[index];

  if (!producto) {
    return;
  }

  editIndex = index;
  document.getElementById("productoModalLabel").textContent = "Editar producto";
  document.getElementById("modalNombre").value = producto.nombre;
  document.getElementById("modalCategoria").value = producto.categoria.toLowerCase();
  document.getElementById("modalPrecio").value = producto.precio;
  document.getElementById("modalEstado").checked = producto.estado;
  productoModal.show();
}

function eliminarProducto(index) {
  const producto = productos[index];

  if (!producto) {
    return;
  }

  const confirmarEliminacion = confirm(`¿Seguro que deseas eliminar "${producto.nombre}"?`);

  if (!confirmarEliminacion) {
    return;
  }

  productos.splice(index, 1);
  guardarProductosEnStorage();
  mostrarProductos();
}

function manejarAccionesTabla(event) {
  const boton = event.target.closest("button[data-accion]");

  if (!boton) {
    return;
  }

  const index = Number(boton.dataset.index);

  if (boton.dataset.accion === "editar") {
    editarProducto(index);
  }

  if (boton.dataset.accion === "eliminar") {
    eliminarProducto(index);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initModal();
  mostrarProductos();

  document.getElementById("btnNuevoProducto").addEventListener("click", abrirModalProducto);
  document.getElementById("formProducto").addEventListener("submit", guardarProducto);
  document.getElementById("tablaProductos").addEventListener("click", manejarAccionesTabla);
});
