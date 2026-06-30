export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-stone">
      <span className="h-9 w-9 animate-spin rounded-full border-2 border-line border-t-gold" />
      <span className="text-sm tracking-wide">{label}</span>
    </div>
  )
}
