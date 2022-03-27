//import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Label,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup,
  Form,
  Input,
} from "reactstrap";
import React, { useState } from "react";
import Axios from "axios";

export default function SuperAddModal(props) {
  const { showAddModal, setShowAddModal, data, setData, ...rest } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setShowAddModal(!showAddModal);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/user-create", {
      name: userName,
      password,
      level,
    });
    setShowAddModal(false);
  };

  return (
    <Modal isOpen={showAddModal} toggle={toggle}>
      <Form onSubmit={handleSubmit}>
        <ModalHeader>
          <div>
            <h3>Insert</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup row className="mt-2">
            <Label sm={3}>E-mail</Label>
            <Col sm={9}>
              <input
                className="form-control"
                type="email"
                required
                placeholder="hello@hello.com"
                name="name"
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
            </Col>
          </FormGroup>

          <FormGroup row className="mt-2">
            <Label sm={3}>Password</Label>
            <Col sm={9}>
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="**********"
                required
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Col>
          </FormGroup>

          <FormGroup row className="mt-2">
            <Label sm={3}>Level</Label>
            <Col sm={9}>
              <Input
                type="select"
                name="level"
                onChange={(event) => {
                  setLevel(event.target.value);
                }}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
                <option value="superadmin">superadmin</option>
              </Input>
            </Col>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" type="submit">
            Insert
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
