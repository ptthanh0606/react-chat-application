import React from "react";
import { Button, Modal, Nav, Tab } from "react-bootstrap";
import Contacts from "../Contacts";
import Conversations from "../Conversations";
import NewContactModal from "../NewContactModal";
import NewConversationModal from "../NewConversationModal";
import useLocalStorage from "../../_hooks/useLocalStorage";

const CONVERSATION_KEY = "conver_key";
const CONTACT_KEY = "contact_key";

const SideBar = ({ ...props }) => {
  const [activeKey, setActiveKey] = React.useState(CONVERSATION_KEY);
  const [modalOpen, setModalOpen] = React.useState(false);

  const isConversationOpen = activeKey === CONVERSATION_KEY;
  const [uuid] = useLocalStorage("id");

  const handleOpenModal = React.useCallback(() => {
    setModalOpen(true);
  }, []);

  return (
    <div className="d-flex flex-column" style={{ width: "250px" }} {...props}>
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATION_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACT_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATION_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACT_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          UUID <span className="text-muted">{uuid}</span>
        </div>
        <Button className="rounded-0" onClick={handleOpenModal}>
          New {isConversationOpen ? "Conversation" : "Contact"}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        {isConversationOpen ? (
          <NewConversationModal onHide={() => setModalOpen(false)} />
        ) : (
          <NewContactModal onHide={() => setModalOpen(false)} />
        )}
      </Modal>
    </div>
  );
};

export default React.memo(SideBar);
