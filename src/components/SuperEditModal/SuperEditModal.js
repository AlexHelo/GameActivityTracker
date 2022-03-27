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

export default function SuperEditModal(props) {
  const {
    showEditModal,
    setShowEditModal,
    data,
    setData,
    item,
    setItem,
    ...rest
  } = props;
  const toggle = () => setShowEditModal(!showEditModal);

  const handleSubmit = (id) => {
    Axios.put("http://localhost:3001/update", {
      id,
      name: item.name,
      password: item.password,
      level: item.level,
    });
    setShowEditModal(false);
  };

  console.log("data:", data);

  return (
    <Modal isOpen={showEditModal} toggle={toggle}>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(item._id);
        }}
      >
        <ModalHeader>
          <div>
            <h3>Edit</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FormGroup row className="mt-2">
            <Label sm={3}>Email</Label>
            <Col sm={9}>
              <input
                className="form-control"
                type="email"
                required
                name="email"
                defaultValue={item.name}
                onChange={(event) => {
                  setItem({ ...item, name: event.target.value });
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
                defaultValue={item.password}
                required
                onChange={(event) => {
                  setItem({ ...item, password: event.target.value });
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
                defaultValue={item.level}
                onChange={(event) => {
                  setItem({ ...item, level: event.target.value });
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
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
}
