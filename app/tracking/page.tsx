"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Clock, Truck, Package, Home, ArrowLeft, Search, Phone, MessageCircle, Star, MapPin, Zap, Shield, Gift } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCustomAlert } from "@/components/ui/custom-alert"

export default function TrackingPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isSearching, setIsSearching] = useState(false)
  // Tambah state untuk animasi transisi
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)
  
  const { showAlert, AlertComponent } = useCustomAlert()

  // Animasi transisi masuk
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
      setIsAnimating(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Mock order data
  const mockOrder = {
    orderNumber: "LK-2025-001",
    customerName: "Sarah M.",
    phoneNumber: "0812-3456-7890",
    service: "Laundry Premium",
    weight: "3.5 kg",
    totalAmount: "Rp 42.000",
    pickupAddress: "Jl. Sudirman No. 123, Jakarta Selatan",
    pickupDate: "15 Januari 2025",
    pickupTime: "14:00 - 16:00",
    estimatedDelivery: "17 Januari 2025",
    status: "processing", // pending, pickup, processing, ready, delivered
    timeline: [
      {
        step: "Order Diterima",
        description: "Pesanan Anda telah diterima dan sedang diproses",
        time: "15 Jan 2025, 14:30",
        status: "completed",
        icon: CheckCircle,
      },
      {
        step: "Pickup",
        description: "Tim kami akan mengambil pesanan Anda",
        time: "15 Jan 2025, 16:00",
        status: "completed",
        icon: Truck,
      },
      {
        step: "Proses Cuci",
        description: "Pesanan sedang dalam proses pencucian",
        time: "16 Jan 2025, 09:00",
        status: "current",
        icon: Package,
      },
      {
        step: "Siap Diantar",
        description: "Pesanan telah selesai dan siap diantar",
        time: "17 Jan 2025, 10:00",
        status: "pending",
        icon: Home,
      },
      {
        step: "Terkirim",
        description: "Pesanan telah diantar ke alamat Anda",
        time: "17 Jan 2025, 14:00",
        status: "pending",
        icon: CheckCircle,
      },
    ],
  }

  const handleSearch = () => {
    if (orderNumber && phoneNumber) {
      setIsSearching(true)
      // Simulate API call
      setTimeout(() => {
        setIsSearching(false)
        if (orderNumber === "LK-2025-001" && phoneNumber === "0812-3456-7890") {
          setSearchResult(mockOrder) // Set search result for display
        } else {
          showAlert(
            "❌ Pesanan Tidak Ditemukan",
            "Nomor pesanan atau nomor telepon tidak sesuai. Silakan cek kembali data Anda atau hubungi customer service kami.",
            "error",
            true,
            false
          )
        }
      }, 1500)
    } else {
      showAlert(
        "⚠️ Data Tidak Lengkap",
        "Mohon lengkapi nomor pesanan dan nomor telepon untuk melacak pesanan Anda.",
        "warning",
        true,
        false
      )
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100 border-green-300"
      case "current":
        return "text-blue-600 bg-blue-100 border-blue-300"
      case "pending":
        return "text-gray-400 bg-gray-100 border-gray-300"
      default:
        return "text-gray-400 bg-gray-100 border-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "current":
        return <Clock className="w-5 h-5 text-blue-600" />
      case "pending":
        return <Clock className="w-5 h-5 text-gray-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 relative overflow-hidden transition-all duration-1000 ${
      isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      {/* Background Decorative Elements */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 delay-200 ${
        isPageLoaded ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute top-20 right-20 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-yellow-200 rounded-full opacity-30 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-green-300 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 right-10 w-12 h-12 bg-green-400 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Header */}
      <header className={`shadow-lg relative z-10 transition-all duration-1000 delay-300 ${
        isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
      }`} style={{ backgroundColor: '#028446' }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2 hover:bg-green-500/20 p-2 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Kembali</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Image
                src="/images/laundryku-logo.png"
                alt="LaundryKu Logo"
                width={120}
                height={30}
                className="h-8 w-auto"
              />
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className={`container mx-auto px-4 py-8 relative z-10 transition-all duration-1000 delay-700 ${
        isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="max-w-5xl mx-auto">
          {/* Search Section */}
          {!searchResult && (
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium text-sm">
                  <Search className="w-4 h-4" />
                  <span>Lacak Pesanan Anda</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Lacak Pesanan</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Masukkan nomor pesanan dan nomor telepon untuk melacak status pesanan Anda secara real-time.
                </p>
              </div>

              <Card className="max-w-md mx-auto border-2 border-green-200 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-green-50 to-yellow-50">
                  <CardTitle className="flex items-center space-x-3 text-green-800">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <Search className="w-5 h-5 text-white" />
                    </div>
                    <span>Cari Pesanan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <Label htmlFor="orderNumber" className="text-sm font-semibold text-gray-700">Nomor Pesanan</Label>
                    <Input
                      id="orderNumber"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="Contoh: LK-2025-001"
                      className="mt-2 border-2 border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700">Nomor Telepon</Label>
                    <Input
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="0812-3456-7890"
                      className="mt-2 border-2 border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <Button
                    onClick={handleSearch}
                    disabled={!orderNumber || !phoneNumber || isSearching}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSearching ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Mencari...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Search className="w-4 h-4" />
                        <span>Lacak Pesanan</span>
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Demo Order */}
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-3">Demo: Gunakan data berikut untuk testing</p>
                <div className="bg-gradient-to-r from-yellow-50 to-green-50 rounded-xl p-6 max-w-md mx-auto border-2 border-yellow-200 shadow-lg">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Star className="w-4 h-4 text-yellow-600 fill-current" />
                    <span className="font-semibold text-gray-700">Data Testing</span>
                    <Star className="w-4 h-4 text-yellow-600 fill-current" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Nomor Pesanan: <span className="text-green-600 font-bold">LK-2025-001</span>
                    </p>
                    <p className="text-sm font-medium">
                      Telepon: <span className="text-green-600 font-bold">0812-3456-7890</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold text-center mb-6">Fitur Tracking LaundryKu</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
                      <Clock className="w-8 h-8 text-green-900" />
                    </div>
                    <h4 className="font-semibold">Real-time Tracking</h4>
                    <p className="text-sm text-green-100">Pantau status pesanan secara real-time</p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
                      <MapPin className="w-8 h-8 text-green-900" />
                    </div>
                    <h4 className="font-semibold">Lokasi Tepat</h4>
                    <p className="text-sm text-green-100">Ketahui lokasi pesanan Anda</p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
                      <Zap className="w-8 h-8 text-green-900" />
                    </div>
                    <h4 className="font-semibold">Notifikasi Cepat</h4>
                    <p className="text-sm text-green-100">Dapatkan update status otomatis</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Order Details */}
          {searchResult && (
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Pesanan Ditemukan</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Status Pesanan</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Detail dan timeline pesanan Anda. Pantau setiap tahap proses dengan mudah.
                </p>
              </div>

              {/* Order Summary */}
              <Card className="border-2 border-green-200 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-green-50 to-yellow-50">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-green-800">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <span>Detail Pesanan</span>
                    </div>
                    <Badge className="bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 px-4 py-1 font-bold shadow-lg">
                      {searchResult.status === "processing" ? "Sedang Diproses" : "Selesai"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 font-medium">Nomor Pesanan:</span>
                        <span className="font-bold text-gray-900">{searchResult.orderNumber}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 font-medium">Nama:</span>
                        <span className="font-bold text-gray-900">{searchResult.customerName}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 font-medium">Layanan:</span>
                        <span className="font-bold text-gray-900">{searchResult.service}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 font-medium">Berat:</span>
                        <span className="font-bold text-gray-900">{searchResult.weight}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-2 border-green-200">
                        <span className="text-gray-600 font-medium">Total Bayar:</span>
                        <span className="font-bold text-green-700 text-lg">{searchResult.totalAmount}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 font-medium">Pickup:</span>
                        <span className="font-bold text-gray-900">{searchResult.pickupDate}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 font-medium">Waktu:</span>
                        <span className="font-bold text-gray-900">{searchResult.pickupTime}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                        <span className="text-gray-600 font-medium">Estimasi Selesai:</span>
                        <span className="font-bold text-yellow-700">{searchResult.estimatedDelivery}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-green-700 bg-green-50 p-3 rounded-lg border-2 border-green-200">
                        <Phone className="w-4 h-4 text-green-600" />
                        <span className="font-semibold">Tim kami akan menghubungi Anda ketika laundry selesai</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="border-2 border-green-200 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-green-50 to-yellow-50">
                  <CardTitle className="flex items-center space-x-3 text-green-800">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <span>Timeline Pesanan</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {searchResult.timeline.map((item: any, index: number) => (
                      <div key={index} className="flex items-start space-x-4 relative">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${getStatusColor(item.status)}`}>
                          <item.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-bold text-gray-900">{item.step}</h4>
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{item.time}</span>
                          </div>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                        {index < searchResult.timeline.length - 1 && (
                          <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Support */}
              <Card className="border-2 border-green-200 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-green-50 to-yellow-50">
                  <CardTitle className="flex items-center space-x-3 text-green-800">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <span>Butuh Bantuan?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button
                      onClick={() => window.open('tel:6281315494196', '_blank')}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Hubungi Kami
                    </Button>
                    <Button
                      onClick={() => window.open('https://api.whatsapp.com/send?phone=6281315494196', '_blank')}
                      variant="outline"
                      className="w-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat WhatsApp
                    </Button>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Tim customer service siap membantu Anda 24/7</p>
                  </div>
                </CardContent>
              </Card>

              {/* Back to Search */}
              <div className="text-center">
                <Button
                  onClick={() => {
                    setSearchResult(null)
                    setOrderNumber("")
                    setPhoneNumber("")
                  }}
                  variant="outline"
                  className="px-8 py-3 border-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-500 rounded-full font-semibold"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Lacak Pesanan Lain
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Custom Alert */}
      <AlertComponent />
    </div>
  )
} 