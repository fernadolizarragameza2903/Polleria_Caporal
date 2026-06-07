# 🍗 Pollería Caporal - Catálogo Digital

Bienvenido al catálogo digital de **Pollería Caporal**. Esta es una plataforma web moderna y responsiva donde los clientes pueden ver todos tus productos, armar su pedido y contactarte fácilmente por WhatsApp o llamada telefónica.

---

## 📋 Características

✅ **Catálogo Completo** - 38 productos organizados en 7 categorías  
✅ **Sistema de Búsqueda** - Busca productos por nombre o categoría  
✅ **Filtros por Categoría** - Pollos, Combos, Acompañamientos, Chifa, Bebidas y Postres  
✅ **Carrito de Compras** - Los clientes pueden agregar/quitar productos  
✅ **Integración WhatsApp** - Envía el pedido formateado directamente a WhatsApp  
✅ **Llamada Telefónica** - Link directo para llamar  
✅ **Diseño Responsivo** - Funciona perfecto en móvil, tablet y computadora  
✅ **Sin Backend** - Todo funciona en el navegador, no necesita servidor  

---

## 🚀 Cómo Usar

### **1. Abrir la Página**
- Abre `index.html` en tu navegador
- O sube los archivos a un servidor web (GitHub Pages, Netlify, etc.)

### **2. Para los Clientes**
1. Mira el catálogo de productos
2. Filtra por categoría o busca lo que quieres
3. Agrega productos a tu pedido
4. Ajusta las cantidades (+/-)
5. Haz clic en **"Pedir por WhatsApp"** o **"Llamar"**
6. ¡Listo! El pedido se envía formateado

---

## ⚙️ Cómo Personalizar

### **Cambiar Número de WhatsApp y Teléfono**

Abre `index.html` y busca estas líneas (aproximadamente línea 170):

```javascript
const WHATSAPP = "51904472592";
const TELEFONO = "+51904472592";
```

Reemplaza con tu número:
```javascript
const WHATSAPP = "51987654321";      // Sin el +
const TELEFONO = "+51987654321";     // Con el +
```

También cambia los links en el header (línea 15-22):
```html
<a href="https://wa.me/51904472592" ...>WhatsApp</a>
<a href="tel:+51904472592" ...>Llamar</a>
```

### **Agregar o Modificar Productos**

Abre `index.html` y localiza el array `productos` (alrededor de línea 92):

**Para AGREGAR un producto:**
```javascript
{ id: 39, nombre: "Tu nuevo producto", precio: 25.00, categoria: "Pollos", emoji: "🍗" }
```

Asegúrate de:
- Usar un **ID único** (40, 41, 42...)
- Elegir el **emoji** correcto
- Seleccionar la **categoría** existente

**Para MODIFICAR un producto:**
```javascript
// Cambiar antes:
{ id: 1, nombre: "Pollo a la brasa (1/2 kg)", precio: 25.00, categoria: "Pollos", emoji: "🍗" }

// Cambiar después:
{ id: 1, nombre: "Pollo a la brasa (1/2 kg)", precio: 27.00, categoria: "Pollos", emoji: "🍗" }
```

**Para ELIMINAR un producto:**
Solo borra la línea completa del producto que no quieras.

### **Agregar una Nueva Categoría**

1. Agrega el botón en el HTML (línea 54):
```html
<button class="filter-btn" data-category="MiNuevaCategoria">Mi Nueva Categoría</button>
```

2. Agrega productos con esa categoría en el array `productos`:
```javascript
{ id: X, nombre: "Producto", precio: 20.00, categoria: "MiNuevaCategoria", emoji: "🥘" }
```

### **Cambiar Colores de la Página**

Abre `css/styles.css` y modifica el inicio (línea 2-11):

```css
:root {
    --primary-color: #DC143C;      /* Rojo - cambia aquí */
    --secondary-color: #FFD700;    /* Oro - cambia aquí */
    --dark-color: #1a1a1a;
    --light-color: #f5f5f5;
    /* ... más variables */
}
```

