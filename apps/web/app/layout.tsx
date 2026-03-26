import type { Metadata } from 'next'
import './globals.css'
import { Header } from '../components/layout/header'
import { Footer } from '../components/layout/footer'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    template: '%s | GameGear',
    default: 'GameGear — Gaming Hardware Reviews & Comparisons',
  },
  description:
    'Honest comparisons and recommendations for gaming hardware: monitors, GPUs, peripherals, and more.',
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
