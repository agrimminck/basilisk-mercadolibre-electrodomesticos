import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Top Electro Hogar — Electrodomésticos en MercadoLibre Chile'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#faf7f2',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          padding: 80,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#1c1917',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          Top Electro Hogar
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#78716c',
            textAlign: 'center',
            maxWidth: 700,
          }}
        >
          Refrigeradores, lavadoras, televisores y más — los mejores precios en MercadoLibre Chile
        </div>
        <div
          style={{
            marginTop: 16,
            background: '#b45309',
            color: '#faf7f2',
            fontWeight: 700,
            fontSize: 22,
            borderRadius: 4,
            padding: '12px 32px',
          }}
        >
          Explorar catálogo →
        </div>
      </div>
    ),
    { ...size }
  )
}
