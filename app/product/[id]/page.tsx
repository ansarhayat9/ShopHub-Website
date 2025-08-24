"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useCart } from "@/lib/cart-context"

type ProductDetails = {
  id: number
  name: string
  price: number
  originalPrice?: number
  images: string[]
  rating: number
  reviews: number
  category: string
  badge?: string
  description: string
  features: string[]
  specifications: { [key: string]: string }
  inStock: boolean
  stockCount: number
}

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { dispatch } = useCart()

  // Mock product data - in a real app, this would come from an API
  const productData: { [key: string]: ProductDetails } = {
    "1": {
      id: 1,
      name: "Wireless Headphones Pro",
      price: 129.99,
      originalPrice: 159.99,
      images: [
        "/premium-wireless-headphones-black.png",
        "/headphones-side-view.png",
        "/headphones-case-view.png",
        "/headphones-wearing-demo.png",
      ],
      rating: 4.8,
      reviews: 324,
      category: "Electronics",
      badge: "Best Seller",
      description:
        "Experience premium audio quality with our Wireless Headphones Pro. Featuring advanced noise cancellation technology, 30-hour battery life, and crystal-clear sound reproduction. Perfect for music lovers, professionals, and anyone who demands the best in wireless audio.",
      features: [
        "Active Noise Cancellation (ANC)",
        "30-hour battery life with quick charge",
        "Premium drivers for exceptional sound quality",
        "Comfortable over-ear design with memory foam",
        "Bluetooth 5.0 with multipoint connection",
        "Built-in microphone for calls",
        "Foldable design with carrying case",
        "Touch controls for easy operation",
      ],
      specifications: {
        "Driver Size": "40mm",
        "Frequency Response": "20Hz - 20kHz",
        Impedance: "32 Ohm",
        "Battery Life": "30 hours (ANC on), 40 hours (ANC off)",
        "Charging Time": "2 hours (full), 15 min (5 hours playback)",
        Weight: "250g",
        Connectivity: "Bluetooth 5.0, 3.5mm jack",
        Warranty: "2 years",
      },
      inStock: true,
      stockCount: 15,
    },
    "2": {
      id: 2,
      name: "Smartwatch Elite",
      price: 249.99,
      originalPrice: 299.99,
      images: [
        "/modern-smartwatch-silver.png",
        "/smartwatch-black-variant.png",
        "/smartwatch-fitness-tracking.png",
        "/smartwatch-charging-dock.png",
      ],
      rating: 4.9,
      reviews: 156,
      category: "Electronics",
      badge: "New",
      description:
        "The Smartwatch Elite combines cutting-edge technology with elegant design. Track your fitness, monitor your health, stay connected, and express your style with this premium smartwatch featuring a vibrant AMOLED display and 7-day battery life.",
      features: [
        "1.4-inch AMOLED display with Always-On feature",
        "7-day battery life with fast charging",
        "Comprehensive health monitoring (heart rate, SpO2, sleep)",
        "GPS tracking for outdoor activities",
        "Water resistant up to 50 meters",
        "100+ workout modes",
        "Smart notifications and call handling",
        "Premium materials with interchangeable bands",
      ],
      specifications: {
        Display: "1.4-inch AMOLED, 454x454 resolution",
        Battery: "7 days typical use, 2 days heavy use",
        "Water Resistance": "5ATM (50 meters)",
        Sensors: "Heart rate, SpO2, accelerometer, gyroscope, GPS",
        Connectivity: "Bluetooth 5.0, Wi-Fi",
        Compatibility: "iOS 12+, Android 6.0+",
        Weight: "45g (without strap)",
        Warranty: "1 year",
      },
      inStock: true,
      stockCount: 8,
    },
  }

  const product = productData[params.id]

  if (!product) {
    notFound()
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity)
    }
  }

  const addToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        maxStock: product.stockCount,
        quantity,
      },
    })
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-primary">
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-card">
              <Image
                src={product.images[selectedImageIndex] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">{product.badge}</Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImageIndex === index ? "border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-foreground">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                    <Badge variant="destructive">{discountPercentage}% OFF</Badge>
                  </>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-green-600 font-medium">
                  You save ${(product.originalPrice - product.price).toFixed(2)}
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className={`font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                {product.inStock ? `In Stock (${product.stockCount} available)` : "Out of Stock"}
              </span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-foreground">Quantity:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stockCount}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1" disabled={!product.inStock} onClick={addToCart}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? "text-red-500 border-red-500" : ""}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Key Features</h3>
                <div className="grid grid-cols-1 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping & Returns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-card rounded-lg">
                <Truck className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium text-sm">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-card rounded-lg">
                <RotateCcw className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium text-sm">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-card rounded-lg">
                <Shield className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium text-sm">Warranty</p>
                  <p className="text-xs text-muted-foreground">{product.specifications.Warranty}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border last:border-b-0">
                        <span className="font-medium text-foreground">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    {/* Sample Reviews */}
                    <div className="border-b border-border pb-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="font-medium">John D.</span>
                        <span className="text-sm text-muted-foreground">Verified Purchase</span>
                      </div>
                      <p className="text-muted-foreground">
                        Excellent product! The sound quality is amazing and the battery life is exactly as advertised.
                        Highly recommend for anyone looking for premium wireless headphones.
                      </p>
                    </div>

                    <div className="border-b border-border pb-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                          <Star className="w-4 h-4 text-gray-300" />
                        </div>
                        <span className="font-medium">Sarah M.</span>
                        <span className="text-sm text-muted-foreground">Verified Purchase</span>
                      </div>
                      <p className="text-muted-foreground">
                        Great value for money. The noise cancellation works well and they're very comfortable for long
                        listening sessions. Only minor complaint is the case could be a bit smaller.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}
