'use client'

import { useState } from 'react'

type Props = {
  pictures: string[]
  title: string
}

export function ProductImageCarousel({ pictures, title }: Props) {
  const [activeIdx, setActiveIdx] = useState(0)
  const hasManyImages = pictures.length > 1

  function prev() {
    setActiveIdx((i) => (i === 0 ? pictures.length - 1 : i - 1))
  }

  function next() {
    setActiveIdx((i) => (i === pictures.length - 1 ? 0 : i + 1))
  }

  if (pictures.length === 0) {
    return <div className="aspect-square bg-white dark:bg-zinc-900" />
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square bg-white dark:bg-zinc-900 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pictures[activeIdx]}
          alt={title}
          className="w-full h-full object-contain p-6"
        />
        {hasManyImages && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-teh-surface/90 dark:bg-teh-d-surface/90 border border-teh-rule-soft dark:border-teh-d-rule-soft text-teh-ink dark:text-teh-d-ink hover:border-teh-accent dark:hover:border-teh-d-accent transition-colors font-mono text-sm"
              aria-label="Imagen anterior"
            >
              ←
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-teh-surface/90 dark:bg-teh-d-surface/90 border border-teh-rule-soft dark:border-teh-d-rule-soft text-teh-ink dark:text-teh-d-ink hover:border-teh-accent dark:hover:border-teh-d-accent transition-colors font-mono text-sm"
              aria-label="Imagen siguiente"
            >
              →
            </button>
            <div className="absolute bottom-2 right-2 font-mono text-[10px] text-teh-ink-muted dark:text-teh-d-ink-muted tracking-wider">
              {String(activeIdx + 1).padStart(2, '0')} / {String(pictures.length).padStart(2, '0')}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {hasManyImages && (
        <div className="flex gap-2 overflow-x-auto">
          {pictures.slice(0, 6).map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`shrink-0 w-14 h-14 bg-white dark:bg-zinc-900 border transition-colors overflow-hidden ${
                i === activeIdx
                  ? 'border-teh-accent dark:border-teh-d-accent'
                  : 'border-teh-rule-soft dark:border-teh-d-rule-soft hover:border-teh-ink-soft dark:hover:border-teh-d-ink-soft'
              }`}
              aria-label={`Ver imagen ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
