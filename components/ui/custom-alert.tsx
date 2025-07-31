"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, X, AlertTriangle, Info, Star, Gift, Truck } from "lucide-react"
import Image from "next/image"

interface CustomAlertProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  type?: "success" | "error" | "info" | "warning"
  showIcon?: boolean
  showAnimation?: boolean
}

export function CustomAlert({
  isOpen,
  onClose,
  title,
  message,
  type = "success",
  showIcon = true,
  showAnimation = true
}: CustomAlertProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Add a small delay to ensure smooth entrance animation
      setTimeout(() => setIsAnimating(true), 50)
    } else {
      setIsAnimating(false)
      // Delay unmount for exit animation
      setTimeout(() => setIsVisible(false), 600)
    }
  }, [isOpen])

  const getAlertStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-gradient-to-br from-green-50 to-green-100",
          border: "border-green-300",
          icon: "bg-green-600",
          iconColor: "text-white",
          titleColor: "text-green-800",
          messageColor: "text-green-700",
          button: "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800",
          iconComponent: CheckCircle
        }
      case "error":
        return {
          bg: "bg-gradient-to-br from-red-50 to-red-100",
          border: "border-red-300",
          icon: "bg-red-600",
          iconColor: "text-white",
          titleColor: "text-red-800",
          messageColor: "text-red-700",
          button: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800",
          iconComponent: AlertTriangle
        }
      case "warning":
        return {
          bg: "bg-gradient-to-br from-yellow-50 to-yellow-100",
          border: "border-yellow-300",
          icon: "bg-yellow-600",
          iconColor: "text-white",
          titleColor: "text-yellow-800",
          messageColor: "text-yellow-700",
          button: "bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800",
          iconComponent: AlertTriangle
        }
      case "info":
        return {
          bg: "bg-gradient-to-br from-blue-50 to-blue-100",
          border: "border-blue-300",
          icon: "bg-blue-600",
          iconColor: "text-white",
          titleColor: "text-blue-800",
          messageColor: "text-blue-700",
          button: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
          iconComponent: Info
        }
      default:
        return {
          bg: "bg-gradient-to-br from-green-50 to-green-100",
          border: "border-green-300",
          icon: "bg-green-600",
          iconColor: "text-white",
          titleColor: "text-green-800",
          messageColor: "text-green-700",
          button: "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800",
          iconComponent: CheckCircle
        }
    }
  }

  const styles = getAlertStyles()
  const IconComponent = styles.iconComponent

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop with enhanced animation */}
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-500 ease-out ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Alert Modal with enhanced animations */}
      <div 
        className={`relative max-w-md w-full ${styles.bg} border-2 ${styles.border} rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-out ${
          isAnimating
            ? 'opacity-100 scale-100 translate-y-0 rotate-0' 
            : 'opacity-0 scale-75 translate-y-8 rotate-2'
        }`}
        style={{
          transformOrigin: 'center bottom'
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-16 h-16 bg-green-400 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-yellow-400 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-green-300 rounded-full"></div>
        </div>

        {/* Close Button with animation */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 ${
            isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        <div className="relative z-10 p-6">
          {/* Header with Logo */}
          <div className={`text-center mb-4 transition-all duration-700 ease-out ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '100ms' }}>
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Image
                src="/images/laundryku-logo.png"
                alt="LaundryKu Logo"
                width={80}
                height={20}
                className="h-6 w-auto"
              />
            </div>
            
            {showIcon && (
              <div className={`w-16 h-16 ${styles.icon} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transition-all duration-700 ${
                isAnimating ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
              }`}>
                <IconComponent className={`w-8 h-8 ${styles.iconColor}`} />
              </div>
            )}
          </div>

          {/* Content */}
          <div className={`text-center space-y-3 transition-all duration-700 ease-out ${
            isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '200ms' }}>
            <h3 className={`text-xl font-bold ${styles.titleColor} transition-all duration-500 ${
              isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`} style={{ transitionDelay: '300ms' }}>
              {title}
            </h3>
            <p className={`text-sm leading-relaxed ${styles.messageColor} transition-all duration-500 ${
              isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`} style={{ transitionDelay: '400ms' }}>
              {message}
            </p>
          </div>

          {/* Features for Success */}
          {type === "success" && (
            <div className={`mt-6 p-4 bg-white/50 rounded-xl border border-green-200 transition-all duration-700 ease-out ${
              isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`} style={{ transitionDelay: '500ms' }}>
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Star className="w-4 h-4 text-yellow-600 fill-current" />
                <span className="text-sm font-semibold text-green-800">Layanan Premium</span>
                <Star className="w-4 h-4 text-yellow-600 fill-current" />
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center space-x-1 text-green-700">
                  <CheckCircle className="w-3 h-3" />
                  <span>Higienis & Halal</span>
                </div>
                <div className="flex items-center space-x-1 text-green-700">
                  <Truck className="w-3 h-3" />
                  <span>Gratis Ongkir</span>
                </div>
                <div className="flex items-center space-x-1 text-green-700">
                  <Gift className="w-3 h-3" />
                  <span>Kualitas Premium</span>
                </div>
                <div className="flex items-center space-x-1 text-green-700">
                  <CheckCircle className="w-3 h-3" />
                  <span>24H Express</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className={`mt-6 transition-all duration-500 ${
            isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`} style={{ transitionDelay: '600ms' }}>
            <Button
              onClick={onClose}
              className={`w-full ${styles.button} text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mengerti
            </Button>
          </div>

          {/* Footer */}
          <div className={`mt-4 text-center transition-all duration-500 ${
            isAnimating ? 'opacity-100' : 'opacity-0'
          }`} style={{ transitionDelay: '700ms' }}>
            <p className="text-xs text-gray-500">
              LaundryKu Premium - Higienis • Halal • Berkualitas
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook untuk menggunakan custom alert
export function useCustomAlert() {
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success" as const,
    showIcon: true,
    showAnimation: true
  })

  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "info" | "warning" = "success",
    showIcon: boolean = true,
    showAnimation: boolean = true
  ) => {
    setAlertState({
      isOpen: true,
      title,
      message,
      type,
      showIcon,
      showAnimation
    })
  }

  const hideAlert = () => {
    setAlertState(prev => ({ ...prev, isOpen: false }))
  }

  const AlertComponent = () => (
    <CustomAlert
      isOpen={alertState.isOpen}
      onClose={hideAlert}
      title={alertState.title}
      message={alertState.message}
      type={alertState.type}
      showIcon={alertState.showIcon}
      showAnimation={alertState.showAnimation}
    />
  )

  return {
    showAlert,
    hideAlert,
    AlertComponent
  }
} 