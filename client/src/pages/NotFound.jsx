import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-x flex min-h-screen flex-col items-center justify-center text-center">
      <span className="eyebrow">404</span>
      <h1 className="mt-4 font-serif text-5xl text-ink">This page slipped away.</h1>
      <Link to="/" className="btn-primary mt-8">Return home</Link>
    </div>
  )
}
