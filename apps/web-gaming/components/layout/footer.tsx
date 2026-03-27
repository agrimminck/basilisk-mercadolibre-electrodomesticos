import { useTranslations } from 'next-intl'
import { Link } from '../../i18n/navigation'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium text-[var(--color-muted)]">{t('tagline')}</p>
          <nav aria-label="footer navigation">
            <ul className="flex gap-6 text-xs text-[var(--color-muted)]">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  {t('links.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t('links.contact')}
                </Link>
              </li>
            </ul>
          </nav>
          <p className="text-xs text-[var(--color-muted)] max-w-md">{t('disclaimer')}</p>
        </div>
      </div>
    </footer>
  )
}
