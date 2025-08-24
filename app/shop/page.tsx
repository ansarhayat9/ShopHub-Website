"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"

type Product = {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  badge?: string
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("featured")
  const { dispatch } = useCart()

  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Headphones Pro",
      price: 129.99,
      originalPrice: 159.99,
      image: "/premium-wireless-headphones-black.png",
      rating: 4.8,
      reviews: 324,
      category: "electronics",
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
      category: "electronics",
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
      category: "accessories",
      badge: "Sale",
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 89.99,
      image: "/modern-bluetooth-speaker-black.png",
      rating: 4.6,
      reviews: 203,
      category: "electronics",
    },
    {
      id: 5,
      name: "Designer Sunglasses",
      price: 159.99,
      originalPrice: 199.99,
      image: "/designer-sunglasses-aviator-style.png",
      rating: 4.5,
      reviews: 127,
      category: "accessories",
      badge: "Sale",
    },
    {
      id: 6,
      name: "Cotton T-Shirt",
      price: 29.99,
      image: "/premium-cotton-t-shirt-navy-blue.png",
      rating: 4.4,
      reviews: 89,
      category: "clothing",
    },
    {
      id: 7,
      name: "Gaming Mouse",
      price: 69.99,
      originalPrice: 89.99,
      image: "/gaming-mouse-rgb-lighting-black.png",
      rating: 4.7,
      reviews: 245,
      category: "electronics",
      badge: "Sale",
    },
    {
      id: 8,
      name: "Denim Jacket",
      price: 89.99,
      image: "/classic-denim-jacket-blue-vintage-style.png",
      rating: 4.3,
      reviews: 67,
      category: "clothing",
    },
    {
      id: 9,
      name: "Wireless Charger",
      price: 39.99,
      image: "/wireless-charging-pad-modern-white.png",
      rating: 4.5,
      reviews: 134,
      category: "electronics",
    },
    {
      id: 10,
      name: "Leather Wallet",
      price: 49.99,
      originalPrice: 69.99,
      image: "/leather-wallet-brown-minimalist-design.png",
      rating: 4.6,
      reviews: 98,
      category: "accessories",
      badge: "Sale",
    },
    {
      id: 11,
      name: "Running Shoes",
      price: 119.99,
      image: "/athletic-running-shoes-white-and-blue.png",
      rating: 4.8,
      reviews: 312,
      category: "clothing",
      badge: "Best Seller",
    },
    {
      id: 12,
      name: "Phone Case",
      price: 24.99,
      image: "/phone-case-clear-protective-modern.png",
      rating: 4.2,
      reviews: 156,
      category: "accessories",
    },
    {
      id: 13,
      name: "Hoodie",
      price: 59.99,
      originalPrice: 79.99,
      image: "/comfortable-hoodie-gray-cotton.png",
      rating: 4.4,
      reviews: 89,
      category: "clothing",
      badge: "Sale",
    },
    {
      id: 14,
      name: "Tablet Stand",
      price: 34.99,
      image: "/adjustable-tablet-stand-aluminum-silver.png",
      rating: 4.3,
      reviews: 76,
      category: "accessories",
    },
    {
      id: 15,
      name: "USB-C Cable",
      price: 19.99,
      image: "/usb-c-cable-braided-black-premium.png",
      rating: 4.5,
      reviews: 234,
      category: "electronics",
    },
  ]

  const categories = [
    { value: "all", label: "All Products" },
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "accessories", label: "Accessories" },
  ]

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
  ]

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [selectedCategory, sortBy])

  const addToCart = (product: Product) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        maxStock: 10, // Default stock for demo
      },
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Shop All Products</h1>
          <p className="text-muted-foreground text-lg">
            Discover our complete collection of premium electronics, fashion, and accessories
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-card rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filter & Sort:</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="flex-1">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">Showing {filteredAndSortedProducts.length} products</div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">{product.badge}</Badge>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div className="space-y-2">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-foreground">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    {product.originalPrice && (
                      <span className="text-xs text-green-600 font-medium">
                        Save ${(product.originalPrice - product.price).toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/product/${product.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        View
                      </Button>
                    </Link>
                    <Button size="sm" className="flex-1" onClick={() => addToCart(product)}>
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Products
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
