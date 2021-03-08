import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversation } from "../../_contexts/ConversationsProvider";

const Conversations = () => {
  const { conversations } = useConversation();

  return (
    <ListGroup variant="flush">
      {(conversations &&
        conversations.length &&
        conversations.map((con, idx) => (
          <ListGroup.Item key={idx}>
            {con.recipients.map((recipient) => {
              if (
                con.recipients.indexOf(recipient) ===
                con.recipients.length - 1
              ) {
                return (
                  <>
                    [{recipient.userid}]{recipient.username}
                  </>
                );
              } else return <>[{recipient.userid}]{recipient.username}, </>;
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
