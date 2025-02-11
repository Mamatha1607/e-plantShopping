import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    // ✅ Calculate total cart amount
    const calculateTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            const itemCost = parseFloat(item.cost.replace('$', '')); // Convert price string to number
            return total + itemCost * item.quantity;
        }, 0).toFixed(2);
    };

    // ✅ Calculate subtotal for a specific item
    const calculateTotalCost = (item) => {
        const itemCost = parseFloat(item.cost.replace('$', ''));
        return (item.quantity * itemCost).toFixed(2);
    };

    // ✅ Handle checkout (for future functionality)
    const handleCheckoutShopping = () => {
        alert('Functionality to be added for future reference');
    };

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={item.name} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-image" />
                            <div className="cart-details">
                                <h3>{item.name}</h3>
                                <p>Price: {item.cost}</p>
                                <p>Subtotal: ${calculateTotalCost(item)}</p>
                                <p>Quantity: {item.quantity}</p>
                                <div className="cart-buttons">
                                    <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))}>
                                        ➕
                                    </button>
                                    <button onClick={() => {
                                        if (item.quantity > 1) {
                                            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
                                        } else {
                                            dispatch(removeItem({ name: item.name })); // If 0, remove item
                                        }
                                    }}>
                                        ➖
                                    </button>
                                    <button onClick={() => dispatch(removeItem({ name: item.name }))}>❌ Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="cart-summary">
                        <h3>Total Amount: ${calculateTotalAmount()}</h3>
                        <button onClick={handleCheckoutShopping}>Proceed to Checkout</button>
                    </div>
                </div>
            )}
            <button onClick={onContinueShopping}>Continue Shopping</button>
        </div>
    );
};

export default CartItem;
