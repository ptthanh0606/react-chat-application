import React from "react";
import MessageView from "../../components/MessageView";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row" style={{ height: "100vh" }}>
        <Sidebar className="col-3 d-flex flex-column pl-0" />
        <MessageView className="col-9 pl-0 pr-0 d-flex flex-column" />
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
