"use client"

import { useState } from "react"
import { User, Mail, Phone, Loader2, AlertCircle } from "lucide-react"

export default function CheckoutForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    emailConfirm: "",
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El telefono es requerido"
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Ingresa un telefono valido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un email valido"
    }

    if (!formData.emailConfirm.trim()) {
      newErrors.emailConfirm = "Confirma tu email"
    } else if (formData.email !== formData.emailConfirm) {
      newErrors.emailConfirm = "Los emails no coinciden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      })
    }
  }

  const inputClass = (fieldName) => `
    w-full bg-stone-800/50 border rounded-xl px-4 py-4 pl-12 text-stone-100 
    placeholder:text-stone-500 focus:outline-none focus:ring-2 transition-all
    ${
      errors[fieldName]
        ? "border-red-500/50 focus:ring-red-500/30 focus:border-red-500"
        : "border-stone-700/50 focus:ring-amber-500/30 focus:border-amber-500/50"
    }
  `

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="text-xl font-semibold text-stone-100 mb-6">Datos de contacto</h3>

      {/* Nombre */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm text-stone-400">
          Nombre completo
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-500" />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre"
            className={inputClass("name")}
          />
        </div>
        {errors.name && (
          <p className="text-red-400 text-sm flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Telefono */}
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm text-stone-400">
          Telefono
        </label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-500" />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Tu telefono"
            className={inputClass("phone")}
          />
        </div>
        {errors.phone && (
          <p className="text-red-400 text-sm flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.phone}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-stone-400">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-500" />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            className={inputClass("email")}
          />
        </div>
        {errors.email && (
          <p className="text-red-400 text-sm flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Confirmar Email */}
      <div className="space-y-2">
        <label htmlFor="emailConfirm" className="text-sm text-stone-400">
          Confirmar email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-500" />
          <input
            type="email"
            id="emailConfirm"
            name="emailConfirm"
            value={formData.emailConfirm}
            onChange={handleChange}
            placeholder="Confirma tu email"
            className={inputClass("emailConfirm")}
          />
        </div>
        {errors.emailConfirm && (
          <p className="text-red-400 text-sm flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {errors.emailConfirm}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-amber-400 cursor-pointer w-full text-stone-900 font-semibold py-4 rounded-2xl text-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Procesando...
          </>
        ) : (
          "Confirmar Compra"
        )}
      </button>
    </form>
  )
}
