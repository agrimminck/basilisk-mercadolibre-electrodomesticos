import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: {
    default: 'Ofertas Chile — Notebooks, Celulares y más en MercadoLibre',
    template: '%s | Ofertas Chile',
  },
  description:
    'Encontrá las mejores ofertas en notebooks, celulares, electrodomésticos, televisores y más. Compará precios y comprá en MercadoLibre Chile con envío a todo el país.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    siteName: 'Ofertas Chile',
    type: 'website',
    locale: 'es_CL',
  },
  twitter: {
    card: 'summary_large_image',
  },
  verification: {
    google: 'qiy2NQDq_fPBZ-WBcq0PEBSRbMw3RSv4vkXvNTlpPmY',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={geist.variable}>
      <body className="bg-slate-900 text-slate-100 antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
