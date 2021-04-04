import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../api";
import { setUserInfo } from "../slices/auth/authSlice";
import { setLoginMessage } from "../slices/auth/loginMessage";

export const useLogin = () => {
  const dispatch = useDispatch();
  const [, setAuthenticatedState] = React.useState(false);

  const doLogin = React.useCallback(
    (loginInfo) => {
      return new Promise((resolve, reject) => {
        axios
          .post(login, loginInfo)
          .then((result) => {
            dispatch(setUserInfo(result.data.data));
            setAuthenticatedState(true);
            resolve();
          })
          .catch((err) => {
            if (!{ ...err }.response) {
              dispatch(
                setLoginMessage(
                  "Server error! Please contact the administrator."
                )
              );
            } else {
              dispatch(
                setLoginMessage(
                  "Incorrect password or email! Please try again."
                )
              );
            }
            setAuthenticatedState(false);
            reject();
          });
      });
    },
    [dispatch]
  );

  return (loginInfo) => doLogin(loginInfo);
};

export default useLogin;
