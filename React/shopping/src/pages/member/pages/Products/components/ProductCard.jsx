import React from 'react'
import { addToCart } from '../../../../../services/addToCart-service';
import Carousel from 'nuka-carousel';
import '../Products.css'

import Rating from '@mui/material/Rating';



const ProductCard = (props) => {

    const { id, title, price, review, photos } = props;

    const addToCartHandler = async () => {
        const productId = id
        await addToCart(productId);
    }

    return (
        <div className='products'>
            <div className='product'>
                <img src={photos[0]} alt={title} className='image' />
                <div className='description'>
                    <p><b>{title}</b></p>
                    <Rating name="read-only" value={review} readOnly />
                    <p>${price}</p>
                </div>
                <button className='addToCartBttn' onClick={addToCartHandler} >
                    Add To Cart
                </button>
            </div>
        </div>


    );
}


export default ProductCard;