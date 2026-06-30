import { Link } from 'react-router-dom'
import { navLinks, site } from '../config/site'
import { whatsappLink } from '../lib/format'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-sand">
      <div className="container-x grid gap-10 py-16 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <h2 className="font-serif text-3xl text-ink">{site.name}</h2>
          <p className="mt-3 max-w-xs text-sm text-stone">{site.blurb}</p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-xs font-semibold uppercase tracking-luxe text-gold">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-ink/75 transition-colors hover:text-gold">{l.label}</Link>
              </li>
            ))}
            <li><Link to="/admin" className="text-ink/75 transition-colors hover:text-gold">Admin</Link></li>
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-luxe text-gold">Visit & Enquire</h3>
          <p className="mt-4 text-sm text-stone">{site.address}</p>
          <div className="mt-3 flex flex-col gap-1 text-sm">
            <a href={site.phoneHref} className="text-ink/75 hover:text-gold">{site.phoneDisplay}</a>
            <a href={whatsappLink(`Hello ${site.name}!`)} target="_blank" rel="noreferrer" className="text-ink/75 hover:text-gold">WhatsApp us</a>
          </div>
          <div className="mt-3 flex gap-4 text-sm">
            {site.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="text-stone hover:text-gold">{s.label}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line py-5 text-center text-xs text-stone">
        © {new Date().getFullYear()} {site.name} {site.tagline}. Online purchase coming soon — visit us or enquire on WhatsApp.
      </div>
    </footer>
  )
}
