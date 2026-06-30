import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks, site } from '../config/site'
import { whatsappLink } from '../lib/format'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change.
  useEffect(() => setOpen(false), [pathname])

  // Solid header except when transparent over the home hero (top, not scrolled).
  const transparent = pathname === '/' && !scrolled && !open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        transparent ? 'bg-transparent' : 'border-b border-line bg-ivory/90 backdrop-blur-md'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between md:h-20">
        <Link to="/" className={`font-serif text-2xl tracking-wide ${transparent ? 'text-white' : 'text-ink'}`}>
          {site.name}
          <span className="ml-2 align-middle text-[10px] uppercase tracking-luxe text-gold">
            {site.tagline}
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `text-sm transition-colors ${transparent ? 'text-white/90 hover:text-white' : 'text-ink/80 hover:text-gold'} ${
                      isActive && !transparent ? 'text-gold' : ''
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <a
            href={whatsappLink(`Hello ${site.name}!`)}
            target="_blank"
            rel="noreferrer"
            className={`hidden rounded-full px-5 py-2 text-sm font-medium transition-colors sm:inline-flex ${
              transparent ? 'bg-white text-ink hover:bg-champagne' : 'bg-ink text-ivory hover:bg-gold-deep'
            }`}
          >
            Enquire
          </a>

          {/* Mobile toggle */}
          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className={`h-0.5 w-6 transition-all duration-300 ${transparent ? 'bg-white' : 'bg-ink'} ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-6 transition-all duration-300 ${transparent ? 'bg-white' : 'bg-ink'} ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-6 transition-all duration-300 ${transparent ? 'bg-white' : 'bg-ink'} ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-line bg-ivory md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="container-x flex flex-col py-3">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="block border-b border-line py-3 font-serif text-lg text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/admin" className="block py-3 text-sm text-stone">Admin</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
