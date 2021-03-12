import React from "react";
import { ListGroup } from "react-bootstrap";

const ContactItem = ({ nickname = " ", ...props }) => {
  return <ListGroup.Item {...props}>{nickname}</ListGroup.Item>;
};

export default React.memo(ContactItem);
