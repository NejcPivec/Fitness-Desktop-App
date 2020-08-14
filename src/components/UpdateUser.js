import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const UpdateUser = ({ current, fixUser }) => {
  const [_id, setId] = useState(current._id);
  const [name, setName] = useState(current.name);
  const [lastname, setLastname] = useState(current.lastname);
  const [email, setEmail] = useState(current.email);
  const [phone, setPhone] = useState(current.phone);

  const onSubmit = (e) => {
    e.preventDefault();
    fixUser({ _id, name, lastname, email, phone });
    clearInput();
  };

  const clearInput = () => {
    setName("");
    setLastname("");
    setEmail("");
    setPhone("");
  };

  return (
    <Jumbotron className="mt-10">
      <h3 className="mb-2">Uredi osebo</h3>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col>
            <Form.Control
              placeholder="Ime"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Priimek"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="my-2">
          <Col>
            <Form.Control
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Telefonska številka"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="submit" variant="dark" block>
              Uredi osebo
            </Button>
          </Col>
        </Row>
      </Form>
    </Jumbotron>
  );
};

export default UpdateUser;
