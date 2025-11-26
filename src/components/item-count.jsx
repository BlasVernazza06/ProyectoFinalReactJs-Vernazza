"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingCart } from "lucide-react"

export default function ItemCount({ stock, initial = 1, onAdd }) {
  const [count, setCount] = useState(initial)

  const increment = () => {
    if (count < stock) {
      setCount(count + 1)
    }
  }

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  const handleAdd = () => {
    if (count > 0 && count <= stock) {
      onAdd(count)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6">
        <span className="text-stone-400 font-medium">Cantidad:</span>
        <div className="flex items-center gap-1 bg-stone-800/50 rounded-2xl border border-stone-700/50 p-1">
          <button
            onClick={decrement}
            className="p-3 hover:bg-stone-700/50 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={count <= 1}
            aria-label="Disminuir cantidad"
          >
            <Minus className="h-4 w-4 text-stone-300" />
          </button>
          <span className="text-xl font-semibold text-stone-100 w-16 text-center">{count}</span>
          <button
            onClick={increment}
            className="p-3 hover:bg-stone-700/50 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={count >= stock}
            aria-label="Aumentar cantidad"
          >
            <Plus className="h-4 w-4 text-stone-300" />
          </button>
        </div>
        <span className="text-sm text-stone-500">({stock} disponibles)</span>
      </div>

      {stock === 0 ? (
        <div className="w-full py-5 rounded-2xl font-semibold text-lg bg-stone-800/50 text-stone-500 text-center border border-stone-700/50">
          Sin stock disponible
        </div>
      ) : (
        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-semibold text-lg cursor-pointer bg-amber-400 text-stone-900 transition-all duration-300"
        >
          <ShoppingCart className="h-6 w-6" />
          Agregar al carrito
        </button>
      )}
    </div>
  )
}
