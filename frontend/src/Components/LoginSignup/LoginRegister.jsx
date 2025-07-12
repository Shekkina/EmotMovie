import React, { useState } from "react";
import "./LoginRegister.css";
import { Button, Form, Tabs, Tab, Container } from "react-bootstrap";

function LoginRegister() {
  const [key, setKey] = useState("login");

  return (
    <div className="auth-box">
      <Container>
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-4 custom-tabs"
        >
          <Tab eventKey="login" title="Login">
            <Form>
              <Form.Group controlId="formLoginEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formLoginPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-4">
                Login
              </Button>
            </Form>
          </Tab>

          <Tab eventKey="signup" title="Sign Up">
            <Form>
              <Form.Group controlId="formSignupName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
              </Form.Group>

              <Form.Group controlId="formSignupEmail" className="mt-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formSignupPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100 mt-4">
                Sign Up
              </Button>
            </Form>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
}

export default LoginRegister;
