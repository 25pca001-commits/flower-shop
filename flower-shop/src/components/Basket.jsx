import { formatPrice } from '../cart.js';

export default function Basket({ open, items, total, ordered, onClose, onQty, onOrder }) {
  return (
    <>
      <div className={`scrim ${open ? 'show' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside
        className={`basket ${open ? 'open' : ''}`}
        role="dialog"
        aria-label="Your basket"
        aria-hidden={!open}
        inert={!open ? '' : undefined}
      >
        <header className="basket-head">
          <h2>Your basket</h2>
          <button type="button" className="link" onClick={onClose}>Close</button>
        </header>

        {ordered && (
          <p className="status" role="status">
            Order placed. We will call you to confirm the delivery time.
          </p>
        )}

        {items.length === 0 ? (
          <p className="empty">Your basket is empty. Pick a few flowers to start.</p>
        ) : (
          <>
            <ul className="lines">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="line">
                  <div>
                    <strong>{product.name}</strong>
                    <span className="muted">{formatPrice(product.price)} each</span>
                  </div>
                  <div className="qty">
                    <button type="button" aria-label={`Remove one ${product.name}`} onClick={() => onQty(product.id, qty - 1)}>−</button>
                    <span aria-label={`${product.name} quantity`}>{qty}</span>
                    <button type="button" aria-label={`Add one ${product.name}`} onClick={() => onQty(product.id, qty + 1)}>+</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <button type="button" className="btn wide" onClick={onOrder}>Place order</button>
          </>
        )}
      </aside>
    </>
  );
}
