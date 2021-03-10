import React from "react";
import MessageView from "../../components/MessageView";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar />
      <MessageView />
    </div>
  );
};

export default React.memo(Dashboard);
