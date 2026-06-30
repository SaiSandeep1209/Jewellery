import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import Hero from '../components/Hero'
import SectionTitle from '../components/ui/SectionTitle'
import Reveal from '../components/ui/Reveal'
import ItemCard from '../components/ItemCard'
import VisitSection from '../components/VisitSection'
import Loader from '../components/ui/Loader'
import { itemsApi } from '../services/api'

const STORY_IMG = 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1000&q=80'

export default function Home() {
  const [featured, setFeatured] = useState(null)

  useEffect(() => {
    itemsApi.list({ featured: 'true' }).then(setFeatured).catch(() => setFeatured([]))
  }, [])

  return (
    <>
      <Hero />

      {/* Brand story */}
      <section className="container-x py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img src={STORY_IMG} alt="The atelier" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft" loading="lazy" />
          </Reveal>
          <Reveal direction="left">
            <SectionTitle eyebrow="Our House" title="Quiet luxury, honestly made." />
            <p className="mt-5 text-stone">
              Every Dasari piece is chosen for its craftsmanship and its longevity — gold that warms
              with wear, stones selected by eye, settings finished by hand. We keep a small, considered
              collection in store, and we’d love to show it to you.
            </p>
            <Link to="/collections" className="btn-outline mt-7">Browse the collection</Link>
          </Reveal>
        </div>
      </section>

      {/* Featured carousel */}
      <section className="bg-sand py-20 sm:py-28">
        <div className="container-x">
          <SectionTitle eyebrow="Featured" title="Pieces in the spotlight" center />
          <div className="mt-12">
            {featured === null ? (
              <Loader />
            ) : featured.length === 0 ? (
              <p className="text-center text-stone">New pieces arriving soon.</p>
            ) : (
              <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
                loop={featured.length > 2}
                spaceBetween={24}
                breakpoints={{ 0: { slidesPerView: 1.1 }, 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }}
              >
                {featured.map((item) => (
                  <SwiperSlide key={item._id} className="h-auto pb-2">
                    <ItemCard item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          <div className="mt-10 text-center">
            <Link to="/collections" className="btn-primary">See all jewellery</Link>
          </div>
        </div>
      </section>

      <VisitSection />
    </>
  )
}
