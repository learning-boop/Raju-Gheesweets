import { useId, useState } from 'react'
import Icon from '../ui/Icon.jsx'
import { useCart } from '../../cart/cart.jsx'
import { PRODUCTS, priceOf, rupees, slug } from '../../data/shop.js'

/** Pack-size picker and "Add" button, shared by every product on the page. */
export default function AddToCart({ name, tone = 'light' }) {
  const id = slug(name)
  const product = PRODUCTS[id]
  const { add } = useCart()
  const [pack, setPack] = useState(product.packs[1] ?? product.packs[0])
  const [added, setAdded] = useState(false)
  const labelId = useId()
  const price = priceOf(id, pack)

  const onAdd = () => {
    add(id, pack)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <div className={`atc atc--${tone}`}>
      <span id={labelId} className="sr-only">Pack size for {name}</span>
      <div className="atc__packs" role="radiogroup" aria-labelledby={labelId}>
        {product.packs.map((p) => (
          <button
            key={p}
            type="button"
            role="radio"
            aria-checked={p === pack}
            className={`atc__pack ${p === pack ? 'is-on' : ''}`}
            onClick={() => setPack(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="atc__row">
        <span className={`atc__price ${price == null ? 'is-ask' : ''}`}>
          {price == null ? 'Price on request' : rupees(price)}
        </span>
        <button type="button" className="atc__add" onClick={onAdd} aria-label={`Add ${name}, ${pack}, to cart`}>
          <Icon name={added ? 'check' : 'bag'} size={16} />
          {added ? 'Added' : 'Add'}
        </button>
      </div>
    </div>
  )
}
