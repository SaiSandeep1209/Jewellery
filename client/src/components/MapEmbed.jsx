import { site } from '../config/site'

export default function MapEmbed({ className = '' }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line shadow-soft ${className}`}>
      <iframe
        title={`${site.name} location`}
        src={site.mapEmbed}
        className="h-full min-h-[320px] w-full"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
