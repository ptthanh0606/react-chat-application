import axios from "axios";
import React from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../slices/auth/authSlice";
import {
  selectedsSelector,
  setSelectedConversationId,
} from "../../slices/selecteds";
import { downConversation } from "../../transformers/conversation";
import socket from "../../_utils/socket";

const Conversations = () => {
  const [conversations, setConversations] = React.useState([]);
  const dispatch = useDispatch();
  const user = useSelector(authSelector);
  const { conversationId } = useSelector(selectedsSelector);

  const handleClickConversation = React.useCallback(
    (conId) => {
      dispatch(setSelectedConversationId(conId));
    },
    [dispatch]
  );

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/conversation?uuid=${user.uuid}`)
      .then((result) => {
        setConversations(() =>
          downConversation(result.data.data, user.uuid).map((con) => {
            if (con._id === conversationId) {
              return {
                ...con,
                isActive: true,
              };
            } else
              return {
                ...con,
                isActive: false,
              };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [conversationId, dispatch, user.uuid]);

  React.useEffect(() => {
    socket.emit("OPEN_CONVERSATION", {
      conversationId: conversationId,
    });
  }, [conversationId]);

  return (
    <ListGroup variant="flush">
      {(conversations &&
        conversations.length &&
        conversations.map((con, idx) => (
          <ListGroup.Item
            key={idx}
            active={con.isActive}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickConversation(con._id)}
          >
            {con.recipients.map((recipient) => {
              if (
                con.recipients.indexOf(recipient) ===
                con.recipients.length - 1
              ) {
                return <>{recipient}</>;
              } else return <>{recipient}, </>;
            })}
          </ListGroup.Item>
        ))) || (
        <div className="px-3 py-2">
          <span className="text-muted small">Currently quiet here...</span>
        </div>
      )}
    </ListGroup>
  );
};

export default React.memo(Conversations);
