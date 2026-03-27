import { useTranslations } from 'next-intl'
import { Link } from '../../i18n/navigation'
import { LocaleSwitcher } from './locale-switcher'
import { SearchForm } from './search-form'

export function Header() {
  const t = useTranslations('nav')

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          Game<span className="text-[var(--color-accent)]">Gear</span>
          <span className="ml-1 text-xs font-normal text-[var(--color-muted)]">LATAM</span>
        </Link>

        <div className="flex items-center gap-6">
          <SearchForm />

          <nav aria-label="main navigation">
            <ul className="flex items-center gap-6 text-sm text-[var(--color-muted)]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/categoria/monitors" className="hover:text-white transition-colors">
                  {t('categories')}
                </Link>
              </li>
              <li>
                <LocaleSwitcher />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
