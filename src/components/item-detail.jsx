"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Check, Star, MapPin, Flame, ShoppingBag } from "lucide-react"
import { useCart } from "../context/CartContext"
import ItemCount from "./item-count"

export default function ItemDetail({ product }) {
  const [addedToCart, setAddedToCart] = useState(false)
  const { addToCart, isInCart } = useCart()

  const handleAdd = (quantity) => {
    addToCart(product, quantity)
    setAddedToCart(true)
  }

  return (
    <div className="animate-fade-in">
      <Link
        to="/productos"
        className="inline-flex items-center gap-2 text-stone-400 hover:text-amber-400 mb-8 transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Volver a productos
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden bg-stone-900 border border-stone-800/50">
            <img
              src={product.image || "/placeholder.svg?height=600&width=600&query=premium coffee bag"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating badges */}
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <span className="px-4 py-2 bg-stone-900/90 backdrop-blur-sm text-amber-400 rounded-full text-sm font-medium border border-amber-500/30 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {product.origin}
            </span>
          </div>

          {product.stock === 0 && (
            <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm rounded-3xl flex items-center justify-center">
              <span className="px-6 py-3 bg-red-500/20 text-red-400 rounded-full text-lg font-bold border border-red-500/30">
                Sin Stock
              </span>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="flex flex-col">
          {/* Tags */}
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-2 bg-amber-500/10 text-amber-400 rounded-full text-sm font-medium border border-amber-500/30 flex items-center gap-2">
              <Flame className="w-4 h-4" />
              Tostado {product.roast}
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400/50" />
              <span className="text-stone-500 text-sm ml-2">(4.8)</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-stone-100 mb-6">{product.name}</h1>

          <p className="text-stone-400 text-lg mb-8 leading-relaxed">{product.description}</p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-5xl font-bold gradient-text">${product.price.toFixed(2)}</span>
            <span className="text-stone-500">/ 250g</span>
          </div>

          {addedToCart || isInCart(product.id) ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-semibold text-lg bg-green-500/20 text-green-400 border border-green-500/30">
                <Check className="h-6 w-6" />
                Producto agregado al carrito
              </div>
              <Link
                to="/carrito"
                className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-semibold text-lg cursor-pointer bg-amber-400 text-stone-900"
              >
                <ShoppingBag className="h-6 w-6" />
                Ir al carrito
              </Link>
            </div>
          ) : (
            <ItemCount stock={product.stock} initial={1} onAdd={handleAdd} />
          )}

          {/* Product details */}
          <div className="mt-10 pt-8 border-t border-stone-800/50">
            <h3 className="text-lg font-semibold text-stone-100 mb-4">Caracteristicas</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-stone-800/30 border border-stone-700/50">
                <span className="text-stone-500 text-sm">Origen</span>
                <p className="text-stone-100 font-medium mt-1">{product.origin}</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-800/30 border border-stone-700/50">
                <span className="text-stone-500 text-sm">Tostado</span>
                <p className="text-stone-100 font-medium mt-1">{product.roast}</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-800/30 border border-stone-700/50">
                <span className="text-stone-500 text-sm">Categoria</span>
                <p className="text-stone-100 font-medium mt-1 capitalize">{product.category}</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-800/30 border border-stone-700/50">
                <span className="text-stone-500 text-sm">Stock</span>
                <p className={`font-medium mt-1 ${product.stock > 0 ? "text-stone-100" : "text-red-400"}`}>
                  {product.stock > 0 ? `${product.stock} unidades` : "Agotado"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
