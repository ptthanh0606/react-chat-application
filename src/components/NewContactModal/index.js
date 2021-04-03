import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { addContact } from "../../api";
import { authSelector } from "../../slices/auth/authSlice";
import { triggerRefresh } from "../../slices/refresh";

const validationSchema = yup.object().shape({
  userid: yup.string().required(),
  username: yup.string().required(),
});

const NewContactModal = ({ onHide = () => {} }) => {
  const { uuid } = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleCreateContact = React.useCallback(
    (data) => {
      axios
        .put(addContact(uuid), {
          uuid: data.userid,
          nickname: data.username,
        })
        .then(() => {
          dispatch(triggerRefresh());
          onHide();
        })
        .catch((err) => {
          toast.error(err.response.data);
          onHide();
        });
    },
    [dispatch, onHide, uuid]
  );

  const formik = useFormik({
    initialValues: {
      userid: "",
      username: "",
    },
    onSubmit: handleCreateContact,
    validationSchema,
  });

  return (
    <>
      <Modal.Header closeButton>New contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} id="newContactForm">
          <Form.Group>
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              id="userid"
              name="userid"
              onChange={formik.handleChange}
              value={formik.values.userid}
              isInvalid={formik.errors.userid}
            />
            <Form.Control.Feedback type="invalid">
              Please provide an ID
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Recognize name</Form.Label>
            <Form.Control
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              isInvalid={formik.errors.username}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a name for this contact
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="newContactForm">
          Confirm
        </Button>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </>
  );
};

export default React.memo(NewContactModal);
