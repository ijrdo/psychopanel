import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const login = async (userName, passkey, dispatch) => {
  const data = axios({
    method: "GET",
    url: "https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/auth/login",
    auth: {
      username: userName,
      password: passkey,
    },
    params: {
      force: "true",
    },
  });
  return data;
};

export const useForceLogin = (userName, passkey, dispatch) =>
  useQuery({
    queryKey: ["force-login"],
    queryFn: () => login(userName, passkey, dispatch),
    retry: 0,
    enabled: false,
    onSuccess: (data) => {
      dispatch({ type: "SET_TOKEN", payload: data.data.token });
      dispatch({ type: "SET_SESSION", payload: data.data.sessionId });
    },
  });
