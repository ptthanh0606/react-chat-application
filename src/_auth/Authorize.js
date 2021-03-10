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
  const [isAuthorized, setAuthorizedState] = React.useState(false);

  React.useEffect(() => {
    login(routeParam).then(() => {
      setTimeout(() => {
        setAuthorizedState(true);
        setLoginInfo(routeParam);
        setTimeout(() => {
          history.push("/my-dashboard");
        }, 2000);
      }, 1000);
    });
  }, [history, login, routeParam, setLoginInfo]);

  return <Loading text={isAuthorized ? "Logged in" : "Login in..."}></Loading>;
};

export default React.memo(Authorize);
