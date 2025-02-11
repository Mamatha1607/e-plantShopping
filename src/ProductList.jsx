import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice'; // Import Redux action
import './ProductList.css';
import CartItem from './CartItem';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    return (
        <div>
            <div className="navbar">
                <h1>Paradise Nursery</h1>
                <button onClick={() => setShowCart(!showCart)}>🛒 Cart ({cartItems.length})</button>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index} className="category-section">
                            <h2>{category.category}</h2>
                            <div className="plant-list">
                                {category.plants.map((plant, idx) => (
                                    <div key={idx} className="plant-card">
                                        <img src={plant.image} alt={plant.name} className="plant-image" />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.description}</p>
                                        <p><strong>{plant.cost}</strong></p>
                                        <button
                                            className="add-to-cart-btn"
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={cartItems.some(item => item.name === plant.name)}
                                        >
                                            {cartItems.some(item => item.name === plant.name) ? "Added" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
}

export default ProductList;
