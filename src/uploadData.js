import { db } from "./firebase"
import { collection, getDocs, getDoc, doc, query, where, addDoc, writeBatch, Timestamp } from "firebase/firestore"

// Obtener todas las categorías desde Firebase
export const getCategories = async () => {
  try {
    const categoriesRef = collection(db, "categories")
    const snapshot = await getDocs(categoriesRef)
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return categories
  } catch (error) {
    console.error("Error al obtener categorías:", error)
    return []
  }
}

// Obtener todos los productos desde Firebase
export const getProducts = async () => {
  try {
    const productsRef = collection(db, "products")
    const snapshot = await getDocs(productsRef)
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return products
  } catch (error) {
    console.error("Error al obtener productos:", error)
    return []
  }
}

// Obtener productos por categoría
export const getProductsByCategory = async (categoryId) => {
  try {
    if (categoryId === "todos") {
      return await getProducts()
    }
    const productsRef = collection(db, "products")
    const q = query(productsRef, where("category", "==", categoryId))
    const snapshot = await getDocs(q)
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return products
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error)
    return []
  }
}

// Obtener un producto por ID
export const getProductById = async (id) => {
  try {
    const productRef = doc(db, "products", id)
    const snapshot = await getDoc(productRef)
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() }
    }
    return null
  } catch (error) {
    console.error("Error al obtener producto:", error)
    return null
  }
}

export const createOrder = async (orderData) => {
  try {
    const ordersRef = collection(db, "orders")
    const docRef = await addDoc(ordersRef, {
      ...orderData,
      date: Timestamp.now(),
      status: "generada",
    })
    return { success: true, orderId: docRef.id }
  } catch (error) {
    console.error("Error al crear orden:", error)
    return { success: false, error: error.message }
  }
}

export const updateStock = async (items) => {
  try {
    const batch = writeBatch(db)

    for (const item of items) {
      const productRef = doc(db, "products", item.id)
      const productSnap = await getDoc(productRef)

      if (productSnap.exists()) {
        const currentStock = productSnap.data().stock
        const newStock = currentStock - item.quantity

        if (newStock < 0) {
          throw new Error(`Stock insuficiente para ${item.name}`)
        }

        batch.update(productRef, { stock: newStock })
      }
    }

    await batch.commit()
    return { success: true }
  } catch (error) {
    console.error("Error al actualizar stock:", error)
    return { success: false, error: error.message }
  }
}

export const checkStock = async (items) => {
  try {
    const stockErrors = []

    for (const item of items) {
      const productRef = doc(db, "products", item.id)
      const productSnap = await getDoc(productRef)

      if (productSnap.exists()) {
        const currentStock = productSnap.data().stock
        if (item.quantity > currentStock) {
          stockErrors.push({
            name: item.name,
            requested: item.quantity,
            available: currentStock,
          })
        }
      }
    }

    return {
      success: stockErrors.length === 0,
      errors: stockErrors,
    }
  } catch (error) {
    console.error("Error al verificar stock:", error)
    return { success: false, errors: [{ name: "Error", message: error.message }] }
  }
}
