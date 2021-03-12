import React from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import { selectedsSelector } from "../../slices/selecteds";
import { authSelector } from "../../slices/auth/authSlice";
import Message from "./Message";
import ChatBox from "./ChatBox";
import socket from "../../_utils/socket";

const MessageView = ({ ...props }) => {
  const { conversationId } = useSelector(selectedsSelector);
  const { uuid } = useSelector(authSelector);
  const [messages, setMessages] = React.useState([]);
  const [l, loadData] = React.useReducer(() => ({}));

  React.useEffect(() => {
    if (conversationId) {
      axios
        .get(
          `http://localhost:5000/api/message?conversationId=${conversationId}&uuid=${uuid}`
        )
        .then((result) => {
          setMessages(result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [conversationId, uuid, l]);

  React.useEffect(() => {
    socket.on("MESSAGE_INCOMMING", (data) => {
      loadData();
    });
  }, []);

  return (
    <div {...props}>
      <div
        className="flex-grow-1 pr-3 d-flex flex-column justify-content-end"
        style={{ height: "80vh", overflowY: "scroll" }}
      >
        <div style={{ height: "120%" }}>
          {(messages &&
            messages.length &&
            messages.map((msg, idx) => (
              <Message
                className={`d-flex flex-column align-items-${
                  msg.nickname === uuid ? "end" : "start"
                }`}
                style={{ margin: "1px 0" }}
                noRadius={
                  msg.nickname === uuid
                    ? msg.nickname === messages[idx + 1]?.nickname
                      ? msg.nickname === messages[idx - 1]?.nickname
                        ? "right"
                        : "bottom-right"
                      : msg.nickname !== messages[idx - 1]?.nickname
                      ? "single"
                      : "top-right"
                    : msg.nickname === messages[idx + 1]?.nickname
                    ? msg.nickname === messages[idx - 1]?.nickname
                      ? "left"
                      : "bottom-left"
                    : msg.nickname !== messages[idx - 1]?.nickname
                    ? "single"
                    : "top-left"
                }
                content={msg.content}
                variant={msg.nickname === uuid ? "primary" : "secondary"}
                fromName={
                  msg.nickname ===
                    (messages[idx - 1]?.nickname || msg.nickname === uuid) ||
                  msg.nickname === uuid ? null : (
                    <span>{msg.nickname}</span>
                  )
                }
              />
            ))) || (
            <div className="mt-2 text-muted">
              <i>Start by sending a message.</i>
            </div>
          )}
        </div>
      </div>
      <ChatBox setMessages={setMessages} className="py-0 mt-3" />
    </div>
  );
};

export default React.memo(MessageView);
