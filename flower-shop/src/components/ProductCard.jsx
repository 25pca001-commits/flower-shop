import Bloom from './Bloom.jsx';
import { formatPrice } from '../cart.js';

export default function ProductCard({ product, inBasket, onAdd }) {
  return (
    <li className="card" style={{ '--c': product.color }}>
      <div className="card-art">
        <Bloom petals={product.petals} color={product.color} center={product.center} size={150} />
      </div>
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="note">{product.note}</p>
        <div className="card-foot">
          <span className="price">{formatPrice(product.price)}</span>
          <button type="button" className="btn" onClick={() => onAdd(product.id)}>
            Add to basket{inBasket > 0 ? ` (${inBasket})` : ''}
          </button>
        </div>
      </div>
    </li>
  );
}
