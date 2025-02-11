import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                cartItems.map(item => (
                    <div key={item.name} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-image" />
                        <div>
                            <h3>{item.name}</h3>
                            <p>Price: {item.cost}</p>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))}>
                                ➕
                            </button>
                            <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: Math.max(item.quantity - 1, 1) }))}>
                                ➖
                            </button>
                            <button onClick={() => dispatch(removeItem({ name: item.name }))}>❌ Remove</button>
                        </div>
                    </div>
                ))
            )}
            <button onClick={onContinueShopping}>Continue Shopping</button>
        </div>
    );
};

export default CartItem;
