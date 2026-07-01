/**
 * Store identity & contact. Edit these to match the real store.
 * (Online purchase is intentionally not offered — enquiries go via WhatsApp.)
 */
export const site = {
  name: 'Dasari Jewellers',
  tagline: 'Fine Jewellery',
  motto: 'Trust is our strength · Quality is our goal',
  customOrders: 'We take custom orders too',
  blurb: 'A curated house of gold, diamond and pearl pieces — crafted to be lived in and handed down.',

  // WhatsApp — digits only, international format (no +, spaces or dashes).
  whatsappNumber: '919553322216',
  phoneDisplay: '+91 95533 22216',
  phoneHref: 'tel:+919553322216',
  email: 'abdulsatya@gmail.com',

  address: 'Behind NTR Statue, Beside Bus Stand, Main Road, Devarapalli – 534313',
  hours: [
    { day: 'Mon – Sat', time: '11:00 AM – 8:30 PM' },
    { day: 'Sunday', time: '12:00 PM – 6:00 PM' },
  ],

  // Google Maps embed (replace q= with the exact store listing when available).
  mapEmbed: 'https://www.google.com/maps?q=Bus+Stand,+Main+Road,+Devarapalli,+534313&output=embed',
  mapsLink: 'https://maps.google.com/?q=Bus+Stand,+Main+Road,+Devarapalli,+534313',

  socials: [
    { label: 'Instagram', url: 'https://instagram.com/' },
    { label: 'Facebook', url: 'https://facebook.com/' },
  ],
}

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/collections', label: 'Collections' },
  { to: '/visit', label: 'Visit' },
]
