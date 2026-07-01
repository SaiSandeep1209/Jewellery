import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { site } from '../config/site'

const HERO_IMG =
  'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1600&q=80'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]) // parallax
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  return (
    <section ref={ref} className="relative flex h-[92vh] min-h-[560px] items-center overflow-hidden">
      <motion.img
        src={HERO_IMG}
        alt=""
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="container-x relative">
        <motion.span
          className="eyebrow text-white/90 before:bg-white/70"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {site.tagline} · Devarapalli
        </motion.span>

        <motion.h1
          className="mt-5 max-w-3xl font-serif text-5xl leading-[1.05] text-white sm:text-7xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Pieces made to be<br />treasured.
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl font-serif text-xl italic text-champagne sm:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          “{site.motto}”
        </motion.p>

        <motion.p
          className="mt-4 max-w-xl text-lg text-white/85"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
        >
          {site.blurb}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Link to="/collections" className="btn bg-white text-ink hover:bg-champagne">View the Collection</Link>
          <Link to="/visit" className="btn border border-white/60 text-white hover:bg-white/10">Visit the Store</Link>
        </motion.div>

        <motion.span
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-champagne bg-white px-4 py-1.5 text-sm font-medium text-ink"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.7 }}
        >
          ✦ {site.customOrders}
        </motion.span>
      </div>
    </section>
  )
}
