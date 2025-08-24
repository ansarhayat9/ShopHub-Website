import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">About ShopHub</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted destination for premium electronics, fashion, and accessories. We deliver quality products
              with exceptional customer service.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/shop" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Shop All Products
              </Link>
              <Link
                href="/shop?category=electronics"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Electronics
              </Link>
              <Link
                href="/shop?category=clothing"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Clothing
              </Link>
              <Link
                href="/shop?category=accessories"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Accessories
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">Customer Service</h3>
            <div className="space-y-2">
              <Link
                href="/contact"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Contact Us
              </Link>
              <Link
                href="/shipping"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Shipping Info
              </Link>
              <Link
                href="/returns"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Returns & Exchanges
              </Link>
              <Link href="/faq" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                FAQ
              </Link>
              <Link
                href="/privacy"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">support@shophub.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground text-sm">123 Commerce St, City, State 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 ShopHub. All rights reserved. Built with modern web technologies.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
