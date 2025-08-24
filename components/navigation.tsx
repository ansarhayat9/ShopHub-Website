"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Search, Menu, X, User } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state } = useCart()

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-xl text-foreground">ShopHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-foreground hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <User className="w-4 h-4 mr-2" />
              Account
            </Button>

            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-4 h-4" />
                {state.itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
                    {state.itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-3 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
