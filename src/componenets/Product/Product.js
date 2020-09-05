import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = (props) => {
    // console.log(props);
    const {img, name, seller, price, stock} = props.productData;
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                
                <p><small>By {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - Order soon!</small></p>
                <button 
                onClick={() => props.handleAddProduct(props.productData)}
                className="product-btn">
                     <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>
            
        </div>
    );
};

export default Product;