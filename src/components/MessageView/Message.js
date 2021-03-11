import React from "react";
import { Badge } from "react-bootstrap";

const Message = ({
  content = "",
  fromName = "",
  variant = "primary",
  ...props
}) => {
  return (
    <h5 {...props}>
      <Badge className="px-3 py-2" pill variant={variant}>
        {content}
      </Badge>
      <span
        className="text-muted font-weight-normal mt-1"
        style={{ fontSize: "13px" }}
      >
        {fromName}
      </span>
    </h5>
  );
};

export default React.memo(Message);
