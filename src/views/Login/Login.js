import { useFormik } from "formik";
import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = ({ onCreateNewId = () => {} }) => {
  const history = useHistory();

  const handleLogin = React.useCallback(
    (data) => {
      history.push("/auth", data);
    },
    [history]
  );

  const handleCreateNewId = React.useCallback(() => {
    onCreateNewId();
  }, [onCreateNewId]);

  const formik = useFormik({
    initialValues: {
      email: "",
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
          <Form.Label>Your email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            isInvalid={formik.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Your password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            isInvalid={formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
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
