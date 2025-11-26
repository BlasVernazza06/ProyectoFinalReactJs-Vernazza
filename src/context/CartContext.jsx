"use client"

import { createContext, useContext, useState } from "react"

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (item, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((prod) => prod.id === item.id)

      if (existingItem) {
        return prevCart.map((prod) => (prod.id === item.id ? { ...prod, quantity: prod.quantity + quantity } : prod))
      }

      return [...prevCart, { ...item, quantity }]
    })
  }

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((prod) => prod.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalItems = () => {
    return cart.reduce((acc, prod) => acc + prod.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((acc, prod) => acc + prod.quantity * prod.price, 0)
  }

  const isInCart = (id) => cart.some((prod) => prod.id === id)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
