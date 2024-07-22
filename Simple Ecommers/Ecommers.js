import React, { useState } from "react";
import './Ecommers.css';

function Ecom() {
    const [selectedCategory, setSelectedCategory] = useState('category1');
    const [items] = useState({
        category1: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
        category2: ['Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'],
        category3: ['Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15']
    });
    const [cart, setCart] = useState({});

    const handleAddItem = (item) => {
        setCart(e => {
            const newCart = { ...e };
            if (!newCart[item]) {
                newCart[item] = 1; // Add item to cart with a quantity of 1
            }
            return newCart;
        });
    };

    const handleRemoveItem = (item) => {
        setCart(e => {
            const newCart = { ...e };
            if (newCart[item]) {
                delete newCart[item]; // Remove item from cart
            }
            return newCart;
        });
    };

    const cartItemCount = (item) => {
        return cart[item] ? 1 : 0; // Each item can only be added once
    };

    const hasItemsInCart = Object.keys(cart).length > 0;

    return (
        <>
            <div className="head">
                <div className="item1">My Shopping Site</div>
                <div className={`item2 ${hasItemsInCart ? 'visible' : 'hidden'}`}>
                    Checkout Items: {Object.keys(cart).length}
                </div>
            </div>
            <div className="box">
                <div className="side">
                    <p onClick={() => setSelectedCategory('category1')}>Category 1</p>
                    <p onClick={() => setSelectedCategory('category2')}>Category 2</p>
                    <p onClick={() => setSelectedCategory('category3')}>Category 3</p>
                </div>
                <div className="side2">
                    {items[selectedCategory].map((item, index) => (
                        <div key={index} className="item-container">
                            <p>{item}</p>
                            <div>
                                <button 
                                    onClick={() => handleAddItem(item)}
                                    disabled={cartItemCount(item) > 0}
                                >
                                    +
                                </button>
                                <button 
                                    onClick={() => handleRemoveItem(item)}
                                    disabled={cartItemCount(item) === 0}
                                >
                                    -
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Ecom;
