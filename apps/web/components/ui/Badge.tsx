type BadgeProps = {
  condition: 'new' | 'used'
}

export function Badge({ condition }: BadgeProps) {
  const isNew = condition === 'new'
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
        isNew
          ? 'bg-teh-accent/10 text-teh-accent border border-teh-accent/30 dark:bg-teh-d-accent/10 dark:text-teh-d-accent dark:border-teh-d-accent/30'
          : 'bg-teh-tag text-teh-ink-muted border border-teh-rule dark:bg-teh-d-bgalt dark:text-teh-d-ink-muted dark:border-teh-d-rule'
      }`}
    >
      {isNew ? 'Nuevo' : 'Usado'}
    </span>
  )
}
