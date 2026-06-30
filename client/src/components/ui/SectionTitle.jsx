import Reveal from './Reveal'

export default function SectionTitle({ eyebrow, title, subtitle, center, className = '' }) {
  return (
    <Reveal className={`${center ? 'mx-auto max-w-2xl text-center' : ''} ${className}`}>
      {eyebrow && <span className={`eyebrow ${center ? 'justify-center' : ''}`}>{eyebrow}</span>}
      {title && <h2 className="section-title mt-4">{title}</h2>}
      {subtitle && <p className="mt-4 text-stone">{subtitle}</p>}
    </Reveal>
  )
}
