import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'LaundryKu Premium - Layanan Laundry Terpercaya',
  description: 'LaundryKu Premium - Layanan laundry premium dengan standar kualitas tinggi, higienis, dan halal. Dipercaya oleh 2500+ pelanggan di seluruh Indonesia.',
  generator: 'LaundryKu',
  keywords: 'laundry, laundry premium, laundry kiloan, laundry sepatu, laundry karpet, laundry jakarta, laundry tangerang',
  authors: [{ name: 'LaundryKu Premium' }],
  robots: 'noindex, nofollow, noarchive, nosnippet, noimageindex',
  openGraph: {
    title: 'LaundryKu Premium - Layanan Laundry Terpercaya',
    description: 'Layanan laundry premium dengan standar kualitas tinggi, higienis, dan halal. Dipercaya oleh 2500+ pelanggan di seluruh Indonesia.',
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
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Anti-inspect script - Prevent DevTools access while allowing normal interactions
              (function() {
                // Disable right click to prevent "Inspect" option
                document.addEventListener('contextmenu', function(e) {
                  e.preventDefault();
                  return false;
                });
                
                // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U (DevTools shortcuts)
                document.addEventListener('keydown', function(e) {
                  if (e.key === 'F12' || 
                      ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
                      ((e.ctrlKey || e.metaKey) && e.key === 'u')) {
                    e.preventDefault();
                    return false;
                  }
                });
                
                // Detect devtools
                let devtools = { open: false, orientation: null };
                setInterval(function() {
                  const threshold = 160;
                  const widthThreshold = window.outerWidth - window.innerWidth > threshold;
                  const heightThreshold = window.outerHeight - window.innerHeight > threshold;
                  
                  if (widthThreshold || heightThreshold) {
                    if (!devtools.open) {
                      devtools.open = true;
                      // Redirect to home page
                      setTimeout(function() {
                        window.location.href = window.location.origin;
                      }, 1000);
                    }
                  } else {
                    devtools.open = false;
                  }
                }, 1000);
              })();
            `
          }}
        />
      </body>
    </html>
  )
}
