import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import withContext from "../withContext";

const Cart = (props) => {
  const { cart } = props.context;
  console.log("from the cart page", cart);

  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title"> Our Shopping cart</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {cart[0] && cart.length ? (
            cart.map((cart, index) => <CartItem cartItem={cart} key={index} removeFromCart={props.context.removeFromCart} changingQuantity={props.context.changingQuantity}/>)
           ) : (
            <div className="column">
              <span className="title has-text-grey-light">
                No products found!
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withContext(Cart);
