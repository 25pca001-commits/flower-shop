// Cart state is a plain object: { [productId]: quantity }

export function cartReducer(state, action) {
  switch (action.type) {
    case 'add':
      return { ...state, [action.id]: Math.min((state[action.id] || 0) + 1, 99) };
    case 'setQty': {
      if (action.qty <= 0) {
        const { [action.id]: _removed, ...rest } = state;
        return rest;
      }
      return { ...state, [action.id]: Math.min(action.qty, 99) };
    }
    case 'remove': {
      const { [action.id]: _removed, ...rest } = state;
      return rest;
    }
    case 'clear':
      return {};
    default:
      return state;
  }
}

export function cartCount(state) {
  return Object.values(state).reduce((sum, qty) => sum + qty, 0);
}

export function cartTotal(state, products) {
  return products.reduce((sum, p) => sum + p.price * (state[p.id] || 0), 0);
}

export function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
