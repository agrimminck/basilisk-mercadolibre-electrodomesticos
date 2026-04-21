import type { Metadata } from 'next'
import { Inter_Tight, Newsreader, Nunito } from 'next/font/google'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import './globals.css'

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: {
    default: 'Top Electro Hogar — Electrodomésticos en MercadoLibre Chile',
    template: '%s | Top Electro Hogar',
  },
  description:
    'Encontrá los mejores precios en refrigeradores, lavadoras, cocinas, televisores y más electrodomésticos en MercadoLibre Chile.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  openGraph: {
    siteName: 'Top Electro Hogar',
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
    <html
      lang="es"
      className={`${interTight.variable} ${newsreader.variable} ${nunito.variable}`}
    >
      <body className="bg-teh-bg dark:bg-teh-d-bg text-teh-ink dark:text-teh-d-ink antialiased min-h-screen flex flex-col transition-colors duration-200">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
