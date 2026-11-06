import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { PRODUCTS, priceOf } from '../data/shop.js'

const KEY = 'raju-cart-v1'
const CartContext = createContext(null)

const lineKey = (id, pack) => `${id}|${pack}`

function reducer(lines, action) {
  switch (action.type) {
    case 'add': {
      const key = lineKey(action.id, action.pack)
      const found = lines.find((l) => l.key === key)
      if (found) return lines.map((l) => (l.key === key ? { ...l, qty: Math.min(99, l.qty + action.qty) } : l))
      return [...lines, { key, id: action.id, pack: action.pack, qty: action.qty }]
    }
    case 'qty':
      return lines
        .map((l) => (l.key === action.key ? { ...l, qty: Math.max(0, Math.min(99, action.qty)) } : l))
        .filter((l) => l.qty > 0)
    case 'remove':
      return lines.filter((l) => l.key !== action.key)
    case 'clear':
      return []
    default:
      return lines
  }
}

// The cart survives a page reload, but storage can be unavailable (private mode), so it's best-effort.
function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(raw) ? raw.filter((l) => PRODUCTS[l.id] && PRODUCTS[l.id].packs.includes(l.pack) && l.qty > 0) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [lines, dispatch] = useReducer(reducer, undefined, load)
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines))
    } catch {
      /* storage blocked: the cart still works for this visit */
    }
  }, [lines])

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(id)
  }, [toast])

  const add = useCallback((id, pack, qty = 1) => {
    dispatch({ type: 'add', id, pack, qty })
    setToast({ id: Date.now(), text: `${PRODUCTS[id].name} · ${pack} added` })
  }, [])

  const value = useMemo(() => {
    const items = lines.map((l) => {
      const product = PRODUCTS[l.id]
      const price = priceOf(l.id, l.pack)
      return { ...l, product, price, total: price == null ? null : price * l.qty }
    })
    const count = items.reduce((n, i) => n + i.qty, 0)
    const priced = items.filter((i) => i.total != null)
    return {
      items,
      count,
      subtotal: priced.reduce((s, i) => s + i.total, 0),
      unpriced: items.length - priced.length,
      add,
      setQty: (key, qty) => dispatch({ type: 'qty', key, qty }),
      remove: (key) => dispatch({ type: 'remove', key }),
      clear: () => dispatch({ type: 'clear' }),
      open,
      setOpen,
      toast,
    }
  }, [lines, add, open, toast])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
