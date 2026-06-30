import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Loader from './components/ui/Loader'
import Home from './pages/Home'

// Code-split the non-home routes.
const Collections = lazy(() => import('./pages/Collections'))
const ItemDetails = lazy(() => import('./pages/ItemDetails'))
const Visit = lazy(() => import('./pages/Visit'))
const Admin = lazy(() => import('./pages/Admin'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Suspense fallback={<div className="pt-28"><Loader /></div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="collections" element={<Collections />} />
          <Route path="item/:id" element={<ItemDetails />} />
          <Route path="visit" element={<Visit />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
