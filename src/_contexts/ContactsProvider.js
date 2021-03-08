import React, { useContext } from "react";
import useLocalStorage from "../_hooks/useLocalStorage";

const ContactsContext = React.createContext();

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const createContact = React.useCallback(
    ({ userid, username }) => {
      setContacts((prev) => {
        return [...prev, { userid, username }];
      });
    },
    [setContacts]
  );

  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => {
  return useContext(ContactsContext);
};
