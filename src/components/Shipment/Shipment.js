import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm()
    const auth = useAuth();
    const onSubmit = data => { 
      //TODO: Someone move this after payment
      console.log(auth.user.email);
      const savedCart = getDatabaseCart();
      const orderDetail = {email: auth.user.email, cart: savedCart};
      fetch('http://localhost:3000/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetail) 
      })
      .then(res => res.json())
      .then(data => {
        console.log('order placed',data);
        alert('Successfully placed the order with order ')
        processOrder();
      })
    }
    

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder= "Your Name" />
      {errors.name && <span className = "error">Name is required</span>}
      
      <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder= "Your Email"/>
      {errors.email && <span className = "error">Email is required</span>}
      
      <input name="AddressLine1" ref={register({ required: true })} placeholder="Address Line 1"/>
      {errors.AddressLine1 && <span className = "error">AddressLine1 is required</span>}
      
      <input name="AddressLine2" ref={register}  placeholder="Address Line 2"/>
      
      <input name="city" ref={register({ required: true })} placeholder="Your city"/>
      {errors.city && <span className = "error">City is required</span>}
      
      <input name="Country" ref={register({ required: true })} placeholder="Your Country"/>
      {errors.Country && <span className = "error">Country is required</span>}
      
      <input name="zipcode" ref={register({ required: true })} placeholder="Zip Code"/>
      {errors.zipcode && <span className = "error">Zip Code is required</span>}
      
      
      <input type="submit" />
    </form>
  )
};

export default Shipment;