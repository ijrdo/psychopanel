import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const login = async (userName, passkey) => {
  const data = await axios({
    method: "GET",
    url: "https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/auth/login",
    auth: {
      username: userName,
      password: passkey,
    },
  });
  return data;
};

export const useLoginData = (userName, passkey, dispatch) =>
  useQuery({
    queryKey: ["Login_detail"],
    queryFn: () => login(userName, passkey, dispatch),
    retry: 0,
    onSuccess: (data) => {
      dispatch({ type: "SET_TOKEN", payload: data.data.token });
      dispatch({ type: "SET_SESSION", payload: data.data.sessionId });
    },
    onError: (err) => {
      if (err.response.data === "session already running")
        dispatch({ type: "SET_SESSION_RUNNING" });
    },
    enabled: false,
  });
