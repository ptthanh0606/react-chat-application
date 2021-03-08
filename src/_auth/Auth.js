import React, { Suspense } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { setLoginState } from "../slices/auth/authSlice";
import useLocalStorage from "../_hooks/useLocalStorage";
import { v4 as genUUID } from "uuid";
import { ContactsProvider } from "../_contexts/ContactsProvider";
import { ConversationsProvider } from "../_contexts/ConversationsProvider";

const Login = React.lazy(() => import("../views/Login/Login"));
const Loading = React.lazy(() => import("../views/Loading"));
const Dashboard = React.lazy(() => import("../views/Dashboard"));

// Auth route to check authentication

const Auth = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [uuid, setUuid] = useLocalStorage("id");

  const handleCreateNewId = React.useCallback(() => {
    setUuid(genUUID());
    dispatch(setLoginState(true));
  }, [dispatch, setUuid]);

  React.useEffect(() => {
    if (!!uuid) {
      history.push("/my-dashboard");
    } else {
      history.push("/login");
    }
    dispatch(setLoginState(!!uuid));
  }, [dispatch, history, uuid]);

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/login" exact>
          <Login onCreateNewId={handleCreateNewId} />
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
