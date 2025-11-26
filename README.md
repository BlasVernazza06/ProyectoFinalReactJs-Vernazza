# Café Origen - E-Commerce de Café Premium

## Descripción

Aplicación de e-commerce desarrollada con React y Vite para la venta de café premium. El proyecto implementa un carrito de compras completo con integración a Firebase/Firestore para la persistencia de datos, gestión de stock en tiempo real y generación de órdenes de compra.

## Tecnologías Utilizadas

- **React 18** - Biblioteca principal para la construcción de la UI
- **React Router DOM** - Navegación SPA con rutas dinámicas
- **Firebase/Firestore** - Base de datos en tiempo real para productos, categorías y órdenes
- **Vite** - Build tool y servidor de desarrollo
- **CSS3** - Estilos personalizados con animaciones y diseño responsive

## Estructura del Proyecto

\`\`\`
src/
├── components/
│   ├── cart.jsx                 # Vista del carrito de compras
│   ├── cart-item.jsx            # Item individual del carrito
│   ├── cart-widget.jsx          # Widget del carrito en navbar
│   ├── category-filter.jsx      # Filtro de categorías
│   ├── checkout-form.jsx        # Formulario de checkout
│   ├── home.jsx                 # Página de inicio
│   ├── item-card.jsx            # Card de producto
│   ├── item-count.jsx           # Selector de cantidad
│   ├── item-detail.jsx          # Detalle de producto
│   ├── item-detail-container.jsx # Container del detalle
│   ├── item-list.jsx            # Lista de productos
│   ├── itemlist-container.jsx   # Container de lista
│   ├── nav-bar.jsx              # Barra de navegación
│   └── not-found.jsx            # Página 404
├── context/
│   └── CartContext.jsx          # Context del carrito
├── firebase/
│   └── config.js                # Configuración de Firebase
├── services/
│   └── firebase.js              # Servicios de Firestore
├── App.jsx                      # Componente principal con rutas
├── main.jsx                     # Entry point
└── index.css                    # Estilos globales
\`\`\`

## Funcionalidades

### Navegación
- SPA con React Router
- Rutas dinámicas para categorías (`/category/:categoryId`) y productos (`/item/:itemId`)
- NavLinks con indicador visual de ruta activa
- Página 404 para rutas inexistentes

### Catálogo de Productos
- Listado de productos obtenidos de Firestore
- Filtrado por categoría usando `useParams`
- Vista de detalle de producto individual
- Información de stock, origen, tostado y precio

### Carrito de Compras
- **CartContext** con Provider para estado global
- Agregar productos con cantidad seleccionada
- **ItemCount** con validaciones de stock mínimo (1) y máximo (stock disponible)
- Modificar cantidad de items en el carrito
- Eliminar items individuales
- Vaciar carrito completo
- **CartWidget** muestra cantidad total de unidades
- Persistencia del carrito durante la sesión

### Proceso de Compra
- **CheckoutForm** con validación de campos:
  - Nombre completo
  - Teléfono
  - Email con confirmación
- Creación de orden en Firestore con:
  - Datos del comprador (buyer)
  - Items con id, nombre, precio y cantidad
  - Total de la compra
  - Fecha de creación
  - Estado de la orden
- **Actualización de stock** en Firebase al confirmar compra
- Visualización del ID de orden generado

### UI/UX
- Diseño responsive
- Animaciones y transiciones suaves
- Estados de carga (loading) con skeleton loaders
- Mensajes informativos (carrito vacío, sin stock, errores)
- Tema oscuro con paleta de colores cálidos

## Instalación

1. Clonar el repositorio:
\`\`\`bash
git clone <url-del-repositorio>
cd cafe-origen
\`\`\`

2. Instalar dependencias:
\`\`\`bash
npm install
\`\`\`

3. Configurar Firebase:
   - Crear proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Habilitar Firestore Database
   - Copiar las credenciales en `src/firebase/config.js`

4. Iniciar el servidor de desarrollo:
\`\`\`bash
npm run dev
\`\`\`

## Configuración de Firebase

### Estructura de Firestore

**Colección `categories`:**
\`\`\`json
{
  "id": "origen",
  "name": "Por Origen"
}
\`\`\`

**Colección `products`:**
\`\`\`json
{
  "id": "1",
  "name": "Café Colombiano Supremo",
  "description": "Un café suave y aromático...",
  "price": 18.99,
  "image": "/coffee.jpg",
  "category": "origen",
  "origin": "Colombia",
  "roast": "Medio",
  "stock": 25
}
\`\`\`

**Colección `orders`:**
\`\`\`json
{
  "buyer": {
    "name": "Juan Pérez",
    "phone": "123456789",
    "email": "juan@email.com"
  },
  "items": [
    {
      "id": "1",
      "name": "Café Colombiano Supremo",
      "price": 18.99,
      "quantity": 2
    }
  ],
  "total": 37.98,
  "date": "2024-01-15T10:30:00.000Z",
  "status": "generada"
}
\`\`\`

## Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Genera build de producción
- `npm run preview` - Vista previa del build

## Patrones Implementados

- **Container/Presentational Pattern**: Separación entre componentes contenedores (ItemListContainer, ItemDetailContainer) y presentacionales (ItemList, ItemDetail)
- **Context API**: Gestión de estado global para el carrito
- **Custom Hooks**: Uso de hooks de React (useState, useEffect, useContext, useParams)
- **Servicios**: Capa de servicios para interacción con Firebase

## Autor

Proyecto desarrollado como parte del curso de React.
