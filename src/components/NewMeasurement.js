import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Jumbotron from "react-bootstrap/Jumbotron";
import DatePicker from "react-date-picker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const NewMeasurement = ({ addItem, measure, backPage }) => {
  const [userId, setUserId] = useState(measure);
  const [weight, setWeight] = useState("");
  const [skin, setSkin] = useState("");
  const [fat, setFat] = useState("");
  const [muscle, setMuscle] = useState("");
  const [fat_part, setFatPart] = useState("");
  const [waist, setWaist] = useState("");
  const [itm, setItm] = useState("");
  const [created, setDate] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    addItem({
      userId,
      weight,
      skin,
      waist,
      fat,
      muscle,
      fat_part,
      itm,
      created,
    });

    setWeight("");
    setSkin("");
    setFat("");
    setMuscle("");
    setFatPart("");
    setWaist("");
    setItm("");
    setDate("");
  };

  return (
    <>
      <Button variant="warning" size="sm" onClick={() => backPage()}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Button>
      <Jumbotron className="mt-4">
        <h1>Nova meritev</h1>
        <Form onSubmit={onSubmit}>
          <Row className="align-items-center">
            <Col className="my-2">
              <InputGroup>
                <Form.Control
                  placeholder="Telesna masa"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon2">kg</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
            <Col className="my-2">
              <InputGroup>
                <Form.Control
                  placeholder="Sum kožnih gub"
                  value={skin}
                  onChange={(e) => setSkin(e.target.value)}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon2">mm</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>

            <Col className="my-2">
              <InputGroup>
                <Form.Control
                  placeholder="Maščobna masa"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col className="my-2">
              <InputGroup>
                <Form.Control
                  placeholder="Pusta mišična masa"
                  value={muscle}
                  onChange={(e) => setMuscle(e.target.value)}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon2">kg</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>

            <Col className="my-2">
              <InputGroup>
                <Form.Control
                  placeholder="Delež maščobe"
                  value={fat_part}
                  onChange={(e) => setFatPart(e.target.value)}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon2">kg</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>

            <Col className="my-2">
              <InputGroup>
                <Form.Control
                  placeholder="Obseg pasu"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon2">cm</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <InputGroup>
                <Form.Control
                  placeholder="Indeks telesne mase"
                  value={itm}
                  onChange={(e) => setItm(e.target.value)}
                />
                <InputGroup.Append>
                  <InputGroup.Text id="basic-addon2">kg/m2</InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
            <Col xs={4}>
              <DatePicker onChange={setDate} value={created} />
            </Col>
          </Row>

          <Row className="my-2">
            <Col>
              <Button type="submit" variant="secondary" block>
                Dodaj meritev
              </Button>
            </Col>
          </Row>
        </Form>
      </Jumbotron>
    </>
  );
};

export default NewMeasurement;
