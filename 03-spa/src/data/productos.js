// Datos locales para que el ejemplo no dependa de una API externa.
export const PRODUCTOS = [
  { id: 1, nombre: 'Kiwi verde', categoria: 'frutas', precio: 1990, descripcion: 'Kiwi clásico, ácido y jugoso.' },
  { id: 2, nombre: 'Kiwi dorado', categoria: 'frutas', precio: 2990, descripcion: 'Más dulce y con piel lisa.' },
  { id: 3, nombre: 'Mermelada de kiwi', categoria: 'despensa', precio: 3490, descripcion: 'Hecha con kiwis de temporada.' },
  { id: 4, nombre: 'Jugo de kiwi', categoria: 'bebidas', precio: 1490, descripcion: 'Natural, sin azúcar añadida.' },
  { id: 5, nombre: 'Kiwi deshidratado', categoria: 'despensa', precio: 2490, descripcion: 'Snack crujiente para llevar.' },
  { id: 6, nombre: 'Smoothie kiwi-plátano', categoria: 'bebidas', precio: 2290, descripcion: 'Batido cremoso y refrescante.' },
]

export const CATEGORIAS = [...new Set(PRODUCTOS.map((p) => p.categoria))]

export const buscarProducto = (id) => PRODUCTOS.find((p) => p.id === Number(id))

export const formatoPrecio = (valor) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor)
