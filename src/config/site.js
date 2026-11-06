// ─────────────────────────────────────────────────────────────
//  Store details — edit these in one place.
//  Fields left as '' render a visible [placeholder] on the site
//  so nothing goes live with a wrong number.
// ─────────────────────────────────────────────────────────────
export const SITE = {
  name: 'Raju Ghee Sweets',
  nameTe: 'రాజు ఘీ స్వీట్స్',
  city: 'Vijayawada',
  cityTe: 'విజయవాడ',

  address:
    'Vijayatakies Centre, Arundalpet, Governor Peta, Vijayawada, Andhra Pradesh 520002',
  addressShort: 'Vijayatakies Centre, Vijayawada',

  hours: { open: 9, close: 22, label: '9:00 AM – 10:00 PM', short: '9 AM – 10 PM' },

  phone: '', // e.g. '+91 98480 00000'
  whatsapp: '', // digits only with country code, e.g. '919848000000'
  since: '', // e.g. '1987' — shows "Serving Vijayawada since 1987"

  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Raju+Ghee+Sweets+Vijayatakies+Centre+Vijayawada',

  branches: [
    { name: 'MG Road', address: '' },
    { name: 'Eluru Road', address: '' },
  ],

  social: { instagram: '', facebook: '', youtube: '' },
}

export const phoneLabel = SITE.phone || '[Phone number]'

export const telHref = SITE.phone ? `tel:${SITE.phone.replace(/[^\d+]/g, '')}` : '#visit'

export function waHref(message = 'Hi Raju Ghee Sweets! I would like to place an order.') {
  if (!SITE.whatsapp) return '#visit'
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`
}

export const isExternal = (href) => /^https?:/.test(href)

// open external links in a new tab
export const ext = (href) => (isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})
