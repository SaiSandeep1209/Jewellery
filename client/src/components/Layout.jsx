import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppFab from './WhatsAppFab'
import ScrollProgress from './ScrollProgress'

export default function Layout() {
  const { pathname } = useLocation()
  // Scroll to top on navigation.
  useEffect(() => window.scrollTo(0, 0), [pathname])

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
