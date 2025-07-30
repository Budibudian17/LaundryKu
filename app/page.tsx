"use client"

// This component uses ClientOnly wrapper and suppressHydrationWarning to prevent
// hydration mismatches caused by browser extensions or client-side only logic
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Phone,
  MapPin,
  Clock,
  Truck,
  Shield,
  Sparkles,
  Menu,
  X,
  Instagram,
  MessageCircle,
  Star,
  Award,
  Zap,
  Heart,
  Gift,
  Shirt,
  Package,
  CheckCircle,
  ArrowRight,
  Play,
  Baby,
  Bed,
  Home,
  AlertTriangle,
} from "lucide-react"

// Create a client-only version of the component
const LaundryKuWebsiteClient = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [customerCount, setCustomerCount] = useState(2000)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [showPrivacyWarning, setShowPrivacyWarning] = useState(false)

  // Anti-inspect functionality - Prevent DevTools access while allowing normal interactions
  useEffect(() => {
    const preventInspect = (e: KeyboardEvent) => {
      // Prevent F12
      if (e.key === 'F12') {
        e.preventDefault()
        setShowPrivacyWarning(true)
        return false
      }
      
      // Prevent Ctrl+Shift+I (Windows) or Cmd+Option+I (Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault()
        setShowPrivacyWarning(true)
        return false
      }
      
      // Prevent Ctrl+Shift+C (Windows) or Cmd+Option+C (Mac) - Developer Tools
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault()
        setShowPrivacyWarning(true)
        return false
      }
      
      // Prevent Ctrl+U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault()
        setShowPrivacyWarning(true)
        return false
      }
      
      // Prevent Ctrl+Shift+J (Console)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') {
        e.preventDefault()
        setShowPrivacyWarning(true)
        return false
      }
    }

    const preventRightClick = (e: MouseEvent) => {
      e.preventDefault()
      setShowPrivacyWarning(true)
      return false
    }

    const preventDevTools = () => {
      const devtools = {
        open: false,
        orientation: null
      }
      
      const threshold = 160
      
      setInterval(() => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold
        const heightThreshold = window.outerHeight - window.innerHeight > threshold
        
        if (widthThreshold || heightThreshold) {
          if (!devtools.open) {
            devtools.open = true
            setShowPrivacyWarning(true)
          }
        } else {
          devtools.open = false
        }
      }, 500)
    }

    // Add event listeners - Prevent DevTools access
    document.addEventListener('keydown', preventInspect)
    document.addEventListener('contextmenu', preventRightClick)
    preventDevTools()

    // Additional protection
    const preventInspectElement = () => {
      const devtools = {
        open: false,
        orientation: null
      }
      
      const threshold = 160
      
      setInterval(() => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold
        const heightThreshold = window.outerHeight - window.innerHeight > threshold
        
        if (widthThreshold || heightThreshold) {
          if (!devtools.open) {
            devtools.open = true
            setShowPrivacyWarning(true)
            // Redirect to home page if devtools detected
            setTimeout(() => {
              window.location.href = window.location.origin
            }, 3000)
          }
        } else {
          devtools.open = false
        }
      }, 1000)
    }

    preventInspectElement()

    // Prevent console access
    const preventConsole = () => {
      const originalLog = console.log
      const originalWarn = console.warn
      const originalError = console.error
      const originalInfo = console.info
      
      console.log = (...args: any[]) => {
        setShowPrivacyWarning(true)
        return originalLog.apply(console, args)
      }
      console.warn = (...args: any[]) => {
        setShowPrivacyWarning(true)
        return originalWarn.apply(console, args)
      }
      console.error = (...args: any[]) => {
        setShowPrivacyWarning(true)
        return originalError.apply(console, args)
      }
      console.info = (...args: any[]) => {
        setShowPrivacyWarning(true)
        return originalInfo.apply(console, args)
      }
    }

    preventConsole()

    return () => {
      document.removeEventListener('keydown', preventInspect)
      document.removeEventListener('contextmenu', preventRightClick)
    }
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    // Observe all sections
    const sections = document.querySelectorAll('section[id]')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  // Animated counter for customers
  useEffect(() => {
    const timer = setInterval(() => {
      setCustomerCount((prev) => {
        if (prev < 2500) return prev + 25
        return 2500
      })
    }, 50)
    return () => clearInterval(timer)
  }, [])

  const services = [
    {
      name: "Laundry Kilo",
      description: "Cuci per kilogram dengan harga terjangkau",
      price: "Mulai 8rb/kg",
      icon: Shirt,
      popular: false,
    },
    {
      name: "Laundry Premium",
      description: "Layanan premium dengan perawatan khusus",
      price: "Mulai 12rb/kg",
      icon: Sparkles,
      popular: true,
    },
    {
      name: "Laundry Antar Jemput",
      description: "Kemudahan pickup dan delivery",
      price: "Gratis ongkir*",
      icon: Truck,
      popular: false,
    },
    {
      name: "Laundry Sepatu",
      description: "Pembersihan sepatu profesional",
      price: "Mulai 25rb/pasang",
      icon: Package,
      popular: false,
    },
    {
      name: "Laundry Karpet",
      description: "Pembersihan karpet mendalam",
      price: "Mulai 15rb/m²",
      icon: Gift,
      popular: false,
    },
    {
      name: "Laundry Perlengkapan Bayi",
      description: "Perawatan khusus untuk bayi",
      price: "Mulai 10rb/kg",
      icon: Baby,
      popular: false,
    },
    {
      name: "Laundry Stroller",
      description: "Pembersihan stroller bayi",
      price: "Mulai 30rb/unit",
      icon: Package,
      popular: false,
    },
    {
      name: "Laundry Bed Cover",
      description: "Cuci bed cover dan sprei",
      price: "Mulai 20rb/set",
      icon: Bed,
      popular: false,
    },
    {
      name: "Laundry Gorden",
      description: "Pembersihan gorden dan tirai",
      price: "Mulai 25rb/meter",
      icon: Home,
      popular: false,
    },
  ]

  const features = [
    {
      icon: Shield,
      title: "Terpercaya",
      description: "Halal certified & quality guaranteed",
    },
    {
      icon: Zap,
      title: "Berkualitas",
      description: "Standar premium dengan teknologi modern",
    },
    {
      icon: Clock,
      title: "Cepat",
      description: "Express service dalam 24 jam",
    },
    {
      icon: CheckCircle,
      title: "Fleksibel",
      description: "Layanan sesuai kebutuhan Anda",
    },
    {
      icon: Award,
      title: "Profesional",
      description: "Tim berpengalaman dan terlatih",
    },
  ]

  const outlets = [
    {
      name: "Cirendeu",
      address: "Jln. Cirendeu Raya No.40 D",
      city: "Tangerang Selatan",
      phone: "0813-1549-4196",
      rating: 4.9,
      reviews: 156,
    },
    {
      name: "Bona Indah",
      address: "Jl. Lebak Bulus 1 No.24",
      city: "Jakarta Selatan",
      phone: "0813-5170-2263",
      rating: 4.8,
      reviews: 203,
    },
    {
      name: "Karet Pedurenan",
      address: "Jl. Karet pedurenan no. 62 D",
      city: "Jakarta Selatan",
      phone: "0812-8726-6279",
      rating: 4.9,
      reviews: 189,
    },
  ]

  const testimonials = [
    {
      name: "Sarah M.",
      rating: 5,
      comment: "Pelayanan sangat memuaskan! Baju jadi wangi dan bersih banget. Recommended!",
      location: "Jakarta Selatan",
    },
    {
      name: "Budi S.",
      rating: 5,
      comment: "Pickup delivery tepat waktu, hasil cucian rapi. Pasti langganan terus!",
      location: "Tangerang Selatan",
    },
    {
      name: "Maya L.",
      rating: 5,
      comment: "Laundry sepatu disini hasilnya amazing! Sepatu putih jadi kayak baru lagi.",
      location: "Cirendeu",
    },
  ]

  return (
    <div className="min-h-screen bg-white font-sans" key="laundryku-app">
      {/* Privacy Warning Modal */}
      {showPrivacyWarning && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border-4 border-green-500 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 right-4 w-16 h-16 bg-green-400 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-yellow-400 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-green-300 rounded-full"></div>
            </div>
            
            <div className="relative z-10 text-center space-y-4">
              {/* Icon */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              
              {/* Title */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  🛡️ Keamanan Privasi
                </h3>
                <p className="text-sm text-gray-600">
                  Akses Developer Tools tidak diizinkan untuk melindungi privasi dan keamanan website kami.
                </p>
              </div>
              
              {/* Message */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800 font-medium">
                  <Shirt className="w-4 h-4 inline mr-2 text-green-600" />
                  LaundryKu Premium - Layanan Laundry Terpercaya
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Untuk informasi layanan, silakan hubungi kami melalui WhatsApp atau telepon.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-gray-900 allow-select">0813-1549-4196</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span className="font-semibold text-gray-900 allow-select">@laundryku.premium</span>
                </div>
              </div>
              
              {/* Button */}
              <Button
                onClick={() => setShowPrivacyWarning(false)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105"
              >
                <Shield className="w-4 h-4 mr-2" />
                Mengerti & Lanjutkan
              </Button>
              
              {/* Footer */}
              <p className="text-xs text-gray-500">
                Terima kasih telah menggunakan layanan LaundryKu Premium
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 shadow-lg" style={{ backgroundColor: "#028446" }}>
        {/* Promo Banner */}
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-lime-400 text-green-900 py-2 px-4 text-center relative overflow-hidden">
          <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm font-semibold">
            <Gift className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">🎉 PROMO SPESIAL: Diskon 20% untuk pelanggan baru! Hubungi kami untuk detail</span>
            <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Image
                src="/images/laundryku-logo.png"
                alt="Laundryku Premium Logo"
                width={200}
                height={50}
                className="h-8 w-auto sm:h-10"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <a href="#home" className="text-white hover:text-yellow-300 font-medium transition-colors text-sm xl:text-base">
                Home
              </a>
              <a href="#services" className="text-white hover:text-yellow-300 font-medium transition-colors text-sm xl:text-base">
                Layanan
              </a>
              <a href="#pickup" className="text-white hover:text-yellow-300 font-medium transition-colors text-sm xl:text-base">
                Pick Up & Delivery
              </a>
              <a href="#locations" className="text-white hover:text-yellow-300 font-medium transition-colors text-sm xl:text-base">
                Locations
              </a>
            </nav>

            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
              <Button
                variant="outline"
                className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-green-900 bg-transparent rounded-full px-4 xl:px-6 py-2 font-semibold transition-all duration-300 hover:scale-105 text-sm xl:text-base"
                onClick={() => window.open('tel:6281315494196', '_blank')}
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="hidden xl:inline">Hubungi Kami</span>
                <span className="xl:hidden">Hubungi</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-green-700">
              <nav className="flex flex-col space-y-3 px-4">
                <a href="#home" className="text-white hover:text-yellow-300 font-medium text-sm">
                  Home
                </a>
                <a href="#services" className="text-white hover:text-yellow-300 font-medium text-sm">
                  Layanan
                </a>
                <a href="#pickup" className="text-white hover:text-yellow-300 font-medium text-sm">
                  Pick Up & Delivery
                </a>
                <a href="#locations" className="text-white hover:text-yellow-300 font-medium text-sm">
                  Locations
                </a>
                <Button
                  variant="outline"
                  className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-green-900 bg-transparent w-fit rounded-full px-4 py-2 font-semibold text-sm"
                  onClick={() => window.open('tel:6281315494196', '_blank')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Hubungi Kami
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className={`relative bg-gradient-to-br from-gray-50 via-white to-green-50/30 pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-24 overflow-hidden transition-all duration-500 ${
          visibleSections.has('home') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-32 h-32 sm:w-64 sm:h-64 bg-green-200 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-24 h-24 sm:w-48 sm:h-48 bg-yellow-200 rounded-full opacity-30 blur-2xl" />
          <div className="absolute top-1/2 right-1/4 w-16 h-16 sm:w-32 sm:h-32 bg-green-300 rounded-full opacity-15" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 sm:px-4 py-2 rounded-full font-medium text-xs sm:text-sm">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                  <span>#1 Premium Laundry Service</span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  <span className="text-green-700">LAUNDRYKU</span> adalah{" "}
                  <span className="text-yellow-600 relative">
                    Laundry Kilo
                    <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-2 sm:h-3 bg-yellow-200 -skew-x-12 -z-10" />
                  </span>{" "}
                  berkonsep
                </h1>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full animate-bounce" />
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                    <p className="text-base sm:text-xl font-semibold text-green-700">High Quality, Hygiene, dan Halal</p>
                  </div>
                  <p className="text-sm sm:text-lg text-gray-600 leading-relaxed">
                    Yang memberikan layanan pencucian binatu higienis dengan harga terjangkau hanya dengan satu{" "}
                    <span className="text-green-700 font-semibold">Klik!</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  size="lg"
                  className="bg-green-800 hover:bg-green-900 text-white px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group text-sm sm:text-base"
                  onClick={() => window.open('tel:6281315494196', '_blank')}
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="allow-select">Hubungi Sekarang</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white bg-white px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                  onClick={() => window.open('https://www.instagram.com/laundrykupremium/', '_blank')}
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Lihat Gallery
                </Button>
              </div>
            </div>

            <div className="relative lg:ml-8 xl:ml-32">
              <div className="relative group">
                <Image
                  src="/images/laundry.png"
                  alt="Professional laundry team"
                  width={400}
                  height={320}
                  className="w-full max-w-sm sm:max-w-md h-auto rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-300"
                />

                {/* Floating Stats */}
                <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-white rounded-xl shadow-lg p-2 sm:p-4 border">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Award className="w-4 h-4 sm:w-6 sm:h-6 text-green-700" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-lg font-bold text-gray-900">99%</p>
                      <p className="text-xs text-gray-600">Customer Satisfaction</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-1 sm:-top-2 right-2 sm:right-4 md:-top-4 md:right-28 bg-yellow-400 text-green-900 px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl shadow-lg font-bold">
                  <div className="text-center">
                    <p className="text-xs md:text-sm font-bold">24H</p>
                    <p className="text-xs">Express</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features"
        className={`py-12 sm:py-16 bg-white transition-all duration-500 delay-100 ${
          visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`text-center space-y-3 sm:space-y-4 group transition-all duration-300 ${
                  visibleSections.has('features') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        id="services" 
        className={`py-12 sm:py-16 bg-gray-50 transition-all duration-500 delay-150 ${
          visibleSections.has('services') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full font-medium mb-3 sm:mb-4">
              Our Services
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Products & Services</h2>
            <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Layanan lengkap untuk semua kebutuhan pencucian Anda dengan standar kualitas tinggi dan harga terjangkau
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden hover:scale-105 ${
                  service.popular ? "ring-2 ring-yellow-400 transform scale-105" : ""
                } ${
                  visibleSections.has('services') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                {service.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-yellow-300 text-green-900 px-3 py-1 text-xs font-bold rounded-bl-lg">
                    POPULAR
                  </div>
                )}
                <CardContent className="p-4 sm:p-6 text-center space-y-3 sm:space-y-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-green-700" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900">{service.name}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">{service.description}</p>
                    <div className="text-lg sm:text-xl font-bold text-green-700">{service.price}</div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition-all bg-transparent rounded-full py-2 font-medium text-sm"
                  >
                    Info Lengkap
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Button 
              className="bg-green-800 hover:bg-green-900 text-white shadow-lg hover:shadow-xl transition-all rounded-full px-6 sm:px-8 py-2.5 sm:py-3 font-medium text-sm sm:text-base"
              onClick={() => window.open('https://www.instagram.com/laundrykupremium/', '_blank')}
            >
              <Instagram className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Follow @laundryku.premium untuk promo terbaru</span>
              <span className="sm:hidden">Follow Instagram</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        id="stats"
        className={`py-12 sm:py-16 bg-green-800 transition-all duration-500 delay-200 ${
          visibleSections.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center text-white">
            <div className="space-y-1 sm:space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                {customerCount.toLocaleString()}+
              </div>
              <div className="text-green-200 font-medium text-xs sm:text-sm">Happy Customers</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">99%</div>
              <div className="text-green-200 font-medium text-xs sm:text-sm">Satisfaction Rate</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">24h</div>
              <div className="text-green-200 font-medium text-xs sm:text-sm">Express Service</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">100%</div>
              <div className="text-green-200 font-medium text-xs sm:text-sm">Halal Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        id="testimonials"
        className={`py-12 sm:py-16 bg-white transition-all duration-500 delay-250 ${
          visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full font-medium mb-3 sm:mb-4">
              Testimonials
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Apa Kata Pelanggan Kami?</h2>
            <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Kepuasan pelanggan adalah prioritas utama kami. Lihat apa yang mereka katakan!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`bg-gray-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                  visibleSections.has('testimonials') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic text-sm sm:text-base">{testimonial.comment}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</p>
                        <p className="text-xs sm:text-sm text-gray-600">{testimonial.location}</p>
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-700" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pickup & Delivery Section */}
      <section 
        id="pickup" 
        className={`py-12 sm:py-16 bg-gradient-to-br from-green-50 via-yellow-50/30 to-green-50 transition-all duration-500 delay-300 ${
          visibleSections.has('pickup') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <Badge className="bg-yellow-100/80 text-yellow-800 hover:bg-yellow-100/80 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full font-medium">
                  <Truck className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  PICK UP & DELIVERY
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  <span className="text-yellow-600">HANYA</span> untuk wilayah <span className="text-yellow-600">Jakarta Selatan & Tangerang Selatan</span>
                </h2>
                <p className="text-sm sm:text-lg text-gray-600">
                  Layanan antar jemput <span className="font-semibold text-green-700">HANYA TERSEDIA</span> untuk wilayah Jakarta Selatan & Tangerang Selatan. 
                  GRATIS ongkir untuk minimal order 5kg. Untuk wilayah lain, silakan kunjungi outlet terdekat.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Pickup dalam 24 jam</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Respon cepat untuk kebutuhan mendesak</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Garansi keamanan barang 100%</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Barang Anda aman di tangan kami</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Kualitas terjamin atau uang kembali</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Garansi kepuasan 100%</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">GRATIS ongkir untuk order minimal 5kg</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Hanya untuk wilayah Jakarta Selatan & Tangerang Selatan</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  size="lg"
                  className="bg-yellow-400 hover:bg-yellow-500 text-green-900 px-6 sm:px-8 py-2.5 sm:py-3 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                  onClick={() => window.open('tel:6281315494196', '_blank')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="allow-select">0813-1549-4196</span>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-yellow-500 text-yellow-700 hover:bg-yellow-500 hover:text-green-900 bg-white px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                  onClick={() => window.open('https://api.whatsapp.com/send?phone=6281315494196', '_blank')}
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Chat WhatsApp
                </Button>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/LaundryKuu.png"
                alt="Pickup and delivery service"
                width={500}
                height={400}
                className="w-full h-auto rounded-2xl shadow-xl"
              />
              <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 md:-top-4 md:-right-4 bg-red-500 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl shadow-lg animate-pulse">
                <div className="text-center">
                  <p className="text-xs md:text-sm font-bold">GRATIS</p>
                  <p className="text-xs">ONGKIR!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outlets Section */}
      <section 
        id="locations" 
        className={`py-12 sm:py-16 bg-white transition-all duration-500 delay-350 ${
          visibleSections.has('locations') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full font-medium mb-3 sm:mb-4">
              Our Locations
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">OUTLETS</h2>
            <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Kunjungi outlet terdekat untuk layanan laundry terbaik dengan rating tinggi dari pelanggan
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {outlets.map((outlet, index) => (
              <Card
                key={index}
                className={`bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                  visibleSections.has('locations') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="text-center space-y-3 sm:space-y-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                      <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-green-700" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">{outlet.name}</h3>
                      <div className="flex items-center justify-center space-x-1 mb-1 sm:mb-2">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs sm:text-sm font-medium text-gray-700">
                          {outlet.rating} ({outlet.reviews} reviews)
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {outlet.address}
                        <br />
                        {outlet.city}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white bg-transparent rounded-full py-2 font-medium text-xs sm:text-sm"
                      onClick={() => {
                        const phoneNumber = index === 0 ? '6281315494196' : index === 1 ? '6281351702263' : '6281287266279';
                        window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}`, '_blank');
                      }}
                    >
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Hubungi
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-green-700 hover:bg-green-800 text-white rounded-full py-2 font-medium text-xs sm:text-sm"
                      onClick={() => {
                        const mapUrl = index === 0 ? 'https://maps.app.goo.gl/1xm3YBAJJeSbtVUf7' : index === 1 ? 'https://maps.app.goo.gl/EzG8XzGbLZiGB6mc7' : 'https://maps.app.goo.gl/uqFgksMmWrB5gAnc8';
                        window.open(mapUrl, '_blank');
                      }}
                    >
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Lokasi
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="cta"
        className={`py-12 sm:py-16 bg-green-800 text-white transition-all duration-500 delay-400 ${
          visibleSections.has('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Butuh Informasi Lebih Lanjut?</h2>
            <p className="text-sm sm:text-lg text-green-200">
              Hubungi kami untuk konsultasi gratis dan informasi lengkap tentang layanan laundry premium kami.
              <br />
              Tim customer service siap membantu Anda 24/7.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Button
                size="lg"
                className="bg-yellow-400 text-green-900 hover:bg-yellow-500 px-6 sm:px-8 py-2.5 sm:py-3 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                onClick={() => window.open('tel:6281315494196', '_blank')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Hubungi Kami
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-green-900 bg-transparent px-6 sm:px-8 py-2.5 sm:py-3 font-semibold rounded-full transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                onClick={() => window.open('https://api.whatsapp.com/send?phone=6281315494196', '_blank')}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Chat WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        id="footer"
        className={`bg-green-900 text-white py-8 sm:py-12 transition-all duration-500 delay-450 ${
          visibleSections.has('footer') ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
        }`} 
        style={{ backgroundColor: "#028446" }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <Image
                src="/images/laundryku-logo.png"
                alt="Laundryku Premium Logo"
                width={200}
                height={50}
                className="h-8 w-auto sm:h-10"
              />
              <p className="text-green-200 text-xs sm:text-sm">
                Layanan laundry premium dengan standar kualitas tinggi, higienis, dan halal. Dipercaya oleh 2500+
                pelanggan di seluruh Indonesia.
              </p>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-xs sm:text-sm text-green-200 ml-2">4.9/5 Rating</span>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-white text-sm sm:text-base">Services</h4>
              <ul className="space-y-1 sm:space-y-2 text-green-200 text-xs sm:text-sm">
                <li>Laundry Kilo</li>
                <li>Laundry Premium</li>
                <li>Pickup & Delivery</li>
                <li>Laundry Sepatu</li>
                <li>Laundry Karpet</li>
                <li>Laundry Perlengkapan Bayi</li>
              </ul>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-white text-sm sm:text-base">Contact</h4>
              <ul className="space-y-1 sm:space-y-2 text-green-200 text-xs sm:text-sm">
                <li className="flex items-center space-x-2">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="allow-select">0813-1549-4196</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="allow-select">@laundryku.premium</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>WhatsApp 24/7</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-white text-sm sm:text-base">Follow Us</h4>
              <div className="flex space-x-2 sm:space-x-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-green-900 bg-transparent w-8 h-8 sm:w-10 sm:h-10 rounded-xl p-0"
                  onClick={() => window.open('https://www.instagram.com/laundrykupremium/', '_blank')}
                >
                  <Instagram className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-green-900 bg-transparent w-8 h-8 sm:w-10 sm:h-10 rounded-xl p-0"
                  onClick={() => window.open('https://api.whatsapp.com/send?phone=6281315494196', '_blank')}
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </Button>
              </div>
              <div className="text-xs text-green-200">
                <p>Promo terbaru di Instagram!</p>
                <p>Respon WhatsApp dalam 5 menit</p>
              </div>
            </div>
          </div>

          <div className="border-t border-green-700 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center">
            <p className="text-green-200 text-xs sm:text-sm">Copyright © 2025 LAUNDRYKU. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Button
          size="lg"
          className="rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
          onClick={() => window.open('https://api.whatsapp.com/send?phone=6281315494196', '_blank')}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </Button>
      </div>
    </div>
  )
}

// Create a loading component with real-time progress
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Memuat layanan premium...")
  const [loadingStep, setLoadingStep] = useState(0)

  const loadingSteps = [
    "Memuat layanan premium...",
    "Menyiapkan katalog layanan...",
    "Memuat informasi outlet...",
    "Menyiapkan promo spesial...",
    "Hampir selesai..."
  ]

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        // Steady progress to 100%
        return prev + 2
      })
    }, 80) // Moderate speed - about 4 seconds total

    const textInterval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(textInterval)
          return prev
        }
        return prev + 1
      })
    }, 1000) // Change text every 1 second

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [])

  useEffect(() => {
    setLoadingText(loadingSteps[loadingStep])
  }, [loadingStep])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 font-sans flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-yellow-200 rounded-full opacity-30 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-green-300 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="text-center relative z-10">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/logo1.jpg"
            alt="LaundryKu Logo"
            width={96}
            height={96}
            className="w-24 h-24 rounded-2xl mx-auto mb-4 shadow-lg object-contain"
            priority
          />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">LaundryKu</h1>
          <p className="text-green-700 font-medium">Premium Laundry Service</p>
        </div>

        {/* Loading animation */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Progress bar */}
        <div className="w-64 bg-gray-200 rounded-full h-3 mx-auto mb-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-700 h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress percentage */}
        <p className="text-sm text-gray-600 mb-2" data-progress>{progress}%</p>

        {/* Loading text */}
        <p className="text-gray-600 font-medium transition-all duration-300">{loadingText}</p>
        <p className="text-sm text-gray-500 mt-2">Higienis • Halal • Berkualitas</p>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-yellow-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-green-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1.5s' }}></div>
    </div>
  )
}

// Export the client component with dynamic import to prevent hydration issues
export default dynamic(() => {
  return new Promise<typeof LaundryKuWebsiteClient>((resolve) => {
    // Simulate loading time - component will only load after progress reaches 100%
    const checkProgress = () => {
      const progressElement = document.querySelector('[data-progress]') as HTMLElement
      if (progressElement) {
        const progress = parseInt(progressElement.textContent?.replace('%', '') || '0')
        if (progress >= 100) {
          resolve(LaundryKuWebsiteClient)
        } else {
          setTimeout(checkProgress, 100)
        }
      } else {
        setTimeout(checkProgress, 100)
      }
    }
    
    // Start checking progress after a short delay
    setTimeout(checkProgress, 500)
  })
}, {
  ssr: false,
  loading: LoadingScreen
})
