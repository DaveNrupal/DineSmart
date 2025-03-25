import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from './Cart';
import { StoreContext } from '../../context/StoreContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Mock axios and react-router-dom's useNavigate
jest.mock("axios", () => ({
  post: jest.fn(),
  get: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
useNavigate.mockReturnValue(mockNavigate);

const mockRemoveFromCart = jest.fn();

// Mock the context data
const mockContext = {
  cartItems: { "1": 2, "2": 1 },
  removeFromCart: mockRemoveFromCart,
  getTotalCartAmount: jest.fn(() => 25),
  menu: [
    { _id: "1", name: "Item 1", price: 5, image: "item1" },
    { _id: "2", name: "Item 2", price: 10, image: "item2" },
  ],
  totalAmount: 25,
  setTotalAmount: jest.fn(),
};

describe('Cart Component', () => {
  test('renders cart items correctly', async () => {
    render(
      <Router>
        <StoreContext.Provider value={mockContext}>
          <Cart />
        </StoreContext.Provider>
      </Router>
    );

    // Check that cart items are displayed
    expect(screen.getByText('Item 1')).toBeTruthy();
    expect(screen.getByText('Item 2')).toBeTruthy();
    expect(screen.getByText('$5')).toBeTruthy();
    expect(screen.getAllByText('$10')).toBeTruthy();
  });

  test('displays the correct subtotal and total', async () => {
    render(
      <Router>
        <StoreContext.Provider value={mockContext}>
          <Cart />
        </StoreContext.Provider>
      </Router>
    );

    // Check that the total is correctly calculated
    expect(screen.getByText('Subtotal')).toBeTruthy();
    expect(screen.getByText('$25')).toBeTruthy();
    const totalLabel = screen.getAllByText('Total');
    const totalAmount = screen.getByText('$27'); // Ensure you match the correct total
    expect(totalLabel).toBeTruthy();
    expect(totalAmount).toBeTruthy();
  });

  test('calls removeFromCart when the remove button is clicked', () => {
    const itemId1 = "1"; // Correct the itemId to string (since it's a string key in the context)
    render(
      <Router>
        <StoreContext.Provider value={mockContext}>
          <Cart />
        </StoreContext.Provider>
      </Router>
    );

    const removeButtons = screen.getAllByText('x'); // Get all 'x' buttons
    fireEvent.click(removeButtons[0]); // Click the first remove button (or choose the correct one)

    // Ensure removeFromCart was called with the correct itemId
    expect(mockRemoveFromCart).toHaveBeenCalledWith(itemId1);
  });

  test('does not render cart items when the cart is empty', async () => {
    const emptyCartContext = { ...mockContext, cartItems: {} };

    render(
      <Router>
        <StoreContext.Provider value={emptyCartContext}>
          <Cart />
        </StoreContext.Provider>
      </Router>
    );

    // Ensure no cart items are displayed
    expect(screen.queryByText('Item 1')).toBeNull();
    expect(screen.queryByText('Item 2')).toBeNull();
  });
});
