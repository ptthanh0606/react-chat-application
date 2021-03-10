import React from "react";
import { ListGroup } from "react-bootstrap";

const ContactItem = ({
  uuid = "",
  nickname = "",
  ...props
}) => {
  return (
    <ListGroup.Item {...props}>
      [{uuid}] {nickname}
    </ListGroup.Item>
  );
};

export default React.memo(ContactItem);
