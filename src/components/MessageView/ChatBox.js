import { useFormik } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { IoPaperPlane } from "react-icons/io5";

const ChatBox = ({ ...props }) => {
  const handleChatSend = React.useCallback((data, { resetForm }) => {
    console.log(data);
    resetForm();
  }, []);

  const formik = useFormik({
    initialValues: {
      chatContent: "",
    },
    onSubmit: handleChatSend,
  });

  return (
    <Form {...props} onSubmit={formik.handleSubmit}>
      <Form.Group className="d-flex align-items-center my-2">
        <Form.Control
          id="chatContent"
          name="chatContent"
          autoFocus="true"
          placeholder="Type a message..."
          onChange={formik.handleChange}
          value={formik.values.chatContent}
        />
        <Button
          className="p-0 mx-3 mb-1"
          variant="link"
          size="lg"
          style={{ fontSize: "1.5rem" }}
        >
          <IoPaperPlane />
        </Button>
      </Form.Group>
    </Form>
  );
};

export default React.memo(ChatBox);