**Colores populares:**
- Rojo: `#DC143C`, `#E63946`, `#C41E3A`
- Oro: `#FFD700`, `#FFC700`, `#DAA520`
- Verde: `#25D366`, `#22C55E`
- Azul: `#3B82F6`, `#0EA5E9`

---

## 📁 Estructura de Archivos

```
Polleria_Caporal/
├── index.html              ← ARCHIVO PRINCIPAL (catálogo y lógica)
├── css/
│   └── styles.css         ← ESTILOS (colores, diseño, animaciones)
└── README.md              ← ESTE ARCHIVO
```

**Nota:** No necesitas archivos JavaScript separados, todo está dentro de `index.html`.

---

## 🌐 Cómo Desplegar (Poner Online)

### **Opción 1: GitHub Pages (GRATIS y FÁCIL)**

1. Sube los archivos a GitHub (ya está hecho ✅)
2. Ve a Settings → Pages
3. Selecciona `main` como rama
4. ¡Listo! Tu sitio estará en: `https://fernadolizarragameza2903.github.io/Polleria_Caporal`

### **Opción 2: Netlify (GRATIS)**

1. Ve a [netlify.com](https://netlify.com)
2. Arrastra la carpeta del proyecto
3. ¡Listo! Tu sitio estará online en minutos

### **Opción 3: Servidor Propio**

Solo sube los 3 archivos a tu servidor web y accede por HTTP/HTTPS.

---

## 💡 Ejemplo de Pedido por WhatsApp

Cuando un cliente hace clic en **"Pedir por WhatsApp"**, se abre WhatsApp con un mensaje como este:

```
🍗 *PEDIDO POLLERÍA CAPORAL* 🍗

🍗 Pollo a la brasa (1 kg)
   Cantidad: 2 x S/. 45.00 = S/. 90.00

🥔 Papas a la huancaína
   Cantidad: 1 x S/. 15.00 = S/. 15.00

🥤 Gaseosa 3 L
   Cantidad: 1 x S/. 12.00 = S/. 12.00

━━━━━━━━━━━━━━━━━━━━━
💰 *TOTAL: S/. 117.00*
━━━━━━━━━━━━━━━━━━━━━

Por favor, confirmar disponibilidad y método de entrega.
```

---

## 🛠️ Solución de Problemas

### **Los productos no aparecen**
- Verifica que `index.html` esté en la carpeta raíz
- Verifica que `css/styles.css` exista en la carpeta `css/`
- Abre la consola del navegador (F12) y busca errores

### **WhatsApp no funciona**
- Verifica que el número esté en formato correcto: `51XXXXXXXXX` (sin +)
- Asegúrate de que el teléfono tenga WhatsApp instalado

### **Los estilos se ven mal**
- Limpia el caché del navegador (Ctrl+Shift+Delete)
- Verifica que la ruta a `styles.css` sea correcta
- Intenta en otro navegador

### **Carrito no se actualiza**
- Abre F12 para ver si hay errores en la consola
- Verifica que los IDs de productos sean únicos

---

## 📞 Información Actual

**Pollería Caporal**
- 📱 WhatsApp: +51904472592
- ☎️ Teléfono: +51904472592
- 📍 [Agregar dirección aquí]
- 🕐 [Agregar horario aquí]

---

## 📝 Próximas Mejoras Posibles

- 🗺️ Google Maps integrado
- 📦 Sistema de pago en línea
- 📊 Panel administrativo para gestionar órdenes
- 🔐 Autenticación de usuarios
- 📧 Confirmación de pedidos por email
- 🎯 Ofertas y descuentos especiales

---

## ⚡ Consejos de Marketing

1. **Comparte el link** en redes sociales
2. **Agrega el catálogo** a tu bio de Instagram
3. **Crea un código QR** que apunte a tu catálogo
4. **Promociona** "Pide ahora desde nuestro catálogo online"
5. **Mantén actualizado** el catálogo con nuevos productos

---

## 💻 Hecho con ❤️ para Pollería Caporal

**Fecha de creación:** Junio 2026  
**Última actualización:** 2026-06-07

---

¿Preguntas o cambios? Edita este archivo directamente en GitHub o contacta al desarrollador.

Happy selling! 🍗✨