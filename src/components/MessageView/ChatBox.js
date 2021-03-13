import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { IoPaperPlane } from "react-icons/io5";
import { useSelector } from "react-redux";
import { authSelector } from "../../slices/auth/authSlice";
import { selectedsSelector } from "../../slices/selecteds";
import socket from "../../_utils/socket";

const ChatBox = ({ setMessages = () => {}, ...props }) => {
  const { uuid } = useSelector(authSelector);
  const { conversationId } = useSelector(selectedsSelector);

  const handleChatSend = React.useCallback(
    ({ chatContent }, { resetForm }) => {
      if (chatContent) {
        setMessages((prev) => [
          ...prev,
          {
            content: chatContent,
            nickname: uuid,
          },
        ]);
        axios
          .put(
            `http://localhost:5000/api/message/sendMessage?conversationId=${conversationId}`,
            {
              content: chatContent,
              uuid,
            }
          )
          .then(() => {
            socket.emit("CLIENT_MESSAGE_SEND", {
              content: chatContent,
              uuid,
            });
            resetForm();
          });
      }
    },
    [conversationId, setMessages, uuid]
  );

  const formik = useFormik({
    initialValues: {
      chatContent: "",
    },
    onSubmit: handleChatSend,
  });

  return (
    <Form {...props} onSubmit={formik.handleSubmit}>
      <Form.Group className="d-flex align-items-center my-3">
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
