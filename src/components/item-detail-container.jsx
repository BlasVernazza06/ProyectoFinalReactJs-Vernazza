"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getProductById } from "../uploadData"
import ItemDetail from "./item-detail"
import { Loader2 } from "lucide-react"

export default function ItemDetailContainer() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!itemId) {
      navigate("/productos")
      return
    }

    setLoading(true)
    getProductById(itemId)
      .then((data) => {
        if (data) {
          setProduct(data)
        } else {
          navigate("/productos")
        }
      })
      .catch((error) => {
        console.error("Error al cargar producto:", error)
        navigate("/productos")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [itemId, navigate])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ItemDetail product={product} />
    </div>
  )
}
