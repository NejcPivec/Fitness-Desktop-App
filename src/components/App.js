import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ipcRenderer } from "electron";

import AddNewUser from "./AddNewUser";
import UpdateUser from "./UpdateUser";
import UserCard from "./UserCard";
import NewMeasurement from "./NewMeasurement";
import SingleMeasure from "./SingleMeasure";
import GraphSkin from "./graphs/GraphSkin";
import GraphWeight from "./graphs/GraphWeight";
import GraphFat from "./graphs/GraphFat";
import GraphMuscle from "./graphs/GraphMuscle";
import GraphFatPart from "./graphs/GraphFatPart";
import GraphWaist from "./graphs/GraphWaist";
import GraphItm from "./graphs/GraphItm";

const App = () => {
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const [current, setCurrent] = useState(null);
  const [measure, setMeasure] = useState("");

  const [logs, setLogs] = useState([]);
  const [userLogs, setUserLogs] = useState([]);

  // First
  useEffect(() => {
    ipcRenderer.send("users:load");

    ipcRenderer.on("users:get", (e, users) => {
      setUsers(JSON.parse(users));
    });

    ipcRenderer.send("logs:load");

    ipcRenderer.on("logs:get", (e, logs) => {
      setLogs(JSON.parse(logs));
    });
  }, []);

  // Add new user
  const addUser = (user) => {
    // name and lastname are required
    if (user.name === "" || user.lastname === "") {
      showAlert("Name and Lastname are required", "danger");
      return false;
    }

    ipcRenderer.send("user:add", user);
    showAlert("User added", "success");
  };

  // Edit user
  const editUser = (_id) => {
    users.map((user) => {
      if (user._id === _id) {
        setCurrent(user);
      }
    });
  };

  // Fix or update user
  const fixUser = ({ _id, name, lastname, email, phone }) => {
    ipcRenderer.send("user:edit", _id, name, lastname, email, phone);
    showAlert("User was edited", "success");
    setCurrent(null);
  };

  // Delete User
  const deleteUser = (_id) => {
    ipcRenderer.send("user:delete", _id);
    showAlert("User deleted");
  };

  // Alert
  const showAlert = (message, variant = "success", seconds = 3000) => {
    setAlert({
      show: true,
      message,
      variant,
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message: "",
        variant,
      });
    }, seconds);
  };

  // User Measurements
  const measurementUser = (_id) => {
    ipcRenderer.send("userLogs:load", _id);

    ipcRenderer.on("userLogs:get", (e, userLogs) => {
      setUserLogs(JSON.parse(userLogs));
    });

    users.map((user) => {
      if (user._id === _id) {
        setMeasure(user._id);
      }
    });
  };

  // add new Measurement
  const addItem = (item) => {
    if (
      item.weight === "" ||
      item.skin === "" ||
      item.fat === "" ||
      item.muscle === "" ||
      item.fat_part === "" ||
      item.waist === "" ||
      item.itm === "" ||
      item.date === ""
    ) {
      showAlert("Please enter all fields", "danger");
      return false;
    }

    ipcRenderer.send("logs:add", item);
    showAlert("Measurement added");
  };

  // Delete item
  const deleteItem = (_id) => {
    ipcRenderer.send("logs:delete", _id);
    showAlert("Measurement Removed");
  };

  // Return to main page
  const backPage = () => {
    setMeasure("");
    setUserLogs([]);
  };

  return (
    <>
      {measure === "" ? (
        <Container>
          {current !== null ? (
            <UpdateUser current={current} fixUser={fixUser} />
          ) : (
            <AddNewUser addUser={addUser} />
          )}
          {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
          <h5>Users</h5>
          <div className="grid-container">
            {users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                deleteUser={deleteUser}
                editUser={editUser}
                measurementUser={measurementUser}
              />
            ))}
          </div>
        </Container>
      ) : (
        <>
          <Container>
            <NewMeasurement
              addItem={addItem}
              measure={measure}
              backPage={backPage}
            />
            {alert.show && (
              <Alert variant={alert.variant}>{alert.message}</Alert>
            )}
            <Table striped bordered hover className="mb-10">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Telesna masa</th>
                  <th>Sum kožnih gub</th>
                  <th>Maščobna masa</th>
                  <th>Pusta masa</th>
                  <th>Delež maščobe</th>
                  <th>Obseg pasu</th>
                  <th>ITM</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userLogs.map((log) => (
                  <SingleMeasure
                    log={log}
                    key={log._id}
                    deleteItem={deleteItem}
                  />
                ))}
              </tbody>
            </Table>
          </Container>
          <Row className="mx-4 my-4">
            <Col sm>
              <GraphWeight userLogs={userLogs} />
            </Col>
            <Col sm>
              <GraphSkin userLogs={userLogs} />
            </Col>
            <Col sm>
              <GraphFat userLogs={userLogs} />
            </Col>
          </Row>
          <Row className="mx-4 my-4">
            <Col sm>
              <GraphMuscle userLogs={userLogs} />
            </Col>
            <Col sm>
              <GraphFatPart userLogs={userLogs} />
            </Col>
            <Col sm>
              <GraphWaist userLogs={userLogs} />
            </Col>
          </Row>
          <Row className="mx-4 my-4">
            <Col xs={4}>
              <GraphItm userLogs={userLogs} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default App;
