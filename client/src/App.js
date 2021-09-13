import React, { useState, Component } from "react";
import {
  Switch,
  Route,
  Link,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import Cart from "./components/CartPage";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import AddProducts from "./components/AddProducts";


import axios from "axios";

import jwt_decode from "jwt-decode";
import { render } from "@testing-library/react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";




import Context from "./Context";
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      cart: [],
      products: [],
      showMenu: null,
  admin:  false

    };
    this.routerRef = React.createRef();
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          login: this.login,
          addToCart: this.addToCart,
          cart: this.state.cart,
          removeFromCart:this.removeFromCart,
          changingQuantity:this.changingQuantity,
          AddProducts:this.AddProducts,
          ShowAllProducts:this.  ShowAllProducts
        }}
      >
        <Router ref={this.routerRef}>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="">Ecommerse</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href={this.state.user ? "/cart" : "/login"}>
                  Cart
                </Nav.Link>
                <Nav.Link href="/">Products</Nav.Link>
                {this.state.admin === true ?( <Nav.Link href="/Add-products">Add Products</Nav.Link>)
                 :""
                }
                

                <NavDropdown
                  title={!this.state.user ? "account" : this.state.user[0]}
                  id="basic-nav-dropdown"
                >
                  {!this.state.user ? (
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  ) : (
                  <NavDropdown.Item onClick={this.logout}>
                    Logout
                  </NavDropdown.Item>
                  )}
                </NavDropdown>
              </Nav>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>

          <Switch>
            <Route exact path="/cart">
              <Cart 
               removeFromCart = {this.removeFromCart}
              />
            </Route>
            <Route exact path="/">
              
              <ProductList
                products={this.state.products}
                addToCart={this.addToCart}
               
              />
            </Route>
            <Route exact path="/Login">
              <Login login={this.login} />
            </Route>

          

            <Route exact path="/Add-products">
              <AddProducts />
            </Route>
          </Switch>
        </Router>
      </Context.Provider>
    );
  }

  async componentDidMount() {
    const api = await axios.get("/api");
    console.log(api)
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");
    let admin = localStorage.getItem("admin");
    console.log(admin)
 console.log(user)

   const products = await axios.get("/products");
   console.log(products.data.products)  

    user = user ? JSON.parse(user) : null;
    cart = cart ? JSON.parse(cart) : [];
    let arrUser = null;
    user
      ? (arrUser = Object.keys(user).map((index) => {
          let person = user[index];
          return person;
        }))
      : (arrUser = null);
    this.setState({ user: arrUser, products: products.data.products, cart ,admin});
    console.log("app", this.state.cart);
    // console.log(this.state.user);
    console.log(this.state.admin);
    //localStorage.removeItem("cart");
  } 
  login = async (email, password) => {
    const res = await axios
      .post("/login", { email, password })
      .catch((res) => {
        
        return { status: 404, message: "unauthorised user" };
      });

    if (res.data === true) {
      console.log("authentication process cleared");


      const user = {
        email,
        accessToken: email === "admin@example.com" ? 0 : 1,
        
      };
      if(email === "admin@example.com"){
        let admin = this.state.admin;
        admin = true;
        this.setState({admin})
        localStorage.setItem("admin", ({admin}));
      }

      const arrUser = Object.keys(user).map((index) => {
        let person = user[index];
        return person;
      });
      this.setState({ arrUser }, () => {});

      localStorage.setItem("user", JSON.stringify(user));
      <Redirect to="/" />;
      console.log("login fully successed");

      return true;
    } else {
      return false;
    }
  };

  addToCart = (cartItem) => {
    console.log("cart item form top of the add tocart cartItem", cartItem);
    let cart = this.state.cart;
    console.log("from top of the addtocart", cart);

    console.log(cart);
    console.log(cartItem.id);
    // console.log(cart.includes(cartItem.id))

    const found = cart.some((el) => el.id === cartItem.id);
    const elementsIndex = cart.findIndex(
      (element) => element.id == cartItem.id
    );
    console.log(elementsIndex);
    console.log(found);
    if (elementsIndex >= 0) {
      console.log("count added");
      cart[elementsIndex].amount += cartItem.amount;
    } else {
      console.log("new added");
      cart.push(cartItem);
    }
    console.log("before updating to the state", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState(cart);
    console.log("this is bottom of add to cart  ", this.state.cart);
  };
  removeFromCart=(cartItem)=>{

    let cart = this.state.cart;
    const elementsIndex = cart.findIndex(
      (element) => element.id == cartItem.id
    );
    console.log(elementsIndex)
    cart.splice(elementsIndex, 1);


      localStorage.setItem("cart", JSON.stringify(cart));
      this.setState(cart);
  }

changingQuantity=(details)=>{
  console.log("change in quantity called",details.direction)


  let cart = this.state.cart;
  const elementsIndex = cart.findIndex(
    (element) => element.id == details.id
  );
  console.log(elementsIndex)
if(details.direction === "increase"){
    cart[elementsIndex].amount += 1;
}else{
  cart[elementsIndex].amount -= 1;
  if(cart[elementsIndex].amount === 0){
    cart.splice(elementsIndex, 1);
  }
}

localStorage.setItem("cart", JSON.stringify(cart));
this.setState(cart);
}

AddProducts = (id,product) => {
  console.log(id,product)
  const sentToBackend =  axios
      .post("/addproducts", {id,product }).then((res)=>{
  console.log(res.data)
      })

  };

  ShowAllProducts=()=>{
    console.log("show all products called")
  }

  logout = () => {
    console.log(this.state.user);
    console.log("logout called");
    // e.preventDefault();
    let admin = this.state.admin;
    admin = false;
    this.setState({admin})
    localStorage.setItem("admin", (admin));

    this.setState({ user: "" });
    localStorage.removeItem("user");
  };
}
