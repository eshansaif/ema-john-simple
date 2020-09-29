import React from 'react';
// import { removeFromDatabaseCart } from '../../../utilities/databaseManager';

const ReviewItem = (props) => {
    console.log(props);
    const {name,quantity,key, price} = props.product;
    const reviewItemStyle = { borderBottom: '1px solid lightgray', padding: '5px', marginLeft: '200px', marginBottom:'5px'};
    return (
        <div style={reviewItemStyle} className="review-item">
            <h4 className="product-name">{name}</h4>
            <p><small>Price: {price}</small></p>
            <p>Quantity: {quantity}</p>
            <button onClick={() => props.handlerRemoveProduct(key)} className="product-btn">Remove</button>
        </div>
    );
};

export default ReviewItem;