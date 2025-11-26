import { Link } from "react-router-dom"

export default function ItemCard({ product }) {
  return (
    <Link
      to={`/producto/${product.id}`}
      className="group bg-stone-800 rounded-xl overflow-hidden border border-stone-700 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
    >
      <div className="aspect-square overflow-hidden bg-stone-900">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded-full">{product.origin}</span>
          <span className="text-xs px-2 py-1 bg-stone-700 text-stone-300 rounded-full">{product.roast}</span>
        </div>
        <h3 className="font-semibold text-stone-100 mb-1 group-hover:text-amber-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-stone-400 text-sm line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-amber-400">${product.price.toFixed(2)}</span>
          <span className="text-xs text-stone-500">Stock: {product.stock}</span>
        </div>
      </div>
    </Link>
  )
}
