import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navItems, site, type ActiveSection } from '../data/site';

type HeaderProps = {
  activeSection: ActiveSection;
};

export default function Header({ activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !document.documentElement.classList.contains('dark');

    document.documentElement.classList.toggle('dark', nextIsDark);
    localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
    setIsDark(nextIsDark);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-surface-variant bg-background">
      <div className="mx-auto flex h-16 max-w-max-width items-center justify-between px-margin-mobile md:px-margin-desktop">
        <a className="font-headline text-headline-sm text-primary" href="/" data-astro-prefetch="load">
          {site.name}
        </a>

        <nav className="hidden items-center gap-gutter font-label text-label-md md:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = item.key === activeSection;

            return (
              <a
                className={[
                  'pb-1 transition-colors duration-200 active:opacity-70',
                  isActive
                    ? 'border-b border-primary text-primary'
                    : 'border-b border-transparent text-on-surface-variant hover:text-primary',
                ].join(' ')}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </a>
            );
          })}
          <button
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="ml-4 inline-flex text-on-surface-variant transition-colors hover:text-primary"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            type="button"
            onClick={toggleTheme}
          >
            {isDark ? <Sun aria-hidden="true" size={20} strokeWidth={1.75} /> : <Moon aria-hidden="true" size={20} strokeWidth={1.75} />}
          </button>
        </nav>

        <button
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          className="inline-flex h-10 w-10 items-center justify-center border border-surface-variant text-primary transition-colors hover:bg-surface-container md:hidden"
          type="button"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
        </button>
      </div>

      {isOpen && (
        <nav className="border-t border-surface-variant bg-surface-container-low md:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-max-width gap-1 px-margin-mobile py-4">
            {navItems.map((item) => (
              <a
                className={[
                  'px-2 py-3 font-label text-label-md transition-colors',
                  item.key === activeSection ? 'text-primary' : 'text-on-surface-variant hover:text-primary',
                ].join(' ')}
                href={item.href}
                key={item.label}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
