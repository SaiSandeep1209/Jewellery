import { motion } from 'framer-motion'

const dirs = { up: { y: 40 }, down: { y: -40 }, left: { x: 40 }, right: { x: -40 }, none: {} }

/** Scroll reveal (fade/slide). Respects reduced-motion via framer-motion. */
export default function Reveal({ children, as = 'div', direction = 'up', delay = 0, className, amount = 0.2 }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...dirs[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  )
}
