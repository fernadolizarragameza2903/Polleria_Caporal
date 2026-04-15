let productos = [
  { nombre: "Pollo a la Brasa", categoria: "Pollo", precio: 25, estado: true },
  { nombre: "Papas Fritas", categoria: "Papas", precio: 10, estado: true },
  { nombre: "Coca Cola", categoria: "Bebidas", precio: 5, estado: true }
];

let editIndex = -1;
let productoModal;

function initModal() {
  const modalEl = document.getElementById("productoModal");
  if (modalEl) {
    productoModal = new bootstrap.Modal(modalEl);
  }
}

function mostrarProductos() {
  let tabla = document.getElementById("tablaProductos");
  tabla.innerHTML = "";

  productos.forEach((p, index) => {
    const estadoBadge = p.estado
      ? '<span class="badge bg-success">Activo</span>'
      : '<span class="badge bg-secondary">Inactivo</span>';

    tabla.innerHTML += `
      <tr>
        <td>${p.nombre}</td>
        <td>${p.categoria}</td>
        <td>S/ ${p.precio.toFixed(2)}</td>
        <td>${estadoBadge}</td>
        <td>
          <button class="btn btn-warning btn-sm me-1" onclick="editarProducto(${index})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
        </td>
      </tr>
    `;
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

function guardarProducto(event) {
  event.preventDefault();

  let nombre = document.getElementById("modalNombre").value.trim();
  let categoria = document.getElementById("modalCategoria").value;
  let precio = parseFloat(document.getElementById("modalPrecio").value);
  let estado = document.getElementById("modalEstado").checked;

  if (nombre === "" || isNaN(precio)) {
    alert("Ingrese nombre y precio válido");
    return;
  }

  const producto = {
    nombre,
    categoria: categoria === "pollo" ? "Pollo" : categoria === "papas" ? "Papas" : "Bebidas",
    precio,
    estado
  };

  if (editIndex === -1) {
    productos.push(producto);
  } else {
    productos[editIndex] = producto;
    editIndex = -1;
  }

  mostrarProductos();
  productoModal.hide();
}

function editarProducto(index) {
  const p = productos[index];
  editIndex = index;
  document.getElementById("productoModalLabel").textContent = "Editar producto";
  document.getElementById("modalNombre").value = p.nombre;
  document.getElementById("modalCategoria").value = p.categoria.toLowerCase();
  document.getElementById("modalPrecio").value = p.precio;
  document.getElementById("modalEstado").checked = p.estado;
  productoModal.show();
}

function eliminarProducto(index) {
  productos.splice(index, 1);
  mostrarProductos();
}

window.addEventListener("DOMContentLoaded", () => {
  initModal();
  mostrarProductos();
});
