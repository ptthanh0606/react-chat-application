import React from "react";
import { ListGroup } from "react-bootstrap";
import { useContacts } from "../../_contexts/ContactsProvider";

const Contacts = () => {
  const { contacts } = useContacts();

  React.useEffect(() => {
    console.log(contacts);
  }, [contacts]);

  return (
    <ListGroup variant="flush">
      {(contacts &&
        contacts.length &&
        contacts.map((contact, idx) => (
          <ListGroup.Item key={idx}>
            [{contact.userid}] {contact.username}
          </ListGroup.Item>
        ))) || (
        <div className="px-3 py-2">
          <span className="text-muted small">No contacts vailable</span>
        </div>
      )}
    </ListGroup>
  );
};

export default React.memo(Contacts);
