import { useFormik } from "formik";
import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  uuid: yup.string().required(),
});

const Login = ({ onCreateNewId = () => {} }) => {
  const handleLogin = React.useCallback((data) => {
    console.log(data);
  }, []);

  const handleCreateNewId = React.useCallback(() => {
    onCreateNewId();
  }, [onCreateNewId]);

  const formik = useFormik({
    initialValues: {
      uuid: "",
    },
    onSubmit: handleLogin,
    validationSchema,
  });

  return (
    <Container
      className="d-flex align-items-center"
      style={{ height: "100vh" }}
    >
      <Form className="w-100" onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>Enter your account id</Form.Label>
          <Form.Control
            type="text"
            id="uuid"
            name="uuid"
            onChange={formik.handleChange}
            value={formik.values.uuid}
            isInvalid={formik.errors.uuid}
          />
          <Form.Control.Feedback type="invalid">
            Your account id is required
          </Form.Control.Feedback>
        </Form.Group>
        <Button name="login" type="submit" className="mr-2">
          Get started
        </Button>
        <Button
          variant="secondary"
          name="createaccount"
          onClick={handleCreateNewId}
        >
          Create new account id
        </Button>
      </Form>
    </Container>
  );
};

export default React.memo(Login);
