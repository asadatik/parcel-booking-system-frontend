import { Package, Truck, Shield, Clock, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-emerald-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-t border-emerald-100 dark:border-slate-700">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-orange-500/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow-lg">
                <Package className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-orange-500 bg-clip-text text-transparent">
                ParcelPro
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fast, reliable, and secure parcel delivery service connecting you worldwide.
            </p>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 hover:bg-emerald-50 hover:border-emerald-200 dark:hover:bg-emerald-950 bg-transparent"
              >
                <span className="sr-only">Facebook</span>
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 hover:bg-emerald-50 hover:border-emerald-200 dark:hover:bg-emerald-950 bg-transparent"
              >
                <span className="sr-only">Twitter</span>
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Truck className="h-4 w-4 text-emerald-500" />
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors duration-200">
                  Express Delivery
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors duration-200">
                  Same Day
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors duration-200">
                  International
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-emerald-600 transition-colors duration-200">
                  Bulk Orders
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Shield className="h-4 w-4 text-orange-500" />
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-orange-600 transition-colors duration-200">
                  Track Package
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-orange-600 transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-orange-600 transition-colors duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-orange-600 transition-colors duration-200">
                  Claims
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-emerald-500" />
              Contact
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-3 w-3 text-emerald-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-3 w-3 text-orange-500" />
                <span>support@parcelpro.com</span>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-3 w-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">123 Delivery St, Logistics City, LC 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-emerald-100 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>© 2024 ParcelPro. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <a href="#" className="hover:text-emerald-600 transition-colors duration-200">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="hover:text-emerald-600 transition-colors duration-200">
                Terms of Service
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
