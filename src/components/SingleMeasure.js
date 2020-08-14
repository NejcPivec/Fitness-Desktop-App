import React from "react";
import Moment from "react-moment";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const SingleMeasure = ({
  log: { _id, weight, skin, waist, fat, muscle, fat_part, itm, created },
  deleteItem,
}) => {
  return (
    <tr>
      <td>
        <Moment format="MMMM Do YYYY">{new Date(created)}</Moment>
      </td>
      <td>{weight} kg</td>
      <td>{skin} mm</td>
      <td>{fat} %</td>
      <td>{muscle} kg</td>
      <td>{fat_part} kg</td>
      <td>{waist} cm</td>
      <td>{itm} kg/m2</td>
      <td>
        <Button variant="dark" size="sm" onClick={() => deleteItem(_id)}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </td>
    </tr>
  );
};

export default SingleMeasure;
