import { useEffect, useMemo, useReducer, useState } from 'react';
import Bloom from './components/Bloom.jsx';
import ProductCard from './components/ProductCard.jsx';
import Basket from './components/Basket.jsx';
import { CATEGORIES, PRODUCTS } from './products.js';
import { cartCount, cartReducer, cartTotal } from './cart.js';

const STORAGE_KEY = 'marigold-lane-basket';

function loadBasket() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, undefined, loadBasket);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      /* storage can be unavailable; the basket still works in memory */
    }
  }, [cart]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (category === 'All' || p.category === category) &&
        (q === '' || p.name.toLowerCase().includes(q) || p.note.toLowerCase().includes(q)),
    );
  }, [category, query]);

  const lines = PRODUCTS.filter((p) => cart[p.id]).map((p) => ({ product: p, qty: cart[p.id] }));
  const count = cartCount(cart);

  const add = (id) => {
    setOrdered(false);
    dispatch({ type: 'add', id });
  };

  const placeOrder = () => {
    dispatch({ type: 'clear' });
    setOrdered(true);
  };

  return (
    <>
      <header className="top">
        <a className="brand" href="#top">Marigold Lane</a>
        <button type="button" className="basket-btn" onClick={() => setOpen(true)}>
          Basket <span className="badge" aria-label={`${count} items in basket`}>{count}</span>
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <h1>Fresh flowers, cut this morning.</h1>
            <p>
              Bouquets, single stems and potted plants from our shop on Marigold Lane.
              Order by 11 am for same-day delivery.
            </p>
            <a className="btn" href="#shop">Browse flowers</a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="big"><Bloom petals={12} color="#E56B9B" center="#F6D365" size={420} /></div>
            <div className="small a"><Bloom petals={16} color="#F7C515" center="#5B3A1A" size={170} /></div>
            <div className="small b"><Bloom petals={8} color="#A98BDB" center="#F4E285" size={140} /></div>
          </div>
        </section>

        <section id="shop" className="shop" aria-labelledby="shop-title">
          <h2 id="shop-title">The flower counter</h2>

          <div className="toolbar">
            <div className="chips" role="group" aria-label="Filter by type">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`chip ${c === category ? 'on' : ''}`}
                  aria-pressed={c === category}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="search">
              <span className="sr">Search flowers</span>
              <input
                type="search"
                placeholder="Search flowers"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </div>

          {visible.length === 0 ? (
            <p className="empty">No flowers match your search. Try another name or clear the filter.</p>
          ) : (
            <ul className="grid">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} inBasket={cart[p.id] || 0} onAdd={add} />
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="foot">
        <p>Marigold Lane Flowers. Open daily, 7 am to 9 pm. Demo shop, no real payments.</p>
      </footer>

      <Basket
        open={open}
        items={lines}
        total={cartTotal(cart, PRODUCTS)}
        ordered={ordered}
        onClose={() => setOpen(false)}
        onQty={(id, qty) => dispatch({ type: 'setQty', id, qty })}
        onOrder={placeOrder}
      />
    </>
  );
}
