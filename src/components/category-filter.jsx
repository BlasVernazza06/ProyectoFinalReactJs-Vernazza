"use client"

import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { getCategories } from "../uploadData"

export default function CategoryFilter() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data)
      })
      .catch((error) => {
        console.error("Error cargando categorías:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="mb-10 flex flex-wrap gap-3">
        <div className="h-12 w-24 bg-stone-800/50 rounded-full animate-shimmer" />
        <div className="h-12 w-32 bg-stone-800/50 rounded-full animate-shimmer" />
        <div className="h-12 w-28 bg-stone-800/50 rounded-full animate-shimmer" />
      </div>
    )
  }

  return (
    <div className="mb-10 flex flex-wrap gap-3">
      <NavLink
        to="/productos"
        end
        className={({ isActive }) =>
          `px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            isActive
              ? "bg-gradient-to-r from-amber-400 to-amber-500 text-stone-900 shadow-lg shadow-amber-500/25"
              : "bg-stone-800/50 text-stone-400 hover:text-stone-100 hover:bg-stone-800 border border-stone-700/50 hover:border-stone-600"
          }`
        }
      >
        Todos
      </NavLink>
      {categories
        .filter((cat) => cat.id !== "todos")
        .map((category) => (
          <NavLink
            key={category.id}
            to={`/categoria/${category.id}`}
            className={({ isActive }) =>
              `px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-amber-400 to-amber-500 text-stone-900 shadow-lg shadow-amber-500/25"
                  : "bg-stone-800/50 text-stone-400 hover:text-stone-100 hover:bg-stone-800 border border-stone-700/50 hover:border-stone-600"
              }`
            }
          >
            {category.name}
          </NavLink>
        ))}
    </div>
  )
}
