import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: {
    default: 'Mejores Ofertas — MercadoLibre Chile',
    template: '%s | MercadoLibre Chile',
  },
  description: 'Descubre las mejores ofertas y productos en MercadoLibre Chile.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={geist.variable}>
      <body className="bg-slate-900 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  )
}
