'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Upload, X, Loader2 } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

const CATEGORIAS = [
  { id: 'vehiculos', nombre: 'Vehículos', subcategorias: ['Autos', 'Motos', 'Camiones', 'Repuestos'] },
  { id: 'inmuebles', nombre: 'Inmuebles', subcategorias: ['Casas', 'Departamentos', 'Terrenos', 'Oficinas'] },
  { id: 'tecnologia', nombre: 'Tecnología', subcategorias: ['Celulares', 'Computadoras', 'Tablets', 'Accesorios'] },
  // Añade más categorías según necesites
]

export default function PublicarPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    moneda: 'USD',
    categoria: '',
    subcategoria: '',
    condicion: 'nuevo',
    imagenes: [],
    ubicacion: '',
    ciudad: '',
    estado: '',
    pais: 'Paraguay',
    contacto: {
      nombre: '',
      email: '',
      telefono: '',
      whatsapp: '',
      mostrarEmail: false,
      mostrarTelefono: true,
      mostrarWhatsapp: true
    }
  })

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      setFormData(prev => ({
        ...prev,
        imagenes: [...prev.imagenes, ...acceptedFiles.map(file => URL.createObjectURL(file))]
      }))
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/clasificados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Error al publicar el anuncio')
      }

      toast.success('¡Anuncio publicado exitosamente!')
      router.push('/')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || 'Error al publicar el anuncio')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="titulo" className="block text-sm font-medium mb-2">
                  Título del anuncio
                </label>
                <input
                  id="titulo"
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm focus:ring-2 focus:ring-primary-500"
                  placeholder="Ej: iPhone 13 Pro Max 256GB"
                  required
                />
              </div>
              <div>
                <label htmlFor="categoria" className="block text-sm font-medium mb-2">
                  Categoría
                </label>
                <select
                  id="categoria"
                  value={formData.categoria}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      categoria: e.target.value,
                      subcategoria: ''
                    })
                  }}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  {CATEGORIAS.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium mb-2">
                Descripción detallada
              </label>
              <textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                className="w-full rounded-lg border-gray-200 p-3 text-sm focus:ring-2 focus:ring-primary-500 h-32"
                placeholder="Describe tu producto o servicio con el mayor detalle posible..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="precio" className="block text-sm font-medium mb-2">
                  Precio
                </label>
                <div className="relative">
                  <input
                    id="precio"
                    type="number"
                    value={formData.precio}
                    onChange={(e) => setFormData({...formData, precio: e.target.value})}
                    className="w-full rounded-lg border-gray-200 p-3 text-sm focus:ring-2 focus:ring-primary-500"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="moneda" className="block text-sm font-medium mb-2">
                  Moneda
                </label>
                <select
                  id="moneda"
                  value={formData.moneda}
                  onChange={(e) => setFormData({...formData, moneda: e.target.value})}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm focus:ring-2 focus:ring-primary-500"
                >
                  <option value="USD">USD - Dólar Americano</option>
                  <option value="PYG">PYG - Guaraní Paraguayo</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Siguiente
              </button>
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary-500 transition-colors">
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Arrastra y suelta imágenes aquí, o haz clic para seleccionar
              </p>
              <p className="text-xs text-gray-400">
                Máximo 5 imágenes (JPG, PNG)
              </p>
            </div>

            {formData.imagenes.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {formData.imagenes.map((imagen, index) => (
                  <div key={index} className="relative">
                    <img
                      src={imagen}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          imagenes: prev.imagenes.filter((_, i) => i !== index)
                        }))
                      }}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ciudad" className="block text-sm font-medium mb-2">
                  Ciudad
                </label>
                <input
                  id="ciudad"
                  type="text"
                  value={formData.ciudad}
                  onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm focus:ring-2 focus:ring-primary-500"
                  placeholder="Ej: Asunción"
                  required
                />
              </div>
              <div>
                <label htmlFor="ubicacion" className="block text-sm font-medium mb-2">
                  Dirección
                </label>
                <input
                  id="ubicacion"
                  type="text"
                  value={formData.ubicacion}
                  onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm focus:ring-2 focus:ring-primary-500"
                  placeholder="Ej: Av. España 1234"
                  required
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Siguiente
              </button>
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contacto.nombre" className="block text-sm font-medium mb-2">
                  Nombre de contacto
                </label>
                <input
                  id="contacto.nombre"
                  type="text"
                  value={formData.contacto.nombre}
                  onChange={(e) => setFormData({
                    ...formData,
                    contacto: { ...formData.contacto, nombre: e.target.value }
                  })}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm focus:ring-2 focus:ring-primary-500"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>
              <div>
                <label htmlFor="contacto.email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  id="contacto.email"
                  type="email"
                  value={formData.contacto.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    contacto: { ...formData.contacto, email: e.target.value }
                  })}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm focus:ring-2 focus:ring-primary-500"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contacto.telefono" className="block text-sm font-medium mb-2">
                  Teléfono
                </label>
                <input
                  id="contacto.telefono"
                  type="tel"
                  value={formData.contacto.telefono}
                  onChange={(e) => setFormData({
                    ...formData,
                    contacto: { ...formData.contacto, telefono: e.target.value }
                  })}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm focus:ring-2 focus:ring-primary-500"
                  placeholder="+595 XXX XXX XXX"
                />
              </div>
              <div>
                <label htmlFor="contacto.whatsapp" className="block text-sm font-medium mb-2">
                  WhatsApp
                </label>
                <input
                  id="contacto.whatsapp"
                  type="tel"
                  value={formData.contacto.whatsapp}
                  onChange={(e) => setFormData({
                    ...formData,
                    contacto: { ...formData.contacto, whatsapp: e.target.value }
                  })}
                  className="w-full rounded-lg border-gray-200 p-3 text-sm focus:ring-2 focus:ring-primary-500"
                  placeholder="+595 XXX XXX XXX"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="mostrarEmail"
                  type="checkbox"
                  checked={formData.contacto.mostrarEmail}
                  onChange={(e) => setFormData({
                    ...formData,
                    contacto: { ...formData.contacto, mostrarEmail: e.target.checked }
                  })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="mostrarEmail" className="ml-2 block text-sm text-gray-700">
                  Mostrar email en el anuncio
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="mostrarTelefono"
                  type="checkbox"
                  checked={formData.contacto.mostrarTelefono}
                  onChange={(e) => setFormData({
                    ...formData,
                    contacto: { ...formData.contacto, mostrarTelefono: e.target.checked }
                  })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="mostrarTelefono" className="ml-2 block text-sm text-gray-700">
                  Mostrar teléfono en el anuncio
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="mostrarWhatsapp"
                  type="checkbox"
                  checked={formData.contacto.mostrarWhatsapp}
                  onChange={(e) => setFormData({
                    ...formData,
                    contacto: { ...formData.contacto, mostrarWhatsapp: e.target.checked }
                  })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="mostrarWhatsapp" className="ml-2 block text-sm text-gray-700">
                  Mostrar WhatsApp en el anuncio
                </label>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Anterior
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Publicando...</span>
                  </>
                ) : (
                  <span>Publicar Anuncio</span>
                )}
              </button>
            </div>
          </motion.div>
        )
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Publicar Anuncio</h1>
          <p className="mt-2 text-gray-600">Complete los detalles de su anuncio en los siguientes pasos</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex items-center ${currentStep >= step ? 'text-primary-600' : 'text-gray-400'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-primary-600 text-white' : 'bg-gray-200'
                }`}>
                  {step}
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:inline">
                  {step === 1 ? 'Información básica' : step === 2 ? 'Imágenes y ubicación' : 'Contacto'}
                </span>
              </div>
            ))}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10">
              <div
                className="h-full bg-primary-600 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          {renderStep()}
        </form>
      </div>
    </div>
  )
} 