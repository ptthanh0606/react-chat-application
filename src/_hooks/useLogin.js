import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../slices/auth/authSlice";

export const useLogin = () => {
  const dispatch = useDispatch();

  const [info, setInfo] = React.useState({});

  React.useEffect(() => {
    axios
      .post("http://localhost:5000/api/user/login", info)
      .then((result) => {
        dispatch(setUserInfo(result.data.data));
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [dispatch, info]);

  return (loginInfo) =>
    new Promise((resolve, reject) => {
      setInfo(loginInfo);
      resolve();
    });
};

export default React.memo(useLogin);
