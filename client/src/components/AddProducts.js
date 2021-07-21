import react, { Component } from "react";
import withContext from "../withContext";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const initState = {
  name: "",
  price: "",
  stock: "",
  image: "",
  shortDesc: "",
  descriptio: "",
};

class AddProducts extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  save = () => {
    const { name, price, stock, image, shortDesc, description } = this.state;
    console.log("save called");
    if (name && price) {
      console.log(name, price, description);
      const id =
        Math.random().toString(36).substring(2) + Date.now().toString(36);
      console.log(id);
      this.props.context.AddProducts(
        id,
        {
          name,
          price,
          stock,
          image,
          shortDesc,
          description,
        },
        () => this.setState(initState)
      );
      this.setState({
        flash: {
          status: "in-success",
          msg: "successfully updated to the server",
        },
      });
    } else {
      this.setState({
        flash: {
          status: "in-danger",
          msg: "please fill the name and th price",
        },
      });
    }
  };
  handleChange = (e) =>
    this.setState({ [e.target.name]: e.target.value, error: "" });

  render() {
    const { name, price, stock, shortDesc, description } = this.state;
    const { user } = this.props.context;

    return (
      <>
        <Button>show all products</Button>
        <h4> Add Products </h4>
        <Form onSubmit={this.save}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              name="name"
              type="text"
              placeholder="Name of the Product"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              name="price"
              type="number"
              placeholder="price"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>stock</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              name="stock"
              type="number"
              placeholder="stock"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              name="image"
              type="text"
              placeholder="Image URL"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>shortDesc</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="text"
              name="shortDesc"
              placeholder="Short description"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              type="text"
              name="description"
              placeholder="Description"
            />
          </Form.Group>

          <Button onClick={this.save}>Submit</Button>
        </Form>
      </>
    );
  }
}

export default withContext(AddProducts);
