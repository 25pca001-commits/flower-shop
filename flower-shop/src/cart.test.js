import { describe, expect, it } from 'vitest';
import { cartCount, cartReducer, cartTotal, formatPrice } from './cart.js';
import { PRODUCTS } from './products.js';

describe('cartReducer', () => {
  it('adds a product and increments on repeat', () => {
    let s = cartReducer({}, { type: 'add', id: 'sunflower' });
    s = cartReducer(s, { type: 'add', id: 'sunflower' });
    expect(s).toEqual({ sunflower: 2 });
  });

  it('removes a line when quantity drops to zero', () => {
    const s = cartReducer({ sunflower: 1 }, { type: 'setQty', id: 'sunflower', qty: 0 });
    expect(s).toEqual({});
  });

  it('caps quantity at 99', () => {
    const s = cartReducer({}, { type: 'setQty', id: 'sunflower', qty: 500 });
    expect(s.sunflower).toBe(99);
  });

  it('clears everything', () => {
    expect(cartReducer({ a: 1, b: 2 }, { type: 'clear' })).toEqual({});
  });
});

describe('cart totals', () => {
  it('counts items and sums prices', () => {
    const state = { sunflower: 2, gerbera: 3 };
    expect(cartCount(state)).toBe(5);
    expect(cartTotal(state, PRODUCTS)).toBe(129 * 2 + 99 * 3);
  });

  it('formats rupees', () => {
    expect(formatPrice(1899)).toContain('1,899');
  });
});
