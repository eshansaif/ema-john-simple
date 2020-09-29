import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from './ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart,setCart] = useState([]);

    const [orderPlaced, setOrderPlaced] = useState(false);

    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment');

    }

    const handlerRemoveProduct = (productKey) => {
        console.log("remove clicked", productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart)
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        // console.log(savedCart);

        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            // console.log(key);
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);

    },[]);

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt=""/>;
    }
    return (
        <div className="twin-container">
            <div className="product-container">
            
            {/* <h1>Cart Items: {cart.length}</h1> */}
            {
            cart.map(pd => <ReviewItem product={pd} key={pd.key} handlerRemoveProduct={handlerRemoveProduct}></ReviewItem>)
            }
            { thankYou }
            
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="product-btn">Proceed Checkout</button>
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;