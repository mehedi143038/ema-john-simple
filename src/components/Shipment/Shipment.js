import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, clearLocalShoppingCart } from '../../utilities/databaseManager';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckOutForm/CheckOutForm';
import { useState } from 'react';
const Shipment = () => {
  const [shipInfo, setShipInfo] = useState(null);
  const [orderId,setOrderId] =useState(null);
  const { register, handleSubmit, watch, errors } = useForm()
  const auth = useAuth();

  const stripePromise = loadStripe('pk_test_FmdlVkY4lnFHoXXoMRFMaUZZ00tqYtvo0L');

  const onSubmit = data => {
    setShipInfo(data);
  }

  const handlePlaceOrder = (payment) => {
    //TODO: Someone move this after payment
    //console.log(auth.user.email);
    const savedCart = getDatabaseCart();
    const orderDetail = {
      email: auth.user.email,
      cart: savedCart,
      shipment: shipInfo,
      payment: payment
    };
    fetch('http://localhost:3000/placeOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetail)
    })
      .then(res => res.json())
      .then(order => {
        setOrderId(order._id);
        clearLocalShoppingCart();
        // clear localstorage cart
      })  
  }


  return (
    <div className="container">
      <div className="row">
        <div style={{display: shipInfo && 'none'}} className="col-md-6">
          <h2>Shipment Information</h2>
          <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Your Name" />
            {errors.name && <span className="error">Name is required</span>}

            <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Your Email" />
            {errors.email && <span className="error">Email is required</span>}

            <input name="AddressLine1" ref={register({ required: true })} placeholder="Address Line 1" />
            {errors.AddressLine1 && <span className="error">AddressLine1 is required</span>}

            <input name="AddressLine2" ref={register} placeholder="Address Line 2" />

            <input name="city" ref={register({ required: true })} placeholder="Your city" />
            {errors.city && <span className="error">City is required</span>}

            <input name="Country" ref={register({ required: true })} placeholder="Your Country" />
            {errors.Country && <span className="error">Country is required</span>}

            <input name="zipcode" ref={register({ required: true })} placeholder="Zip Code" />
            {errors.zipcode && <span className="error">Zip Code is required</span>}


            <input type="submit" />
          </form>
        </div>
        <div style={{'margin-top':'200px', display: shipInfo ? 'block' : 'none'}} className="col-md-6">
          <h3>This is Payment</h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
          </Elements>
          <br/>
          {
            orderId && <div>
            <h3>Thank you for shopping with us</h3>
            <p>your order id is : {orderId}</p>
            </div>
            
          }
        </div>
      </div>
    </div>
  )
};

export default Shipment;