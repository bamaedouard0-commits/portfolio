import { useState, useEffect, useCallback, useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { gsap } from 'gsap';

const navLinks = [
  { href: '#about', label: 'A propos' },
  { href: '#skills', label: 'Competences' },
  { href: '#projects', label: 'Projets' },
  { href: '#services', label: 'Services' },
  { href: '#timeline', label: 'Parcours' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark';
    return (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') || 'dark';
  });
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animate menu open/close
  useEffect(() => {
    if (!overlayRef.current || !linksRef.current) return;

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(overlayRef.current, { display: 'flex' });
      gsap.fromTo(
        overlayRef.current,
        { clipPath: 'circle(0% at calc(100% - 40px) 40px)' },
        { clipPath: 'circle(150% at calc(100% - 40px) 40px)', duration: 0.8, ease: 'power3.inOut' }
      );
      const links = linksRef.current.children;
      gsap.fromTo(
        links,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.3 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, {
        clipPath: 'circle(0% at calc(100% - 40px) 40px)',
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
          if (overlayRef.current) gsap.set(overlayRef.current, { display: 'none' });
        },
      });
    }
  }, [menuOpen]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  const handleLinkClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">
          <a href="#" className="navbar__logo">
            BAMA<span>.</span>
          </a>

          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="navbar__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar__right">
            <button
              className="navbar__theme-btn"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="navbar__menu-btn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
            >
              <span className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}>
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      <div className="menu-overlay" ref={overlayRef} style={{ display: 'none' }}>
        <ul className="menu-overlay__links" ref={linksRef}>
          {navLinks.map((link) => (
            <li key={link.href} className="menu-overlay__item">
              <a href={link.href} className="menu-overlay__link" onClick={handleLinkClick}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
