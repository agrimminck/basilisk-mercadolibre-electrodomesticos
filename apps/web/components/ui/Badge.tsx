type BadgeProps = {
  condition: 'new' | 'used'
}

export function Badge({ condition }: BadgeProps) {
  const isNew = condition === 'new'
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
        isNew
          ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
          : 'bg-slate-700 text-slate-400 border border-slate-600'
      }`}
    >
      {isNew ? 'Nuevo' : 'Usado'}
    </span>
  )
}
