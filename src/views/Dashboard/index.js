import React from "react";
import MessageView from "../../components/MessageView";
import Sidebar from "../../components/Sidebar";
import socket from "../../_utils/socket";

const Dashboard = () => {
  React.useEffect(() => {
    return () => socket.disconnect();
  }, []);

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <div className="row h-100">
        <Sidebar className="col-xl-3 col-md-4 col-sm-5 pl-0 pr-0 d-flex flex-column h-100" />
        <MessageView className="col-xl-9 col-md-8 col-sm-7 pl-0 pr-0 d-flex flex-column h-100" />
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
