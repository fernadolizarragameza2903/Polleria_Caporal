let pedidoActual = [];

function renderizarProductosParaEmpleados() {
    const tabla = document.getElementById("tablaVentaEmpleados");
    if(!tabla) return;
    
    tabla.innerHTML = "";

    productos.forEach((p, index) => {
        tabla.innerHTML += `
            <tr>
                <td>
                    <span class="fw-bold">${p.nombre}</span><br>
                    <small class="text-muted">${p.categoria}</small>
                </td>
                <td>S/ ${p.precio.toFixed(2)}</td>
                <td>
                    <input type="number" id="cant-${index}" class="form-control form-control-sm" value="1" min="1">
                </td>
                <td>
                    <button class="btn btn-sm text-white" style="background-color: #ff8c00;" onclick="agregarAlTicket(${index})">
                        <i class="bi bi-plus-lg"></i> Agregar
                    </button>
                </td>
            </tr>
        `;
    });
}

// 2. Agregar al carrito/ticket
window.agregarAlTicket = function(index) {
    const cantidadInput = document.getElementById(`cant-${index}`);
    const cantidad = parseInt(cantidadInput.value);
    const prodSeleccionado = productos[index];

    const existente = pedidoActual.find(item => item.nombre === prodSeleccionado.nombre);

    if (existente) {
        existente.cantidad += cantidad;
        existente.subtotal = existente.cantidad * existente.precio;
    } else {
        pedidoActual.push({
            nombre: prodSeleccionado.nombre,
            precio: prodSeleccionado.precio,
            cantidad: cantidad,
            subtotal: prodSeleccionado.precio * cantidad
        });
    }
    
    cantidadInput.value = 1; // Resetear input
    actualizarPanelDerecho();
};

// 3. Actualizar resumen visual
function actualizarPanelDerecho() {
    const contenedor = document.getElementById("resumenPedido");
    const totalTxt = document.getElementById("totalPagar");
    let totalAcumulado = 0;

    if (pedidoActual.length === 0) {
        contenedor.innerHTML = '<p class="text-muted text-center py-5">No hay productos seleccionados</p>';
        totalTxt.innerText = "S/ 0.00";
        return;
    }

    contenedor.innerHTML = "";
    pedidoActual.forEach((item) => {
        totalAcumulado += item.subtotal;
        contenedor.innerHTML += `
            <div class="d-flex justify-content-between align-items-center mb-2 bg-white p-2 rounded shadow-sm border-start border-warning border-4">
                <div>
                    <span class="badge bg-dark">${item.cantidad}</span>
                    <span class="ms-1 fw-semibold">${item.nombre}</span>
                </div>
                <span class="fw-bold text-success">S/ ${item.subtotal.toFixed(2)}</span>
            </div>
        `;
    });

    totalTxt.innerText = `S/ ${totalAcumulado.toFixed(2)}`;
}

// 4. Procesar el pedido
window.procesarPedidoFinal = function() {
    const cliente = document.getElementById("nombreCliente").value;

    if (!cliente.trim()) {
        alert("⚠️ Por favor, ingresa el nombre del cliente.");
        return;
    }

    if (pedidoActual.length === 0) {
        alert("⚠️ Selecciona al menos un producto.");
        return;
    }

    let detalle = pedidoActual.map(p => `${p.cantidad}x ${p.nombre}`).join("\n");
    let monto = document.getElementById("totalPagar").innerText;

    alert(`✅ ¡PEDIDO REALIZADO!\n\nCliente: ${cliente}\n\nDetalle:\n${detalle}\n\nTOTAL: ${monto}`);

    // Limpiar
    pedidoActual = [];
    document.getElementById("nombreCliente").value = "";
    actualizarPanelDerecho();
};

// Carga inicial
document.addEventListener("DOMContentLoaded", renderizarProductosParaEmpleados);
