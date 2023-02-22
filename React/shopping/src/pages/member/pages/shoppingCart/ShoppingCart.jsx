import React, { useState, useEffect } from 'react'
import { fetchProductsById } from '../../../../services/fetchProductsById-service';
import ShoppingProducdItem from './components/ShoppingProducdItem';
import { Link } from 'react-router-dom';
import './ShoppingCart.css'

export default function ShoppingCart() {

  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);


  useEffect(() => {
    let price = 0;
    fetchProductsById()
      .then(data => {
        if (data.length > 0) {
          setCartProducts(data);
        }
        for (let i = 0; i < data.length; i++) {
          price += Number(data[i].price);
        }

        setTotalPrice(price.toFixed(2));
      })
      .catch(err => console.log(err))
  }, []);



  return (
    <div className='cart'>
      {cartProducts.length > 0
        ? <>
          <h1>Your Cart Items</h1>
          <p><i>Total Price:</i> <b>${totalPrice}</b></p>
          </>
        : 
        <>
        <h1>There are no items in your cart</h1>
        <p><Link to="/member/products">Go back</Link></p>
        </>
      }



      <div className='cartItems'>
        {cartProducts.map(item => (
          <ShoppingProducdItem
            key={item.id}
            {...item}
            setCartProducts={setCartProducts}
            setTotalPrice={setTotalPrice}
          />
        ))}
      </div>
    </div>
  )
}
