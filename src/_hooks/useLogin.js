import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../slices/auth/authSlice";

export const useLogin = () => {
  const dispatch = useDispatch();

  const [info, setInfo] = React.useState({});
  const [isAuthenticated, setAuthenticatedState] = React.useState(false);

  React.useEffect(() => {
    axios
      .post("http://localhost:5000/api/user/login", info)
      .then((result) => {
        if (result) {
          dispatch(setUserInfo(result.data.data));
          setAuthenticatedState(true);
        } else setAuthenticatedState(false);
      })
      .catch(() => {
        setAuthenticatedState(false);
      });
  }, [dispatch, info]);

  return (loginInfo) =>
    new Promise((resolve, reject) => {
      setInfo(loginInfo);
      if (isAuthenticated) {
        resolve();
      } else reject();
    });
};

export default React.memo(useLogin);
