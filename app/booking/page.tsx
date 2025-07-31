"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Phone, MapPin, Clock, Truck, Shirt, Package, Baby, Bed, Home, Sparkles, CheckCircle, ArrowLeft, Star, Gift, Zap, Shield } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import Image from "next/image"
import Link from "next/link"
import { useCustomAlert } from "@/components/ui/custom-alert"
import dynamic from "next/dynamic"

const MapsPicker = dynamic(() => import("@/components/ui/maps-picker"), { ssr: false })

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState("")
  const [pickupDate, setPickupDate] = useState<Date>()
  const [pickupTime, setPickupTime] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")
  const [notes, setNotes] = useState("")
  const [step, setStep] = useState(1)
  const [isAllowedArea, setIsAllowedArea] = useState<null | boolean>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [showLocationModal, setShowLocationModal] = useState<boolean>(true)
  // Tambah state untuk animasi transisi
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(true)
  
  // Tambah state untuk area/kota
  const [selectedCity, setSelectedCity] = useState("");
  const [showAreaValidationModal, setShowAreaValidationModal] = useState(false);
  const [selectedAreaData, setSelectedAreaData] = useState<{city?: string; district?: string; isPickupSupported: boolean} | null>(null);
  const pickupCities = ["Jakarta Selatan", "Tangerang Selatan"];
  const allCities = [
    "Jakarta Selatan",
    "Tangerang Selatan",
    "Jakarta Barat",
    "Jakarta Timur",
    "Jakarta Utara",
    "Jakarta Pusat",
    "Lainnya"
  ];
  
  const { showAlert, AlertComponent } = useCustomAlert()
  const router = useRouter();

  // Animasi transisi masuk
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
      setIsAnimating(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const services = [
    {
      id: "kilo",
      name: "Laundry Kilo",
      description: "Cuci per kilogram dengan harga terjangkau",
      price: "8.000/kg",
      icon: Shirt,
      popular: false,
      features: ["Higienis", "Halal", "Cepat"]
    },
    {
      id: "premium",
      name: "Laundry Premium",
      description: "Layanan premium dengan perawatan khusus",
      price: "12.000/kg",
      icon: Sparkles,
      popular: true,
      features: ["Premium Care", "Softener", "Ironing"]
    },
    {
      id: "sepatu",
      name: "Laundry Sepatu",
      description: "Pembersihan sepatu profesional",
      price: "25.000/pasang",
      icon: Package,
      popular: false,
      features: ["Deep Clean", "Deodorize", "Protection"]
    },
    {
      id: "karpet",
      name: "Laundry Karpet",
      description: "Pembersihan karpet mendalam",
      price: "15.000/m²",
      icon: Home,
      popular: false,
      features: ["Stain Removal", "Fresh Scent", "Anti-Bacterial"]
    },
    {
      id: "bayi",
      name: "Laundry Perlengkapan Bayi",
      description: "Perawatan khusus untuk bayi",
      price: "10.000/kg",
      icon: Baby,
      popular: false,
      features: ["Baby Safe", "Hypoallergenic", "Gentle"]
    },
    {
      id: "bedcover",
      name: "Laundry Bed Cover",
      description: "Cuci bed cover dan sprei",
      price: "20.000/set",
      icon: Bed,
      popular: false,
      features: ["Deep Clean", "Fresh Scent", "Soft Touch"]
    },
  ]

  const timeSlots = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
    "18:00 - 20:00",
  ]

  const selectedServiceData = services.find(s => s.id === selectedService)

  const handleNext = () => {
    if (step === 1 && selectedService) {
      setStep(2)
    } else if (step === 2 && pickupDate && pickupTime) {
      setStep(3)
    } else if (step === 3 && pickupDate && pickupTime) {
      setStep(4)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    // Simulate booking submission
    showAlert(
      "🎉 Booking Berhasil!",
      `Terima kasih ${customerName}! Pesanan Anda telah berhasil dibuat. Tim kami akan menghubungi Anda segera untuk konfirmasi pickup.`,
      "success",
      true,
      true
    )
    // Redirect ke halaman utama setelah 2 detik
    setTimeout(() => {
      router.push('/');
    }, 2000);
  }

  // Area boundaries (approximate, can be refined)
  // South Jakarta: lat -6.35 to -6.30, lng 106.75 to 106.85
  // South Tangerang: lat -6.40 to -6.25, lng 106.60 to 106.80
  function isInAllowedArea(lat: number, lng: number) {
    // South Jakarta
    if (lat >= -6.35 && lat <= -6.20 && lng >= 106.75 && lng <= 106.90) return true;
    // South Tangerang
    if (lat >= -6.40 && lat <= -6.20 && lng >= 106.60 && lng <= 106.80) return true;
    return false;
  }

  // Check if user has already responded to location modal
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const locFlag = localStorage.getItem('laundryku_location_modal')
      if (locFlag === 'closed') setShowLocationModal(false)
    }
  }, [])

  // Only run geolocation if modal is closed and not already checked
  useEffect(() => {
    if (!showLocationModal && isAllowedArea === null && typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          if (isInAllowedArea(latitude, longitude)) {
            setIsAllowedArea(true)
          } else {
            setIsAllowedArea(false)
          }
        },
        (err) => {
          setLocationError('Kami membutuhkan izin lokasi untuk menentukan ketersediaan layanan pickup & delivery.')
          setIsAllowedArea(false)
        },
        { enableHighAccuracy: false, timeout: 7000 }
      )
    }
  }, [showLocationModal, isAllowedArea])

  // Handler for modal actions
  const handleAllowLocation = () => {
    setShowLocationModal(false)
    localStorage.setItem('laundryku_location_modal', 'closed')
    // Geolocation will run in useEffect after modal closed
  }
  const handleCloseModal = () => {
    setShowLocationModal(false)
    localStorage.setItem('laundryku_location_modal', 'closed')
  }

  const [mapsLocation, setMapsLocation] = useState<{ lat: number; lng: number; city?: string; district?: string; address?: string }>({ lat: -6.3, lng: 106.8 });

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 relative overflow-hidden transition-all duration-1000 ${
        isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      suppressHydrationWarning
    >
      {/* Background Decorative Elements */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 delay-200 ${
          isPageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        suppressHydrationWarning
      >
        <div className="absolute top-20 right-20 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-yellow-200 rounded-full opacity-30 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-green-300 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 right-10 w-12 h-12 bg-green-400 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Header */}
      <header 
        className={`shadow-lg relative z-10 transition-all duration-1000 delay-300 ${
          isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        }`} 
        style={{ backgroundColor: '#028446' }}
        suppressHydrationWarning
      >
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

      {/* Progress Steps */}
      <div 
        className={`bg-gradient-to-r from-green-600 to-green-700 text-white relative z-10 transition-all duration-1000 delay-500 ${
          isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        suppressHydrationWarning
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  step >= stepNumber 
                    ? 'bg-yellow-400 text-green-900 shadow-lg scale-110' 
                    : 'bg-white/20 text-white'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 h-1 mx-3 rounded-full transition-all duration-300 ${
                    step > stepNumber ? 'bg-yellow-400' : 'bg-white/20'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-3 space-x-8 text-sm">
            <span className={`transition-all duration-300 ${step >= 1 ? 'text-yellow-300 font-semibold' : 'text-white/70'}`}>Pilih Layanan</span>
            <span className={`transition-all duration-300 ${step >= 2 ? 'text-yellow-300 font-semibold' : 'text-white/70'}`}>Pilih Kota/Area</span>
            <span className={`transition-all duration-300 ${step >= 3 ? 'text-yellow-300 font-semibold' : 'text-white/70'}`}>Jadwal Pickup</span>
            <span className={`transition-all duration-300 ${step >= 4 ? 'text-yellow-300 font-semibold' : 'text-white/70'}`}>Data Pelanggan</span>
          </div>
        </div>
      </div>

      <div 
        className={`container mx-auto px-4 py-8 relative z-10 transition-all duration-1000 delay-700 ${
          isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        suppressHydrationWarning
      >
        <div className="max-w-5xl mx-auto">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className={`space-y-8 transition-all duration-1000 delay-900 ${
              isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="text-center space-y-4">
                <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-medium text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Pilih Layanan Favorit Anda</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Pilih Layanan</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Pilih layanan laundry yang sesuai dengan kebutuhan Anda. Setiap layanan kami dijamin higienis, halal, dan berkualitas tinggi.
                </p>
              </div>

              {/* Service Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                      selectedService === service.id
                        ? 'ring-2 ring-green-500 bg-gradient-to-br from-green-50 to-yellow-50 border-green-300 scale-105'
                        : 'hover:scale-105 border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <CardContent className="p-6 text-center relative">
                      {service.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 hover:from-yellow-500 hover:to-yellow-600 px-4 py-1 font-bold shadow-lg">
                            <Gift className="w-3 h-3 mr-1" />
                            POPULAR
                          </Badge>
                        </div>
                      )}
                      
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                        selectedService === service.id 
                          ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg' 
                          : 'bg-gradient-to-br from-green-100 to-green-200'
                      }`}>
                        <service.icon className={`w-10 h-10 transition-all duration-300 ${
                          selectedService === service.id ? 'text-white' : 'text-green-700'
                        }`} />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      
                      <div className="text-2xl font-bold text-green-700 mb-4">{service.price}</div>
                      
                      {/* Features */}
                      <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {service.features.map((feature, index) => (
                          <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className={`w-full h-1 rounded-full transition-all duration-300 ${
                        selectedService === service.id ? 'bg-gradient-to-r from-green-500 to-yellow-500' : 'bg-gray-200'
                      }`}></div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Why Choose Us */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold text-center mb-6">Mengapa Memilih LaundryKu?</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
                      <Shield className="w-8 h-8 text-green-900" />
                    </div>
                    <h4 className="font-semibold">Terpercaya</h4>
                    <p className="text-sm text-green-100">Halal certified & quality guaranteed</p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
                      <Zap className="w-8 h-8 text-green-900" />
                    </div>
                    <h4 className="font-semibold">Cepat</h4>
                    <p className="text-sm text-green-100">Express service dalam 24 jam</p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto">
                      <Truck className="w-8 h-8 text-green-900" />
                    </div>
                    <h4 className="font-semibold">Gratis Ongkir</h4>
                    <p className="text-sm text-green-100">Minimal order 5kg untuk Jakarta Selatan & Tangerang Selatan</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedService}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Lanjutkan</span>
                  <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Pilih Kota/Area */}
          {step === 2 && (
            <div className={`space-y-8 transition-all duration-1000 delay-300 ${
              isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="text-center space-y-4">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>Pilih Lokasi Anda</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Pilih Lokasi</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Pilih lokasi Anda pada peta atau cari alamat. Pickup & delivery hanya tersedia untuk Jakarta Selatan & Tangerang Selatan.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-full max-w-xl">
                  <MapsPicker
                    value={mapsLocation}
                    onChange={(loc) => setMapsLocation(loc)}
                  />
                </div>
                <div className="text-green-800 text-base font-medium mt-2">
                  {mapsLocation.city || mapsLocation.district
                    ? `Kota/Area terdeteksi: ${mapsLocation.city || ""}${mapsLocation.district ? ` (${mapsLocation.district})` : ""}`
                    : "Pilih lokasi pada peta atau cari alamat di atas."}
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="px-8 py-3 border-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-500 rounded-full font-semibold"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Kembali
                </Button>
                <Button
                  onClick={() => {
                    const isPickupSupported = ["Jakarta Selatan", "Tangerang Selatan"].includes(mapsLocation.city || "") ||
                      ["Jakarta Selatan", "Tangerang Selatan"].includes(mapsLocation.district || "");
                    
                    setSelectedAreaData({
                      city: mapsLocation.city,
                      district: mapsLocation.district,
                      isPickupSupported
                    });
                    setShowAreaValidationModal(true);
                  }}
                  disabled={!(mapsLocation.city || mapsLocation.district)}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Lanjutkan</span>
                  <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Jadwal Pickup (hanya jika area pickup) */}
          {step === 3 && pickupCities.includes(selectedCity) && (
            <div className={`space-y-8 transition-all duration-1000 delay-300 ${
              isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Hapus warning merah dan locationError di step ini */}
              {/* Jadwal Pickup UI */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Jadwalkan Pickup Anda</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Jadwal Pickup</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Pilih tanggal dan waktu pickup yang sesuai dengan jadwal Anda. Tim kami akan mengambil pesanan tepat waktu.
                </p>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-2 border-green-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-yellow-50">
                    <CardTitle className="flex items-center space-x-3 text-green-800">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <CalendarIcon className="w-5 h-5 text-white" />
                      </div>
                      <span>Pilih Tanggal</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Calendar
                      mode="single"
                      selected={pickupDate}
                      onSelect={setPickupDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border-0"
                      classNames={{
                        day_selected: "bg-green-600 text-white hover:bg-green-700",
                        day_today: "bg-yellow-100 text-green-900 font-bold",
                        day: "hover:bg-green-100 rounded-md",
                      }}
                    />
                  </CardContent>
                </Card>
                <Card className="border-2 border-green-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-yellow-50">
                    <CardTitle className="flex items-center space-x-3 text-green-800">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <span>Pilih Waktu</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={pickupTime === time ? "default" : "outline"}
                          onClick={() => setPickupTime(time)}
                          className={`justify-start h-12 transition-all duration-300 ${
                            pickupTime === time 
                              ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg' 
                              : 'border-green-300 text-green-700 hover:bg-green-50 hover:border-green-500'
                          }`}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              {/* Selected Service Summary */}
              {selectedServiceData && (
                <Card className="bg-gradient-to-r from-yellow-50 to-green-50 border-2 border-yellow-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center">
                          <selectedServiceData.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{selectedServiceData.name}</h3>
                          <p className="text-green-700 font-semibold">{selectedServiceData.price}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Layanan Terpilih</p>
                        <p className="text-lg font-bold text-green-700">✓ Dipilih</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              <div className="flex justify-between">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="px-8 py-3 border-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-500 rounded-full font-semibold"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Kembali
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!pickupDate || !pickupTime}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Lanjutkan ke Data Pelanggan</span>
                  <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Data Pelanggan */}
          {((step === 3 && !pickupCities.includes(selectedCity)) || step === 4) && (
            <div className={`space-y-8 transition-all duration-1000 delay-300 ${
              isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {/* Info jika area bukan pickup */}
              {!pickupCities.includes(selectedCity) && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center shadow-lg animate-fade-in">
                  <div className="flex flex-col items-center space-y-3">
                    <Truck className="w-10 h-10 text-red-500 mb-2" />
                    <h2 className="text-xl font-bold text-red-700 mb-1">Layanan Pickup & Delivery Tidak Tersedia</h2>
                    <p className="text-red-700 font-medium">Maaf, layanan pickup & delivery <span className="font-bold">hanya tersedia</span> untuk wilayah <span className="text-green-700">Jakarta Selatan & Tangerang Selatan</span>.<br/>Silakan kunjungi outlet terdekat kami.</p>
                    <Link href="/" className="mt-3 inline-block">
                      <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-6 py-2">
                        Lihat Lokasi Outlet
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
              {/* ... existing form data pelanggan ... */}

              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-2 border-green-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-yellow-50">
                    <CardTitle className="flex items-center space-x-3 text-green-800">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <span>Informasi Pelanggan</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Nama Lengkap</Label>
                      <Input
                        id="name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Masukkan nama lengkap"
                        className="mt-2 border-2 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="0812-3456-7890"
                        className="mt-2 border-2 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-sm font-semibold text-gray-700">Alamat Pickup</Label>
                      <Textarea
                        id="address"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder="Masukkan alamat lengkap untuk pickup"
                        rows={3}
                        className="mt-2 border-2 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes" className="text-sm font-semibold text-gray-700">Catatan Tambahan</Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Instruksi khusus atau catatan tambahan"
                        rows={2}
                        className="mt-2 border-2 border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-yellow-50">
                    <CardTitle className="flex items-center space-x-3 text-green-800">
                      <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span>Ringkasan Pesanan</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {selectedServiceData && (
                      <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl p-4 border-2 border-green-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                              <selectedServiceData.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{selectedServiceData.name}</p>
                              <p className="text-sm text-gray-600">{selectedServiceData.price}</p>
                            </div>
                          </div>
                          {selectedServiceData.popular && (
                            <Badge className="bg-yellow-400 text-green-900">POPULAR</Badge>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="w-4 h-4 text-green-600" />
                          <span className="text-gray-600">Tanggal Pickup:</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          {pickupDate ? format(pickupDate, 'dd MMMM yyyy', { locale: id }) : '-'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-green-600" />
                          <span className="text-gray-600">Waktu Pickup:</span>
                        </div>
                        <span className="font-semibold text-gray-900">{pickupTime || '-'}</span>
                      </div>
                    </div>

                    <div className="border-t-2 border-green-200 pt-4 space-y-3">
                      <div className="flex items-center space-x-2 text-sm text-green-700">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-semibold">Gratis ongkir untuk order minimal 5kg</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-green-700">
                        <Truck className="w-4 h-4 text-green-600" />
                        <span>Hanya untuk Jakarta Selatan & Tangerang Selatan</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-green-700">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span>Garansi keamanan barang 100%</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-green-700">
                        <Phone className="w-4 h-4 text-green-600" />
                        <span className="font-semibold">Tim kami akan menghubungi Anda ketika laundry selesai</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="px-8 py-3 border-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-500 rounded-full font-semibold"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Kembali
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!customerName || !customerPhone || !customerAddress}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-10 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Konfirmasi Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Custom Alert */}
      <AlertComponent />

      {/* Modal Custom Izin Lokasi */}
      {showLocationModal && (
        <div className={`fixed inset-0 z-[9999] flex items-start justify-center min-h-screen bg-black/60 backdrop-blur-sm transition-all duration-500 ${
          isPageLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className={`bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 border-4 border-green-500 relative transition-all duration-700 delay-200 mt-60 ${
            isPageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <MapPin className="w-8 h-8 text-green-700" />
              </div>
              <h2 className="text-2xl font-bold text-green-800">Bagikan Lokasi Anda</h2>
              <p className="text-green-700 font-medium">Bagikan lokasi Anda agar kami bisa menampilkan layanan pickup & delivery yang tersedia di area Anda.</p>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105 mt-2"
                onClick={handleAllowLocation}
              >
                Izinkan Lokasi
              </Button>
              <button
                className="text-sm text-green-700 hover:underline mt-2"
                onClick={handleCloseModal}
              >
                Nanti Saja
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Area Validation */}
      {showAreaValidationModal && selectedAreaData && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-500 animate-fade-in">
          <div className={`bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 border-4 relative transition-all duration-700 delay-200 ${
            showAreaValidationModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Icon dan warna berdasarkan status pickup */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all duration-500 delay-300 ${
                selectedAreaData.isPickupSupported 
                  ? 'bg-green-100' 
                  : 'bg-yellow-100'
              }`}>
                <Truck className={`w-8 h-8 transition-all duration-500 delay-400 ${
                  selectedAreaData.isPickupSupported 
                    ? 'text-green-700' 
                    : 'text-yellow-700'
                }`} />
              </div>
              
              {/* Judul */}
              <h2 className={`text-2xl font-bold transition-all duration-500 delay-500 ${
                selectedAreaData.isPickupSupported 
                  ? 'text-green-800' 
                  : 'text-yellow-800'
              }`}>
                {selectedAreaData.isPickupSupported 
                  ? 'Layanan Pickup Tersedia! 🎉' 
                  : 'Layanan Pickup Tidak Tersedia'
                }
              </h2>
              
              {/* Pesan */}
              <p className={`font-medium transition-all duration-500 delay-600 ${
                selectedAreaData.isPickupSupported 
                  ? 'text-green-700' 
                  : 'text-yellow-700'
              }`}>
                {selectedAreaData.isPickupSupported 
                  ? `Wilayah ${selectedAreaData.city || selectedAreaData.district} mendukung layanan pickup & delivery. Tim kami akan mengambil pesanan Anda.`
                  : `Wilayah ${selectedAreaData.city || selectedAreaData.district} belum mendukung layanan pickup & delivery. Silakan kunjungi outlet terdekat kami.`
                }
              </p>
              
              {/* Tombol */}
              <div className="flex flex-col w-full space-y-2 mt-4 transition-all duration-500 delay-700">
                {selectedAreaData.isPickupSupported ? (
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105"
                    onClick={() => {
                      const city = selectedAreaData.city || selectedAreaData.district || "";
                      setSelectedCity(city);
                      setShowAreaValidationModal(false);
                      setStep(3);
                    }}
                  >
                    Lanjutkan ke Pickup
                  </Button>
                ) : null}
                
                <Button
                  variant="outline"
                  className={`w-full py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                    selectedAreaData.isPickupSupported
                      ? 'border-green-300 text-green-700 hover:bg-green-50 hover:border-green-500'
                      : 'border-yellow-300 text-yellow-700 hover:bg-yellow-50 hover:border-yellow-500'
                  }`}
                  onClick={() => {
                    setShowAreaValidationModal(false);
                    setSelectedAreaData(null);
                  }}
                >
                  Pilih Lokasi Lain
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 