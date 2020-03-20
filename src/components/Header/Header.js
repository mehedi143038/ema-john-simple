import React, { useState, useRef, useEffect } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import Auth from '../Login/useAuth';


const usePrevious = value =>{
    const prev = useRef();
    useEffect(()=>{
        prev.current =value;
    },[value])
    return prev.current;
}


const Header = () => {
    const auth = Auth();
    console.log(auth.user);

    const [count,setCount] = useState(0);

    const previous = usePrevious(count);

    return (
        <div className="header">
            <h1>Count: {count} Previous: {previous}</h1>
            <button onClick={()=>setCount(count+1)}>+</button>
            <button onClick={()=>setCount(count-1)}>-</button>
            <img src={logo} alt=""/>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Orders</a>
                <a href="/inventory">Manage Inventory here</a>
                {
                    auth.user && <span style={{color: 'yellow'}}>Welcome {auth.user.name}</span>
                }
                {
                    auth.user ? <a href="/login">Sign Out</a>
                    : <a href="/login">Sign In</a>
                }
            </nav>
        </div>
    );
};

export default Header;