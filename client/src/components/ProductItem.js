import React from "react";
import { Card, Button } from "react-bootstrap";
const ProductItem = ({ product, addToCart }) => {
  return (
    <div className="m-3" style={{ height: "25rem" }}>
      <Card style={{ height: "30rem", width: "18rem" }}>
        <Card.Img style={{ height: "16rem" }} src={product.image} />
        <div className="mb-1">
          <Card.Body style={{}}>
            <Card.Title>{product.name}</Card.Title>
            <p>Price:{product.price}</p>
            <Card.Text>{product.shortDesc}</Card.Text>
            <div>
              {" "}
              {product.stock > 0 ? (
                <small> {product.stock} stock available </small>
              ) : (
                <small>Out of stock</small>
              )}
            </div>

            <Button
              variant="primary"
              onClick={() =>
                addToCart({
                  id: product.name,
                  product,
                  amount: 1,
                })
              }
            >
              Add to Cart
            </Button>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
};
export default ProductItem;
