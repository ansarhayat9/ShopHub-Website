import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Award, Globe, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-6">About TechStore</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're passionate about bringing you the latest technology and premium products at unbeatable prices. Since
              2020, we've been your trusted partner in the digital world.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2020 by a team of tech enthusiasts, TechStore began as a small startup with a big vision: to
                make cutting-edge technology accessible to everyone. What started as a passion project has grown into a
                trusted e-commerce platform serving thousands of customers worldwide.
              </p>
              <p className="text-muted-foreground mb-6">
                We believe that technology should enhance lives, not complicate them. That's why we carefully curate
                every product in our catalog, ensuring quality, reliability, and value for our customers.
              </p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Shop Our Collection</Button>
            </div>
            <div className="relative">
              <img
                src="/modern-tech-office-workspace-with-computers-and-ga.png"
                alt="TechStore office workspace"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Customer First</h3>
                  <p className="text-muted-foreground">
                    Your satisfaction is our top priority. We're here to help every step of the way.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Quality Assured</h3>
                  <p className="text-muted-foreground">
                    Every product is carefully tested and verified before reaching your doorstep.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Global Reach</h3>
                  <p className="text-muted-foreground">
                    Fast, reliable shipping to customers around the world with local support.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Passion Driven</h3>
                  <p className="text-muted-foreground">
                    We love technology and it shows in everything we do, from curation to service.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-muted rounded-lg p-8 mb-16">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-muted-foreground">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">25+</div>
                <div className="text-muted-foreground">Countries Served</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
                <div className="text-muted-foreground">Customer Rating</div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Meet Our Team</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Behind TechStore is a dedicated team of technology experts, customer service specialists, and logistics
              professionals working together to bring you the best shopping experience.
            </p>
            <Button variant="outline" size="lg">
              Join Our Team
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
