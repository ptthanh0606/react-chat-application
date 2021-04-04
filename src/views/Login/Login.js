import React from "react";

import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form } from "react-bootstrap";
import { loginMessageSelector } from "../../slices/auth/loginMessage";
import { ReactComponent as AtContact } from "../../svgs/ui-elements/at.svg";

import "./Login.scss";
import PTAButton from "../../components/PTAButton";
import { useLogin } from "../../_hooks/useLogin";
import useLocalStorage from "../../_hooks/useLocalStorage";

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = ({ onCreateNewId = () => {} }) => {
  const history = useHistory();
  const login = useLogin();
  const loginMessage = useSelector(loginMessageSelector);
  const [, setLoginInfo] = useLocalStorage("USER_CREDENTIAL");
  const [isLoading, setLoadingState] = React.useState(false);

  const handleLogin = React.useCallback(
    (data) => {
      setLoadingState(true);
      setTimeout(() => {
        login(data)
          .then(() => {
            setLoginInfo(data); // Authentication token is not available yet, since this application is aiming for socket.io
            history.push("/auth");
          })
          .catch(() => {
            setLoadingState(false);
          })
          .finally(() => {
            setLoadingState(false);
          });
      }, 2000);
    },
    [history, login, setLoginInfo]
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

  React.useEffect(() => {
    document.title = "PTA | Login";
  }, []);

  return (
    <div className="login-container">
      <div className="left d-flex flex-column justify-content-between">
        <h5 className="app-header font-weight-bolder text-primary">PTA</h5>
        <div className="login-page-content">
          <div className="title mb-4">
            <h4 className="mb-0">PT's simple chat application</h4>
            <span className="small text-muted">Please login to continue</span>
          </div>
          <div className="login-form">
            <Form className="w-100" onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Label className="small">Your email</Form.Label>
                <Form.Control
                  autoFocus={true}
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="username"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  isInvalid={formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label className="small">Your password</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  isInvalid={formik.errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="mt-5">
                <PTAButton
                  isLoading={isLoading}
                  name="login"
                  type="submit"
                  className="mr-2 mb-1"
                >
                  Get started
                </PTAButton>
                <Button
                  className="mb-1"
                  variant="secondary"
                  name="createaccount"
                  onClick={handleCreateNewId}
                >
                  Create new account id
                </Button>
              </div>
              <span className="text-danger">{loginMessage}</span>
            </Form>
          </div>
        </div>
        <div className="mini-footer small text-muted">
          <p>
            Yes, this application is{" "}
            <span className="font-weight-bold text-primary">super simple</span>,
            mainly on the socket.io apis.
          </p>
        </div>
      </div>
      <div className="right">
        <a
          href="https://www.facebook.com/ptteee/"
          target="_blank"
          rel="noreferrer"
          className="contact-button"
        >
          <AtContact className="contact-icon" />
        </a>
      </div>
    </div>
  );
};

export default React.memo(Login);
