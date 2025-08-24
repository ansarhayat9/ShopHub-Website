"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, ArrowRight, Sparkles, Zap, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"
import { useRef, useState, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"

const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), { ssr: false })
const OrbitControls = dynamic(() => import("@react-three/drei").then((mod) => mod.OrbitControls), { ssr: false })
const Float = dynamic(() => import("@react-three/drei").then((mod) => mod.Float), { ssr: false })
const Text3D = dynamic(() => import("@react-three/drei").then((mod) => mod.Text3D), { ssr: false })
const Environment = dynamic(() => import("@react-three/drei").then((mod) => mod.Environment), { ssr: false })
const Sphere = dynamic(() => import("@react-three/drei").then((mod) => mod.Sphere), { ssr: false })
const MeshDistortMaterial = dynamic(() => import("@react-three/drei").then((mod) => mod.MeshDistortMaterial), {
  ssr: false,
})

function Scene3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-pulse text-accent">Loading 3D Scene...</div>
      </div>
    )
  }

  try {
    return (
      <Suspense fallback={<div className="animate-pulse text-accent">Loading...</div>}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Environment preset="night" />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
          <FloatingCharacter />
          <AnimatedText />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </Suspense>
    )
  } catch (error) {
    console.log("[v0] 3D Scene error:", error)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-accent">3D Scene unavailable</div>
      </div>
    )
  }
}

function FloatingCharacter() {
  const meshRef = useRef<any>()

  useEffect(() => {
    const animate = () => {
      if (meshRef.current) {
        const time = Date.now() * 0.001
        meshRef.current.rotation.y = Math.sin(time) * 0.3
        meshRef.current.position.y = Math.sin(time * 0.5) * 0.5
      }
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#10b981"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function AnimatedText() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Text3D
        font="/fonts/Geist_Bold.json"
        size={0.5}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        position={[-2, 0, 0]}
      >
        PREMIUM
        <meshStandardMaterial color="#10b981" metalness={0.8} roughness={0.2} />
      </Text3D>
    </Float>
  )
}

export default function HomePage() {
  const { dispatch } = useCart()
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Headphones Pro",
      price: 129.99,
      originalPrice: 159.99,
      image: "/premium-wireless-headphones-black.png",
      rating: 4.8,
      reviews: 324,
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Smartwatch Elite",
      price: 249.99,
      originalPrice: 299.99,
      image: "/modern-smartwatch-silver.png",
      rating: 4.9,
      reviews: 156,
      badge: "New",
    },
    {
      id: 3,
      name: "Premium Laptop Bag",
      price: 79.99,
      originalPrice: 99.99,
      image: "/leather-laptop-bag-brown-professional.png",
      rating: 4.7,
      reviews: 89,
      badge: "Sale",
    },
  ]

  const addToCart = (product: any) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        maxStock: 10,
      },
    })
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <Navigation />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

        <div className="absolute inset-0 opacity-30">
          <Scene3D />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-float">
              <Badge className="glass-effect border-accent/50 text-accent animate-glow">
                <Sparkles className="w-4 h-4 mr-2" />
                Limited Time Offer
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="gradient-text">Flat 20% Off</span>
                <br />
                <span className="text-white">on Electronics</span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
                Experience the future of shopping with our premium collection. Cutting-edge technology meets luxury
                design in every product.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/shop">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-white border-0 px-8 py-4 text-lg font-semibold animate-glow"
                  >
                    <span className="relative z-10 flex items-center">
                      Shop Now
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 shimmer-effect"></div>
                  </Button>
                </Link>

                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="glass-effect border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold bg-transparent"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative animate-float" style={{ animationDelay: "1s" }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl blur-3xl"></div>
                <Image
                  src="/modern-electronics-shopping-hero-image.png"
                  alt="Premium Electronics"
                  width={600}
                  height={500}
                  className="relative z-10 rounded-2xl shadow-2xl glass-effect"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl md:text-6xl font-bold">
              <span className="gradient-text">Trending</span>
              <span className="text-white"> Products</span>
            </h2>
            <p className="text-slate-300 text-xl max-w-3xl mx-auto leading-relaxed">
              Discover our most coveted items, crafted with precision and designed for the discerning customer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="group glass-effect border-white/10 hover:border-accent/50 transition-all duration-500 transform hover:scale-105 hover:rotate-1 animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <CardContent className="p-0 relative overflow-hidden">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className={`w-full h-72 object-cover transition-all duration-700 ${
                        hoveredProduct === product.id ? "scale-110 rotate-2" : "scale-100"
                      }`}
                    />
                    <Badge className="absolute top-4 left-4 z-20 glass-effect border-accent/50 text-accent animate-pulse">
                      {product.badge}
                    </Badge>

                    {hoveredProduct === product.id && (
                      <div className="absolute inset-0 z-20 flex items-center justify-center">
                        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center animate-ping">
                          <Zap className="w-8 h-8 text-accent" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-4 bg-gradient-to-b from-slate-800/50 to-slate-900/50">
                    <div className="space-y-3">
                      <h3 className="font-bold text-xl text-white group-hover:gradient-text transition-all duration-300">
                        {product.name}
                      </h3>

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 transition-all duration-300 ${
                                i < Math.floor(product.rating)
                                  ? "text-accent fill-current animate-pulse"
                                  : "text-slate-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-slate-400">
                          {product.rating} ({product.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl font-bold gradient-text">${product.price}</span>
                          <span className="text-sm text-slate-500 line-through">${product.originalPrice}</span>
                        </div>
                        <span className="text-sm text-accent font-semibold animate-pulse">
                          Save ${(product.originalPrice - product.price).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Link href={`/product/${product.id}`} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full glass-effect border-white/20 text-white hover:bg-white/10 transition-all duration-300 bg-transparent"
                        >
                          View Details
                        </Button>
                      </Link>
                      <Button
                        className="flex-1 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-white border-0 group"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/shop">
              <Button
                size="lg"
                className="glass-effect border-accent/50 text-accent hover:bg-accent/10 px-8 py-4 text-lg font-semibold group"
              >
                View All Products
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-6 group animate-float">
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/60 rounded-full animate-glow"></div>
                <div className="relative w-full h-full glass-effect rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                Free Shipping
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Complimentary worldwide shipping on orders over $50. Experience premium delivery service.
              </p>
            </div>

            <div className="text-center space-y-6 group animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/60 rounded-full animate-glow"></div>
                <div className="relative w-full h-full glass-effect rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-10 h-10 text-accent" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                Secure Payment
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Military-grade encryption protects your transactions with advanced security protocols.
              </p>
            </div>

            <div className="text-center space-y-6 group animate-float" style={{ animationDelay: "1s" }}>
              <div className="relative mx-auto w-20 h-20">
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/60 rounded-full animate-glow"></div>
                <div className="relative w-full h-full glass-effect rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                24/7 Support
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Dedicated concierge service available around the clock for premium customer care.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
