import axios from "axios";
import React from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { authSelector } from "../../slices/auth/authSlice";
import { refreshSelector } from "../../slices/refresh";
import { downContacts } from "../../transformers/contact";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const [contacts, setContacts] = React.useState([]);
  const userInfo = useSelector(authSelector);
  const r = useSelector(refreshSelector);

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/contact?uuid=${userInfo.uuid}`)
      .then((result) => {
        if (result.data.data) {
          setContacts(downContacts(result.data.data.savedPeople));
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [setContacts, userInfo.uuid, r]);

  return (
    <ListGroup variant="flush">
      {(contacts &&
        contacts.length &&
        contacts.map((contact, idx) => (
          <ContactItem key={idx} nickname={contact.nickname} />
        ))) || (
        <div className="px-3 py-2">
          <span className="text-muted small">No contacts vailable</span>
        </div>
      )}
    </ListGroup>
  );
};

export default React.memo(Contacts);
