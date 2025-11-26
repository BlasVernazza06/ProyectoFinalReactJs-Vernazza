"use client"

import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import { useCart } from "../context/CartContext"

export default function CartWidget() {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <Link
      to="/carrito"
      className="relative group p-3 rounded-full bg-stone-800/50 border border-stone-700/50 hover:border-amber-500/50 transition-all duration-300"
      aria-label={`Carrito con ${totalItems} productos`}
    >
      <ShoppingCart className="h-5 w-5 text-stone-300 group-hover:text-amber-400 transition-colors" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-gradient-to-br from-amber-400 to-amber-600 text-stone-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg shadow-amber-500/30 animate-pulse-glow">
          {totalItems}
        </span>
      )}
    </Link>
  )
}
