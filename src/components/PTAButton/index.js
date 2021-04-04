import React from "react";
import { Button } from "react-bootstrap";
import ReactLoading from "react-loading";
import { PRIMARY } from "../../_utils/colors";
import "./PTAButton.scss";

const PTAButton = ({ isLoading = false, ...props }) => {
  return (
    <Button
      {...props}
      disabled={isLoading}
      className={`${props.className} ${(isLoading && "loading") || ""}`}
    >
      {isLoading ? (
        <ReactLoading
          color={PRIMARY}
          type="spin"
          height={25}
          width={16}
          className="loading-icon"
        />
      ) : (
        props.children
      )}
    </Button>
  );
};

export default React.memo(PTAButton);
