"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Your cart is empty</h1>
              <p className="text-muted-foreground">
                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
              </p>
            </div>
            <Link href="/shop">
              <Button size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground mt-1">{state.itemCount} items in your cart</p>
          </div>
          <Button
            variant="outline"
            onClick={clearCart}
            className="text-destructive hover:text-destructive bg-transparent"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.id}`}>
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">In stock ({item.maxStock} available)</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.maxStock}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive h-8 w-8 p-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({state.itemCount} items)</span>
                    <span className="font-medium">${state.total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-green-600">{state.total >= 50 ? "Free" : "$9.99"}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-medium">${(state.total * 0.08).toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${(state.total + (state.total >= 50 ? 0 : 9.99) + state.total * 0.08).toFixed(2)}</span>
                  </div>

                  {state.total < 50 && (
                    <p className="text-sm text-muted-foreground">
                      Add ${(50 - state.total).toFixed(2)} more for free shipping!
                    </p>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <Link href="/checkout" className="block">
                    <Button size="lg" className="w-full">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Link href="/shop" className="block">
                    <Button variant="outline" size="lg" className="w-full bg-transparent">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Security Features */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                        <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
                      </svg>
                    </div>
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
