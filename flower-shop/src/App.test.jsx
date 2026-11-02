import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

beforeEach(() => {
  localStorage.clear();
});

describe('Flower shop', () => {
  it('shows the headline and all products', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /fresh flowers/i })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /add to basket/i })).toHaveLength(12);
  });

  it('filters by category', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Potted' }));
    expect(screen.getAllByRole('button', { name: /add to basket/i })).toHaveLength(4);
    expect(screen.queryByText('Sunflower')).not.toBeInTheDocument();
  });

  it('searches and shows an empty message', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByPlaceholderText(/search flowers/i), 'zzzz');
    expect(screen.getByText(/no flowers match/i)).toBeInTheDocument();
  });

  it('adds to the basket, updates the count and places an order', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole('button', { name: /add to basket/i })[0]);
    expect(screen.getByLabelText('1 items in basket')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^basket/i }));
    const basket = screen.getByRole('dialog', { name: /your basket/i });
    expect(within(basket).getByText('Peony Cloud')).toBeInTheDocument();

    await user.click(within(basket).getByRole('button', { name: /place order/i }));
    expect(within(basket).getByRole('status')).toHaveTextContent(/order placed/i);
    expect(screen.getByLabelText('0 items in basket')).toBeInTheDocument();
  });
});
