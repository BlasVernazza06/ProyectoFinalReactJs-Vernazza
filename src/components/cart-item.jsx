"use client"

import { Trash2, Plus, Minus } from "lucide-react"

export default function CartItem({ item, index, onRemove, onUpdateQuantity }) {
  return (
    <div
      className="flex gap-5 p-5 bg-stone-900/50 rounded-2xl border border-stone-800/50 hover:border-stone-700/50 transition-colors animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-stone-800 flex-shrink-0">
        <img
          src={item.image || "/placeholder.svg?height=112&width=112&query=coffee"}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-lg text-stone-100 truncate">{item.name}</h3>
        <p className="text-stone-500 text-sm mt-1">
          {item.origin} · {item.roast}
        </p>
        <p className="text-stone-400 text-sm mt-1">${item.price.toFixed(2)} c/u</p>

        <div className="flex items-center gap-2 mt-4">
          <div className="flex items-center bg-stone-800/50 rounded-xl border border-stone-700/50 p-0.5">
            <button
              onClick={() => item.quantity > 1 && onUpdateQuantity(item, -1)}
              className="p-2 hover:bg-stone-700/50 rounded-lg transition-colors disabled:opacity-50"
              disabled={item.quantity <= 1}
              aria-label="Disminuir cantidad"
            >
              <Minus className="h-3 w-3 text-stone-400" />
            </button>
            <span className="text-stone-100 font-medium w-10 text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item, 1)}
              className="p-2 hover:bg-stone-700/50 rounded-lg transition-colors"
              aria-label="Aumentar cantidad"
            >
              <Plus className="h-3 w-3 text-stone-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="text-right flex flex-col justify-between">
        <p className="font-bold text-xl gradient-text">${(item.price * item.quantity).toFixed(2)}</p>
        <button
          onClick={() => onRemove(item.id)}
          className="p-3 text-stone-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all self-end"
          aria-label="Eliminar producto"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
