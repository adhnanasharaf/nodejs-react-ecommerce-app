import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import withContext from "../withContext";
import { Route, Redirect } from "react-router-dom";


class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
   
  componentDidMount(){
  console.log(this.props.context.user);
  console.log(this.props.context.products)
  }

  handleChange = (e) =>
    this.setState({ [e.target.name]: e.target.value, error: "" });

  login = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    console.log(username, password);
    if (!username || !password) {
      console.log("fill the form");
      return this.setState({ error: "fill the required fields" });
    }
    this.props.context.login(username, password).then((loggedIn) => {
      if (!loggedIn) {
        this.setState({ error: "Invalid credentials" });
      } else{
        
      }
    });
  };
  
  render() {
    return (
      <>
      <Form onSubmit={this.login}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            name="username"
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
           
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <div>
          {" "}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
      </>
    )
  }
}
export default withContext(Login);
