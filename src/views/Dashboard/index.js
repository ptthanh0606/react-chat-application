import React from "react";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar />
    </div>
  );
};

export default React.memo(Dashboard);
