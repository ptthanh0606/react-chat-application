import React, { Suspense } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import useLocalStorage from "../_hooks/useLocalStorage";
import { v4 as genUUID } from "uuid";
import { ContactsProvider } from "../_contexts/ContactsProvider";
import { ConversationsProvider } from "../_contexts/ConversationsProvider";
import Authorize from "./Authorize";
import { useLogin } from "../_hooks/useLogin";

const Login = React.lazy(() => import("../views/Login/Login"));
const Loading = React.lazy(() => import("../views/Loading"));
const Dashboard = React.lazy(() => import("../views/Dashboard"));

// Auth route to check authentication

const Auth = () => {
  const history = useHistory();
  const login = useLogin();

  const [loginInfo] = useLocalStorage("USER_CREDENTIAL");

  const handleCreateNewId = React.useCallback(() => {
    // setUuid(genUUID());
    // dispatch(setLoginState(true));
  }, []);

  React.useEffect(() => {
    if (loginInfo) {
      login(loginInfo).then(() => {
        history.push("/my-dashboard");
      });
    } else {
      history.push("/login");
    }
  }, [history, login, loginInfo]);

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/login" exact>
          <Login onCreateNewId={handleCreateNewId} />
        </Route>
        <Route path="/auth" exact>
          <Authorize />
        </Route>
        <Route path="/my-dashboard" exact>
          <ContactsProvider>
            <ConversationsProvider>
              <Dashboard />
            </ConversationsProvider>
          </ContactsProvider>
        </Route>
      </Switch>
    </Suspense>
  );
};

export default React.memo(Auth);
