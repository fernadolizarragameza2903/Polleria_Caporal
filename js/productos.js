let productos = [
  {nombre: "Pollo a la Brasa", categoria: "Pollo", precio: 25},
  {nombre: "Papas Fritas", categoria: "Papas", precio: 10},
  {nombre: "Coca Cola", categoria: "Bebidas", precio: 5}
];

let editIndex = -1;

function mostrarProductos() {
  let tabla = document.getElementById("tablaProductos");
  tabla.innerHTML = "";

  productos.forEach((p, index) => {
    tabla.innerHTML += `
      <tr>
        <td>${p.nombre}</td>
        <td>${p.categoria}</td>
        <td>S/ ${p.precio}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editarProducto(${index})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function agregarProducto() {
  let nombre = document.getElementById("nombre").value;
  let categoria = document.getElementById("categoria").value;
  let precio = parseFloat(document.getElementById("precio").value);

  if (nombre === "" || isNaN(precio)) {
    alert("Ingrese nombre y precio válido");
    return;
  }

  if (editIndex === -1) {
    productos.push({
      nombre: nombre,
      categoria: categoria === "pollo" ? "Pollo" : categoria === "papas" ? "Papas" : "Bebidas",
      precio: precio
    });
  } else {
    productos[editIndex] = {
      nombre: nombre,
      categoria: categoria === "pollo" ? "Pollo" : categoria === "papas" ? "Papas" : "Bebidas",
      precio: precio
    };
    editIndex = -1;
    document.querySelector("button[onclick='agregarProducto()']").textContent = "+ Agregar";
  }

  mostrarProductos();
  limpiarFormulario();
}

function editarProducto(index) {
  let p = productos[index];
  document.getElementById("nombre").value = p.nombre;
  document.getElementById("categoria").value = p.categoria.toLowerCase();
  document.getElementById("precio").value = p.precio;
  editIndex = index;
  document.querySelector("button[onclick='agregarProducto()']").textContent = "Actualizar";
}

function eliminarProducto(index) {
  productos.splice(index, 1);
  mostrarProductos();
}

function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("categoria").selectedIndex = 0;
}

mostrarProductos();