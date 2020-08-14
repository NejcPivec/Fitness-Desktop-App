import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const UserCard = ({
  user: { _id, name, lastname, email, phone },
  deleteUser,
  editUser,
  measurementUser,
}) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>
          {name.charAt(0).toUpperCase() + name.slice(1)}{" "}
          {lastname.charAt(0).toUpperCase() + lastname.slice(1)}
        </Card.Title>
        <Card.Text>
          <FontAwesomeIcon icon={faEnvelope} /> {email}
        </Card.Text>
        <Card.Text>
          <FontAwesomeIcon icon={faPhone} /> {phone}
        </Card.Text>
        <div className="flex">
          <Button variant="dark" size="lg" onClick={() => measurementUser(_id)}>
            Meritve
          </Button>
          <Button
            variant="warning"
            size="sm"
            className="mx-2"
            onClick={() => editUser(_id)}
          >
            <FontAwesomeIcon icon={faPen} />
          </Button>
          <Button variant="danger" size="sm" onClick={() => deleteUser(_id)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
