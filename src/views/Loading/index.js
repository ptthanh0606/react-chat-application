import React from "react";
import ReactLoading from "react-loading";
import { PRIMARY } from "../../_utils/colors";

const Loading = ({ ...props }) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
      {...props}
    >
      <div className="d-flex flex-column align-items-center justify-content-center">
        <ReactLoading type="spin" color={PRIMARY} height={42} width={42} />
        <span className="font-weight-bold mt-2">Stuff up some works</span>
      </div>
    </div>
  );
};

export default React.memo(Loading);
