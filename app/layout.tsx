import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'LaundryKu',
  description: 'LaundryKu',
  generator: 'LaundryKu',
  openGraph: {
    title: 'LaundryKu',
    description: 'LaundryKu',
    images: [
      {
        url: '/images/logo1.jpg',
        width: 800,
        height: 600,
        alt: 'LaundryKu Logo',
      },
    ],
  },
  icons: {
    icon: '/images/logo1.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
