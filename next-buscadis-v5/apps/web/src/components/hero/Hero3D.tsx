'use client'

import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Suspense } from 'react'

function Model() {
  const { scene } = useGLTF('/3d/marketplace.glb')
  return <primitive object={scene} scale={2} position={[0, -1, 0]} />
}

export function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute h-full w-full">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <Model />
            <Environment preset="city" />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
            <span className="block">El Futuro del</span>
            <span className="block bg-gradient-to-r from-primary-200 to-primary-400 bg-clip-text text-transparent">
              Comercio Digital
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-xl text-primary-100 sm:max-w-3xl">
            Descubre una nueva era de clasificados premium. Donde la calidad
            se encuentra con la innovación.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/publicar"
              className="rounded-full bg-primary-500 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
            >
              Publicar Anuncio
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/explorar"
              className="rounded-full bg-white/10 px-8 py-3 text-base font-semibold text-white hover:bg-white/20"
            >
              Explorar
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}