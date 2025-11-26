"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingBag, ArrowLeft, Sparkles, CheckCircle, Copy, Check } from "lucide-react"
import { useCart } from "../context/CartContext"
import { createOrder, updateStock, checkStock } from "../uploadData"
import CheckoutForm from "./checkout-form"
import CartItem from "./cart-item"

export default function Cart() {
  const { cart, removeFromCart, clearCart, getTotalPrice, addToCart } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)
  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleCheckout = async (buyerData) => {
    setLoading(true)
    setError(null)

    try {
      // Verificar stock antes de procesar
      const stockCheck = await checkStock(cart)
      if (!stockCheck.success) {
        const errorMsg = stockCheck.errors
          .map((e) => `${e.name}: solicitaste ${e.requested}, disponible ${e.available}`)
          .join(". ")
        setError(`Stock insuficiente. ${errorMsg}`)
        setLoading(false)
        return
      }

      // Crear objeto de orden
      const order = {
        buyer: buyerData,
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: getTotalPrice(),
      }

      // Crear orden en Firebase
      const orderResult = await createOrder(order)
      if (!orderResult.success) {
        setError("Error al crear la orden. Intenta nuevamente.")
        setLoading(false)
        return
      }

      // Actualizar stock en Firebase
      const stockResult = await updateStock(cart)
      if (!stockResult.success) {
        setError("Orden creada pero hubo un error al actualizar el stock.")
      }

      // Exito
      setOrderId(orderResult.orderId)
      setOrderComplete(true)
      clearCart()
    } catch (err) {
      setError("Error inesperado. Por favor intenta nuevamente.", err)
    } finally {
      setLoading(false)
    }
  }

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (orderComplete && orderId) {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="max-w-md mx-auto">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl" />
            <CheckCircle className="relative h-24 w-24 mx-auto text-green-400" />
          </div>

          <h1 className="text-3xl font-bold text-stone-100 mb-4">Compra realizada con exito</h1>
          <p className="text-stone-400 mb-8 text-lg">Gracias por tu compra. Te enviamos los detalles a tu email.</p>

          <div className="bg-stone-900/50 rounded-2xl border border-stone-800/50 p-6 mb-8">
            <p className="text-stone-400 text-sm mb-2">Tu numero de orden:</p>
            <div className="flex items-center justify-center gap-3">
              <code className="text-amber-400 text-xl font-mono font-bold">{orderId}</code>
              <button
                onClick={copyOrderId}
                className="p-2 hover:bg-stone-800 rounded-lg transition-colors text-stone-400 hover:text-stone-200"
                title="Copiar ID"
              >
                {copied ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <Link
            to="/productos"
            className="btn-primary inline-flex items-center gap-3 text-stone-900 font-semibold px-8 py-4 rounded-full text-lg"
          >
            <Sparkles className="h-5 w-5" />
            Seguir comprando
          </Link>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-2xl" />
          <ShoppingBag className="relative h-24 w-24 mx-auto text-stone-600" />
        </div>
        <h1 className="text-3xl font-bold text-stone-100 mb-4">Tu carrito esta vacio</h1>
        <p className="text-stone-400 mb-10 text-lg">Agrega algunos productos para comenzar tu experiencia</p>
        <Link
          to="/productos"
          className="bg-amber-400 cursor-pointer inline-flex items-center gap-3 text-stone-900 font-semibold px-8 py-4 rounded-full text-lg"
        >
          <Sparkles className="h-5 w-5" />
          Explorar productos
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Link
        to="/productos"
        className="inline-flex items-center gap-2 text-stone-400 hover:text-amber-400 mb-8 transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Seguir comprando
      </Link>

      <h1 className="text-4xl font-bold text-stone-100 mb-10">Tu Carrito</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <CartItem key={item.id} item={item} index={index} onRemove={removeFromCart} onUpdateQuantity={addToCart} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-stone-900/50 rounded-3xl border border-stone-800/50 p-8">
            {showCheckout ? (
              <>
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                    {error}
                  </div>
                )}
                <CheckoutForm onSubmit={handleCheckout} loading={loading} />
                <button
                  onClick={() => setShowCheckout(false)}
                  className="w-full mt-4 bg-stone-800/50 hover:bg-stone-800 text-stone-400 hover:text-stone-300 font-medium py-3 rounded-xl transition-colors border border-stone-700/50 text-sm"
                >
                  Volver al resumen
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-stone-100 mb-6">Resumen</h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-stone-400">
                    <span>Subtotal ({cart.length} productos)</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-400">
                    <span>Envio</span>
                    <span className="text-green-400">Gratis</span>
                  </div>
                  <div className="border-t border-stone-800/50 pt-4 flex justify-between text-stone-100 font-bold text-xl">
                    <span>Total</span>
                    <span className="gradient-text">${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowCheckout(true)}
                  className="bg-amber-400 cursor-pointer w-full text-stone-900 font-semibold py-4 rounded-2xl text-lg mb-4"
                >
                  Finalizar Compra
                </button>

                <button
                  onClick={clearCart}
                  className="w-full bg-stone-800/50 hover:bg-stone-800 text-stone-400 hover:text-stone-300 font-medium py-4 rounded-2xl transition-colors border border-stone-700/50"
                >
                  Vaciar Carrito
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
