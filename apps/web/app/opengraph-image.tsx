import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Ofertas Chile — Las mejores ofertas en MercadoLibre'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f172a',
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
            color: '#f8fafc',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          Ofertas Chile
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: 700,
          }}
        >
          Notebooks, celulares, electrodomésticos y más en MercadoLibre Chile
        </div>
        <div
          style={{
            marginTop: 16,
            background: '#fbbf24',
            color: '#0f172a',
            fontWeight: 700,
            fontSize: 22,
            borderRadius: 12,
            padding: '12px 32px',
          }}
        >
          Ver ofertas →
        </div>
      </div>
    ),
    { ...size }
  )
}
