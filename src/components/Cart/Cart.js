import React from 'react';
import { useAuth } from '../Login/useAuth';


const Cart = (props) => {
    const auth = useAuth();
    console.log(auth.user);

    const cart = props.cart;
    const total =cart.reduce((total,product)=>total+product.price*product.quantity,0);
    
    let shipping = 12.99;
    if(total<350){
        shipping =0;
    }
    let VAT = Math.round(total/10).toFixed(2);

    return (
        <div>
            <h4>Order summary</h4>
            <h4>Items Ordered: {cart.length}</h4>
            <p>Product price: {total}</p>
            <p>Tax: {VAT}</p>
            <p><small>Shipping :{shipping}</small></p>
            <h2>Total: {total+shipping+Number(VAT)}</h2>
            {
                props.children
            }
            <p>{}</p>
        </div>
    );
};

export default Cart;