import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { selectedsSelector } from "../../slices/selecteds";
import { authSelector } from "../../slices/auth/authSlice";
import Message from "./Message";
import ChatBox from "./ChatBox";

const MessageView = ({ ...props }) => {
  const { conversationId } = useSelector(selectedsSelector);
  const { uuid } = useSelector(authSelector);
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    if (conversationId) {
      axios
        .get(
          `http://localhost:5000/api/message?conversationid=${conversationId}&uuid=${uuid}`
        )
        .then((result) => {
          setMessages(result.data.data);
        })
        .catch((err) => {});
    }
  }, [conversationId, uuid]);

  return (
    <div {...props}>
      <div className="flex-grow-1 pr-3" style={{ overflowY: "scroll" }}>
        {(messages &&
          messages.length &&
          messages.map((msg) => (
            <Message
              className={`my-3 d-flex flex-column align-items-${
                msg.nickname === uuid ? "end" : "start"
              }`}
              content={msg.content}
              variant={msg.nickname === uuid ? "primary" : "secondary"}
              fromName={msg.nickname === uuid ? "You" : msg.nickname}
            />
          ))) || <span>Start by send him message.</span>}
      </div>
      <ChatBox className="py-2" />
    </div>
  );
};

export default React.memo(MessageView);
