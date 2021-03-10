import React from "react";
import { useSelector } from "react-redux";
import { selectedUUIDSelector } from "../../slices/selecteduuid";

const MessageView = ({ ...props }) => {
  const selectedUUID = useSelector(selectedUUIDSelector);

  return <>Message: {selectedUUID}</>;
};

export default React.memo(MessageView);
