import React from "react";

import axios from "axios";
import { useSelector } from "react-redux";
import { selectedsSelector } from "../../slices/selecteds";
import { authSelector } from "../../slices/auth/authSlice";
import Message from "./Message";
import ChatBox from "./ChatBox";
import socket from "../../_utils/socket";
import WelcomePanel from "../WelcomePanel";

const MessageView = ({ ...props }) => {
  const { conversationId } = useSelector(selectedsSelector);
  const { uuid } = useSelector(authSelector);
  const [messages, setMessages] = React.useState(null);
  const [l, loadData] = React.useReducer(() => ({}));
  const viewRef = React.useRef();

  React.useEffect(() => {
    if (conversationId) {
      axios
        .get(
          `http://localhost:5000/api/message?conversationId=${conversationId}&uuid=${uuid}`
        )
        .then((result) => {
          setMessages(result.data.data);
          console.log(result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else console.log("no conversion id");
  }, [conversationId, uuid, l]);

  React.useEffect(() => {
    socket.on("MESSAGE_INCOMMING", () => {
      loadData();
      viewRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    });
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      viewRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 100);
  }, [messages, conversationId]);

  return (
    <div {...props}>
      <div
        className="flex-grow-1 pl-3 pr-3 d-flex flex-column"
        style={{ overflowY: "scroll" }}
      >
        <div className="d-flex flex-column justify-content-end" ref={viewRef}>
          {messages
            ? (messages.length &&
                messages.map((msg, idx) => (
                  <Message
                    className={`d-flex flex-column align-items-${
                      msg.nickname === uuid ? "end" : "start"
                    } ${
                      msg.nickname === messages[idx + 1]?.nickname
                        ? ""
                        : msg.nickname === messages[idx - 1]?.nickname
                        ? ""
                        : "my-2"
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
                        (messages[idx - 1]?.nickname ||
                          msg.nickname === uuid) ||
                      msg.nickname === uuid ? null : (
                        <span>{msg.nickname}</span>
                      )
                    }
                  />
                ))) || (
                <div className="mt-2 text-muted">
                  <i>Start by sending a message.</i>
                </div>
              )
            : null}
        </div>
      </div>
      {conversationId ? (
        <ChatBox setMessages={setMessages} className="pl-3" />
      ) : (
        <WelcomePanel />
      )}
    </div>
  );
};

export default React.memo(MessageView);
