import MapEmbed from './MapEmbed'
import SectionTitle from './ui/SectionTitle'
import Reveal from './ui/Reveal'
import { site } from '../config/site'
import { whatsappLink } from '../lib/format'

export default function VisitSection() {
  return (
    <section id="visit" className="container-x scroll-mt-24 py-20 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionTitle eyebrow="Visit Us" title="Come see them in person." />
          <p className="mt-5 max-w-md text-stone">
            Jewellery is best experienced in the light and in the hand. Visit our store, or send a
            message on WhatsApp and we’ll be glad to help.
          </p>

          <dl className="mt-8 space-y-5 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-luxe text-gold">Address</dt>
              <dd className="mt-1 text-ink">{site.address}</dd>
              <a href={site.mapsLink} target="_blank" rel="noreferrer" className="mt-1 inline-block text-gold hover:underline">
                Get directions →
              </a>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-luxe text-gold">Hours</dt>
              <dd className="mt-1 space-y-0.5 text-ink">
                {site.hours.map((h) => (
                  <div key={h.day} className="flex gap-3">
                    <span className="w-28 text-stone">{h.day}</span>
                    <span>{h.time}</span>
                  </div>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-luxe text-gold">Contact</dt>
              <dd className="mt-1 text-ink">
                <a href={site.phoneHref} className="hover:text-gold">{site.phoneDisplay}</a>
                <span className="mx-2 text-line">·</span>
                <a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a>
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsappLink(`Hello ${site.name}! I'd like to visit.`)} target="_blank" rel="noreferrer" className="btn-gold">
              Message on WhatsApp
            </a>
            <a href={site.phoneHref} className="btn-outline">Call the store</a>
          </div>
        </Reveal>

        <Reveal direction="left">
          <MapEmbed className="h-[420px]" />
        </Reveal>
      </div>
    </section>
  )
}
