import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock, MessageCircle, Headphones } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-6">Get in Touch</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions about our products or need support? We're here to help! Reach out to us through any of the
              channels below.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-foreground mb-8">Contact Information</h2>

              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Address</h3>
                        <p className="text-muted-foreground">
                          123 Tech Street
                          <br />
                          Digital District
                          <br />
                          San Francisco, CA 94105
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Phone className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                        <p className="text-muted-foreground">
                          +1 (555) 123-4567
                          <br />
                          Mon-Fri: 9AM-6PM PST
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Mail className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                        <p className="text-muted-foreground">
                          support@techstore.com
                          <br />
                          sales@techstore.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 10:00 AM - 4:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help you?" />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={6} />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Support Options */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center text-foreground mb-8">Other Ways to Get Help</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Live Chat</h3>
                  <p className="text-muted-foreground mb-4">
                    Get instant help from our support team through live chat.
                  </p>
                  <Button variant="outline">Start Chat</Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Headphones className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Phone Support</h3>
                  <p className="text-muted-foreground mb-4">
                    Speak directly with our customer service representatives.
                  </p>
                  <Button variant="outline">Call Now</Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Email Support</h3>
                  <p className="text-muted-foreground mb-4">Send us an email and we'll respond within 24 hours.</p>
                  <Button variant="outline">Send Email</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mb-6">
              Looking for quick answers? Check out our comprehensive FAQ section.
            </p>
            <Button variant="outline" size="lg">
              View FAQ
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
