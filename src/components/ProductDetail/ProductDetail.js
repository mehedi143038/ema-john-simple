import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useEffect } from 'react';

const ProductDetail = () => {
    const {productKey}=useParams();
    const [product,setProduct] =useState(null);

    useEffect(()=>{
        fetch('http://localhost:3000/products/'+productKey)
        .then(res=>res.json())
        .then(data=>{
            setProduct(data);
        })
    },[productKey])


    return (
        <div>
            <h3>Information of the Product : {productKey}</h3>
            {
                product && <Product showAddToCart={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetail;