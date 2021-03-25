import axios from "axios";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { authSelector } from "../../slices/auth/authSlice";
import { setSelectedConversationId } from "../../slices/selecteds";

const NewConversationModal = ({ onHide = () => {} }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(authSelector);
  const [selectedContactIds, setSelectedContactIds] = React.useState([]);
  const [contacts, setContacts] = React.useState([]);

  const handleStartConversation = React.useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(
          `http://localhost:5000/api/conversation/startConversation?uuid=${currentUser.uuid}`,
          selectedContactIds
        )
        .then((result) => {
          dispatch(setSelectedConversationId(result.data.data._id));
          onHide();
        })
        .catch((err) => {
          toast.error(err);
        });
    },
    [currentUser.uuid, dispatch, onHide, selectedContactIds]
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

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/contact?uuid=${currentUser.uuid}`)
      .then((result) => {
        setContacts(result.data.data.savedPeople);
      })
      .catch((err) => {});
  }, [currentUser.uuid]);

  return (
    <>
      <Modal.Header closeButton>New contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleStartConversation} id="newContactForm">
          {(contacts &&
            contacts.length &&
            contacts.map((contact) => (
              <Form.Group key={contact.uuid}>
                <Form.Check
                  label={contact.nickname}
                  name="contactId"
                  value={selectedContactIds.includes(contact.uuid)}
                  onChange={() => handleSelectedIdChange(contact.uuid)}
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
