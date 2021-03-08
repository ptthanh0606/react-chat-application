import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContacts } from "../../_contexts/ContactsProvider";
import { useConversation } from "../../_contexts/ConversationsProvider";

const NewConversationModal = ({ onHide = () => {} }) => {
  const [selectedContactIds, setSelectedContactIds] = React.useState([]);

  const { contacts } = useContacts();
  const { createConversation } = useConversation();

  const handleStartConversation = React.useCallback(
    (e) => {
      e.preventDefault();
      createConversation(selectedContactIds.sort((a, b) => a - b));
      onHide();
    },
    [createConversation, onHide, selectedContactIds]
  );

  const handleSelectedIdChange = React.useCallback((contactId) => {
    setSelectedContactIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(contactId)) {
        return prevSelectedIds.filter((prevId) => prevId !== contactId);
      } else {
        return [...prevSelectedIds, contactId];
      }
    });
  }, []);

  return (
    <>
      <Modal.Header closeButton>New contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleStartConversation} id="newContactForm">
          {(contacts &&
            contacts.length &&
            contacts.map((contact) => (
              <Form.Group key={contact.userid}>
                <Form.Check
                  type="checkbox"
                  label={contact.username}
                  name="contactId"
                  value={selectedContactIds.includes(contact.userid)}
                  onChange={() => handleSelectedIdChange(contact.userid)}
                />
              </Form.Group>
            ))) || <span className="text-muted">No contacts available!</span>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="newContactForm">
          Start Conversation
        </Button>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </>
  );
};

export default React.memo(NewConversationModal);
