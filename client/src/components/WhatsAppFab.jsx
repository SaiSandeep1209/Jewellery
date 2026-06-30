import { whatsappLink } from '../lib/format'
import { site } from '../config/site'

/** Floating WhatsApp enquiry button, always reachable. */
export default function WhatsAppFab() {
  return (
    <a
      href={whatsappLink(`Hello ${site.name}! I'd like to know more about your collection.`)}
      target="_blank"
      rel="noreferrer"
      aria-label="Enquire on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-lift transition-transform duration-300 hover:-translate-y-0.5"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.25.69-1.44 1.32-1.98 1.36-.53.05-1.02.24-3.44-.72-2.9-1.14-4.75-4.1-4.9-4.29-.14-.19-1.17-1.56-1.17-2.97 0-1.41.74-2.1 1-2.39.25-.29.55-.36.73-.36.18 0 .37 0 .53.01.17.01.4-.06.62.48.25.6.85 2.07.92 2.22.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.17.29.74 1.22 1.59 1.98 1.1.98 2.02 1.28 2.3 1.43.28.14.45.12.62-.07.17-.19.71-.83.9-1.11.18-.29.37-.24.62-.14.25.09 1.6.76 1.87.9.28.14.46.21.53.33.07.12.07.69-.18 1.38Z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  )
}
