/**
 * Store identity & contact. Edit these to match the real store.
 * (Online purchase is intentionally not offered — enquiries go via WhatsApp.)
 */
export const site = {
  name: 'Dasari Jewellers',
  tagline: 'Fine Jewellery',
  blurb: 'A curated house of gold, diamond and pearl pieces — crafted to be lived in and handed down.',

  // WhatsApp — digits only, international format (no +, spaces or dashes).
  whatsappNumber: '919000000000',
  phoneDisplay: '+91 90000 00000',
  phoneHref: 'tel:+919000000000',
  email: 'visit@aurelia.example',

  address: 'Shop 7, Jewel Arcade, Gachibowli, Hyderabad – 500032',
  hours: [
    { day: 'Mon – Sat', time: '11:00 AM – 8:30 PM' },
    { day: 'Sunday', time: '12:00 PM – 6:00 PM' },
  ],

  // Google Maps embed (replace q= with the exact store listing when available).
  mapEmbed: 'https://www.google.com/maps?q=Gachibowli,+Hyderabad,+Telangana+500032&output=embed',
  mapsLink: 'https://maps.google.com/?q=Gachibowli,+Hyderabad',

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
