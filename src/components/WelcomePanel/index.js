import React from "react";
import { Container } from "react-bootstrap";
import { ReactComponent as Logo } from "../../svgs/ui-elements/typing-modal.svg";

const WelcomePanel = () => {
  return (
    <Container className="h-100 d-flex flex-column align-items-center justify-content-center">
      <Logo height="50px" />
      YOoo
    </Container>
  );
};

export default WelcomePanel;
