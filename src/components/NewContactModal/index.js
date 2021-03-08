import { useFormik } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as yup from "yup";
import { useContacts } from "../../_contexts/ContactsProvider";

const validationSchema = yup.object().shape({
  userid: yup.string().required(),
  username: yup.string().required(),
});

const NewContactModal = ({ onHide = () => {} }) => {
  const { createContact } = useContacts();

  const handleCreateContact = React.useCallback(
    (data) => {
      createContact(data);
      onHide();
    },
    [createContact, onHide]
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
