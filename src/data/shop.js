// ─────────────────────────────────────────────────────────────
//  Online orders: the price list and delivery options.
//
//  PRICES: fill in rupees for each pack size, e.g.
//    'motichoor-laddu': { '250 g': 120, '500 g': 230, '1 kg': 450 },
//  Anything left out (or null) shows "Price on request" on the site,
//  and the order message asks the shop to confirm it. Nothing is
//  ever shown with a made-up price.
// ─────────────────────────────────────────────────────────────
import { MENU, SNACKS, SPECIALS } from './content.js'

export const PRICES = {
  // 'motichoor-laddu': { '250 g': 0, '500 g': 0, '1 kg': 0 },
}

// Pack sizes. Most things sell by weight; a few sell by the piece.
const BY_WEIGHT = ['250 g', '500 g', '1 kg']
const PACKS = {
  pootharekulu: ['5 pcs', '10 pcs', '20 pcs'],
  bobbatlu: ['2 pcs', '5 pcs', '10 pcs'],
  malpua: ['2 pcs', '4 pcs', '8 pcs'],
}

// Fresh milk and syrup sweets don't survive a courier trip.
const NO_COURIER = new Set([
  'gulab-jamun', 'malpua', 'milk-cake', 'rose-barfi', 'kalakand', 'palakova',
  'bobbatlu', 'jangiri', 'jalebi',
])

export const DELIVERY = {
  pickup: {
    label: 'Pickup at the shop',
    note: 'Collect from Vijayatakies Centre at the time you choose.',
  },
  local: {
    label: 'Delivery in Vijayawada',
    note: 'Delivered to your door. The delivery charge is confirmed on WhatsApp.',
    fee: null, // rupees, e.g. 40 — null means "confirmed on WhatsApp"
    pincodePrefix: '520', // Vijayawada pincodes start with 520
  },
  courier: {
    label: 'Courier across India',
    note: 'For long-lasting sweets and snacks. Courier charges are confirmed on WhatsApp.',
    fee: null,
  },
}

export const PAYMENT = ['UPI', 'Cash']

export const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function toProduct(item, group) {
  const id = slug(item.name)
  return {
    id,
    name: item.name,
    group,
    img: item.img,
    packs: PACKS[id] || BY_WEIGHT,
    courier: !NO_COURIER.has(id),
  }
}

export const PRODUCTS = Object.fromEntries(
  [
    ...MENU.flatMap((c) => c.items.map((i) => toProduct(i, c.label))),
    ...SPECIALS.map((i) => toProduct(i, 'Andhra specials')),
    ...SNACKS.map((i) => toProduct(i, 'Snacks')),
  ].map((p) => [p.id, p]),
)

/** Price for one pack, or null when the shop hasn't set it yet. */
export function priceOf(id, pack) {
  const v = PRICES[id]?.[pack]
  return typeof v === 'number' && v > 0 ? v : null
}

export const rupees = (n) => `₹${n.toLocaleString('en-IN')}`
