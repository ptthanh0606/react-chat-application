import React from "react";
import { useHistory, useLocation } from "react-router";
import Loading from "../views/Loading";
import useLocalStorage from "../_hooks/useLocalStorage";
import { useLogin } from "../_hooks/useLogin";

// Login authorization

const Authorize = ({ ...props }) => {
  const { state: routeParam } = useLocation();
  const history = useHistory();
  const login = useLogin();
  const [loginInfo, setLoginInfo] = useLocalStorage("USER_CREDENTIAL");
  const [loadingLabel, setLoadingLabel] = React.useState("Please wait...");

  React.useEffect(() => {
    setLoadingLabel("Login in...");
    login(routeParam)
      .then(() => {
        setTimeout(() => {
          setLoadingLabel("Welcome");
          setLoginInfo(routeParam);
          setTimeout(() => {
            history.push("/my-dashboard");
          }, 2000);
        }, 2000);
      })
      .catch(() => {
        setTimeout(() => {
          setLoadingLabel("There is something wrong...");
          setTimeout(() => {
            history.push("/login");
          }, 2000);
        }, 2000);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Loading text={loadingLabel} />;
};

export default React.memo(Authorize);
