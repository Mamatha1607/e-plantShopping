import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice'; // Import Redux action
import './ProductList.css';
import CartItem from './CartItem';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({}); // Track items in the cart
    const dispatch = useDispatch(); // Redux dispatch

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" }
            ]
        }
    ];

    // Function to handle adding items to the cart
    const handleAddToCart = (plant) => {
        dispatch(addItem(plant)); // Add item to Redux store
        setAddedToCart((prevState) => ({
            ...prevState,
            [plant.name]: true // Mark plant as added
        }));
    };

    return (
        <div>
            <div className="navbar">
                <h1>Paradise Nursery</h1>
                <button onClick={() => setShowCart(!showCart)}>🛒 Cart</button>
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
                                            disabled={addedToCart[plant.name]} // Disable if already added
                                        >
                                            {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem />
            )}
        </div>
    );
}

export default ProductList;
