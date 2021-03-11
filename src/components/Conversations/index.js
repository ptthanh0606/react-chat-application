import axios from "axios";
import React from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../slices/auth/authSlice";
import { setSelectedConversationId } from "../../slices/selecteds";
import { downConversation } from "../../transformers/conversation";

const Conversations = () => {
  const [conversations, setConversations] = React.useState([]);
  const dispatch = useDispatch();
  const user = useSelector(authSelector);

  const handleClickConversation = React.useCallback(
    (index, conId) => {
      setConversations((prev) =>
        prev.map((con, idx) => {
          if (idx === index) {
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
      dispatch(setSelectedConversationId(conId));
    },
    [dispatch]
  );

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/conversation?uuid=${user.uuid}`)
      .then((result) => {
        console.log(downConversation(result.data.data));
        setConversations(downConversation(result.data.data));
        dispatch(setSelectedConversationId(result.data.data[0]._id));
      })
      .catch((err) => {});
  }, [user.uuid]);

  return (
    <ListGroup variant="flush">
      {(conversations &&
        conversations.length &&
        conversations.map((con, idx) => (
          <ListGroup.Item
            key={idx}
            active={con.isActive}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickConversation(idx, con._id)}
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
