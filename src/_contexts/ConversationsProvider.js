import React, { useContext } from "react";
import useLocalStorage from "../_hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";

const ConversationsContext = React.createContext();

export const useConversation = () => {
  return useContext(ConversationsContext);
};

export const ConversationsProvider = ({ children }) => {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const { contacts } = useContacts();

  const createConversation = React.useCallback(
    (selectedIds) => {
      const extendedSelectedIds = selectedIds.map((id) => {
        return contacts.find((contact) => id === contact.userid);
      });
      setConversations((prevConversations) => {
        return [
          ...prevConversations,
          { recipients: extendedSelectedIds, messages: [] },
        ];
      });
    },
    [contacts, setConversations]
  );

  return (
    <ConversationsContext.Provider
      value={{ conversations, createConversation }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};
