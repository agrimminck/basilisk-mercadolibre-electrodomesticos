type Props = {
  seed?: number
  tone?: string
  stripe?: string
  src?: string
  alt?: string
}

const ICON_DEFS: Array<(c: string) => React.ReactNode> = [
  // fridge
  (c) => (
    <g fill="none" stroke={c} strokeWidth="1.2">
      <rect x="38" y="18" width="24" height="64" rx="2" />
      <line x1="38" y1="38" x2="62" y2="38" />
      <rect x="40" y="22" width="2" height="4" fill={c} />
      <rect x="40" y="42" width="2" height="4" fill={c} />
    </g>
  ),
  // washer
  (c) => (
    <g fill="none" stroke={c} strokeWidth="1.2">
      <rect x="32" y="22" width="36" height="56" rx="3" />
      <circle cx="50" cy="54" r="13" />
      <circle cx="50" cy="54" r="8" />
      <circle cx="38" cy="30" r="1.2" fill={c} />
      <circle cx="44" cy="30" r="1.2" fill={c} />
    </g>
  ),
  // tv
  (c) => (
    <g fill="none" stroke={c} strokeWidth="1.2">
      <rect x="22" y="26" width="56" height="40" rx="2" />
      <line x1="46" y1="66" x2="54" y2="66" strokeWidth="2" />
      <line x1="40" y1="74" x2="60" y2="74" strokeWidth="1.5" />
    </g>
  ),
  // cocina
  (c) => (
    <g fill="none" stroke={c} strokeWidth="1.2">
      <rect x="24" y="28" width="52" height="48" rx="2" />
      <line x1="24" y1="42" x2="76" y2="42" />
      <circle cx="36" cy="58" r="4" />
      <circle cx="50" cy="58" r="4" />
      <circle cx="64" cy="58" r="4" />
    </g>
  ),
  // kettle
  (c) => (
    <g fill="none" stroke={c} strokeWidth="1.2">
      <path d="M38 60 Q38 35 50 35 Q62 35 62 60 L64 72 L36 72 Z" />
    </g>
  ),
  // microwave
  (c) => (
    <g fill="none" stroke={c} strokeWidth="1.2">
      <rect x="22" y="34" width="56" height="32" rx="2" />
      <rect x="25" y="37" width="38" height="26" />
      <line x1="66" y1="40" x2="75" y2="40" />
      <line x1="66" y1="46" x2="75" y2="46" />
      <circle cx="70.5" cy="56" r="2.5" />
    </g>
  ),
  // coffee
  (c) => (
    <g fill="none" stroke={c} strokeWidth="1.2">
      <rect x="38" y="22" width="24" height="56" rx="2" />
      <rect x="42" y="52" width="16" height="18" />
      <circle cx="50" cy="42" r="3" />
    </g>
  ),
  // vacuum
  (c) => (
    <g fill="none" stroke={c} strokeWidth="1.2">
      <circle cx="50" cy="56" r="20" />
      <circle cx="50" cy="56" r="13" />
    </g>
  ),
]

export function ProductPlaceholder({
  seed = 0,
  tone = '#ede4d4',
  stripe = 'rgba(0,0,0,0.04)',
  src,
  alt,
}: Props) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt ?? ''} className="w-full h-full object-cover" />
  }

  const idx = Math.abs(seed) % ICON_DEFS.length
  const Icon = ICON_DEFS[idx]
  const iconColor = 'rgba(0,0,0,0.45)'
  const patternId = `stripe-${seed}`

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: tone }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id={patternId} width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke={stripe} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#${patternId})`} />
      </svg>
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {Icon(iconColor)}
      </svg>
    </div>
  )
}
