import React from "react";
import { Card, Button } from "react-bootstrap";

const CartItem = ({ cartItem, removeFromCart,changingQuantity }) => {
 
  return (
    <div className="m-3 " style={{ height: "25rem" }}>
      <Card style={{ height: "30rem", width: "18rem" }}>
        <Card.Img className="mb-3" style={{ height: "16rem" }} src={cartItem.product.image} />
        <div className="mb-1">
          <Card.Body style={{}}>
            <Card.Title> {cartItem.id} </Card.Title>
            <p>Price:{cartItem.product.price}</p>
            <div
              class="btn-group"
              role="group"
              aria-label="Basic outlined example"
            >
              <button onClick={()=>changingQuantity({direction:"increase", id: cartItem.id, cartItem})}  type="text" class="btn btn-outline-primary">
                +
              </button>

              <Card.Text>{cartItem.amount}</Card.Text>
              <button onClick={()=>changingQuantity({direction:"decrease", id: cartItem.id, cartItem})} type="button" class="btn btn-outline-primary">
                -
              </button>
            </div>

            <Button
              variant="primary"
              onClick={() =>
                removeFromCart({ id: cartItem.id, cartItem, amount: 1 })
              }
            >
              remove from cart
            </Button>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};

export default CartItem;
