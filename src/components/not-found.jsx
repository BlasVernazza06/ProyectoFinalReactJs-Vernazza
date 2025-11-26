import { Link } from "react-router-dom"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold text-amber-400 mb-4">404</h1>
      <p className="text-xl text-stone-100 mb-2">Página no encontrada</p>
      <p className="text-stone-400 mb-8">La página que buscas no existe</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-900 font-semibold px-6 py-3 rounded-lg transition-colors"
      >
        <Home className="h-5 w-5" />
        Volver al inicio
      </Link>
    </div>
  )
}
