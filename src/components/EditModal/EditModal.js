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

export default function EditModal(props) {
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

  const handleSubmit = (id, level) => {
    Axios.put("http://localhost:3001/update", {
      id,
      email: item.email,
      password: item.password,
      level,
    });
    window.location.reload(false);
    setShowEditModal(false);
  };

  

  return (
    <Modal isOpen={showEditModal} toggle={toggle}>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(item._id, item.level);
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
                defaultValue={item.email}
                onChange={(event) => {
                  setItem({ ...item, email: event.target.value });
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
