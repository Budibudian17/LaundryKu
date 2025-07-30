<div align="center">
  <img src="public/images/laundryku-logo.png" alt="LaundryKu Premium Logo" width="300" height="80" style="border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
  
  # 🧺 LaundryKu Premium
  
  ### Premium Laundry Service Website
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
  
  *Higienis • Halal • Berkualitas*
</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Getting Started](#-getting-started)
- [🛠️ Tech Stack](#️-tech-stack)
- [📱 Screenshots](#-screenshots)
- [🎨 Design System](#-design-system)
- [📦 Installation](#-installation)
- [🔧 Configuration](#-configuration)
- [📄 License](#-license)
- [🤝 Contributing](#-contributing)
- [📞 Contact](#-contact)

---

## ✨ Features

### 🎯 Core Features
- **Modern Responsive Design** - Works perfectly on all devices
- **Scroll-triggered Animations** - Smooth reveal animations on scroll
- **Interactive Elements** - Hover effects and micro-interactions
- **Loading Screen** - Beautiful branded loading experience
- **SEO Optimized** - Meta tags and structured data
- **Anti-Inspect Protection** - Advanced security to prevent developer tools access
- **Privacy Protection** - Comprehensive measures to protect website content

### 🧺 Laundry Services
- **Laundry Kilo** - Affordable per-kilogram service
- **Laundry Premium** - Premium care with special treatment
- **Pickup & Delivery** - Free pickup for Jakarta Selatan & Tangerang Selatan
- **Specialized Services** - Shoes, carpets, baby items, strollers, bed covers, curtains

### 📍 Location Features
- **Multiple Outlets** - Cirendeu, Bona Indah, Karet Pedurenan
- **Interactive Maps** - Direct links to Google Maps
- **WhatsApp Integration** - Direct contact buttons
- **Instagram Gallery** - Social media integration

### 🛡️ Security Features
- **Anti-Inspect Protection** - Prevents F12, Ctrl+Shift+I, and other developer tools
- **Right-Click Disabled** - Protects content from context menu access
- **Text Selection Control** - Prevents unauthorized copying with selective enable
- **DevTools Detection** - Automatically detects and responds to developer tools
- **Console Protection** - Monitors and prevents console access
- **Privacy Warning Modal** - User-friendly security notifications with laundry theme

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Quick Start
```bash
# Clone the repository
git clone https://github.com/yourusername/laundryku.git
cd laundryku

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000
```

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | Next.js | 14 |
| **Language** | TypeScript | 5.0 |
| **Styling** | Tailwind CSS | 3.3 |
| **UI Components** | shadcn/ui | Latest |
| **Icons** | Lucide React | Latest |
| **Package Manager** | pnpm | Latest |

</div>

### 🎨 Design Tools
- **Figma** - Design system and components
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **Lucide Icons** - Beautiful icon set

---

## 📱 Screenshots

<div align="center">

### 🏠 Homepage & Hero Section
![Homepage](public/images/laptop.png)

### 📱 Mobile Responsive Design
![Mobile](public/images/mobileresponsive.png)

</div>

---

## 🎯 Key Features Showcase

<div align="center">

### 📱 **Responsive Design**
Our website is fully responsive and works perfectly on all devices - from mobile phones to desktop computers.

### 🛡️ **Security Features**
Advanced anti-inspect functionality to protect website content and user privacy.

### ⚡ **Performance Optimized**
Fast loading times with optimized images and modern web technologies.

### 🎨 **Modern UI/UX**
Beautiful animations, smooth transitions, and intuitive user interface.

</div>

---

## 🎨 Design System

### 🎨 Color Palette
```css
/* Primary Colors */
--green-800: #028446    /* Main brand color */
--green-700: #059669    /* Secondary green */
--green-600: #10B981    /* Accent green */
--yellow-400: #FBBF24   /* Warning/CTA color */
--yellow-500: #F59E0B   /* Darker yellow */

/* Neutral Colors */
--gray-50: #F9FAFB      /* Light background */
--gray-100: #F3F4F6     /* Card backgrounds */
--gray-600: #4B5563     /* Text color */
--gray-900: #111827     /* Headings */
```

### 📐 Typography
- **Headings**: Geist Sans (Bold)
- **Body**: Geist Sans (Regular)
- **Code**: Geist Mono

### 🎯 Spacing System
- **Container**: max-width 1200px
- **Section Padding**: py-16 (desktop), py-12 (mobile)
- **Grid Gaps**: gap-6 (standard), gap-8 (larger sections)

---

## 📦 Installation

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/laundryku.git
cd laundryku
```

### 2. Install Dependencies
```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### 3. Environment Setup
```bash
# Copy environment variables
cp .env.example .env.local

# Edit with your configuration
nano .env.local
```

### 4. Run Development Server
```bash
pnpm dev
```

### 5. Build for Production
```bash
pnpm build
pnpm start
```

---

## 🔧 Configuration

### Environment Variables
```env
# Next.js Configuration
NEXT_PUBLIC_SITE_URL=https://laundryku.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID

# Contact Information
NEXT_PUBLIC_WHATSAPP_NUMBER=6281315494196
NEXT_PUBLIC_INSTAGRAM_HANDLE=@laundrykupremium
```

### Tailwind Configuration
```javascript
// tailwind.config.ts
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom brand colors
      },
      fontFamily: {
        sans: ['Geist Sans', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">

**MIT License** - Feel free to use this project for your own laundry business!

</div>

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

### Contribution Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

---

## 📞 Contact

<div align="center">

### 🧺 LaundryKu Premium

**📍 Outlets:**
- **Cirendeu**: Jln. Cirendeu Raya No.40 D, Tangerang Selatan
- **Bona Indah**: Jl. Lebak Bulus 1 No.24, Jakarta Selatan  
- **Karet Pedurenan**: Jl. Karet pedurenan no. 62 D, Jakarta Selatan

**📱 Contact:**
- **WhatsApp**: [0813-1549-4196](https://api.whatsapp.com/send?phone=6281315494196)
- **Instagram**: [@laundrykupremium](https://www.instagram.com/laundrykupremium/)

**🌐 Website**: [laundryku.com](https://laundryku.com)

---

<div align="center">

**Made with ❤️ for the laundry industry**

*Higienis • Halal • Berkualitas*

</div>
