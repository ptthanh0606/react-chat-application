import React from "react";
import { useHistory } from "react-router";
import Loading from "../views/Loading";

// Login authorization

const Authorize = ({ ...props }) => {
  const history = useHistory();
  const [loadingLabel, setLoadingLabel] = React.useState("Please wait...");

  React.useEffect(() => {
    document.title = "Please wait...";
    setLoadingLabel("Login in...");
    setTimeout(() => {
      setLoadingLabel("Welcome");
      setTimeout(() => {
        history.push("/my-dashboard");
      }, 2000);
    }, 2000);
  }, [history]);

  return <Loading text={loadingLabel} />;
};

export default React.memo(Authorize);
