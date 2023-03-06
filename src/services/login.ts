import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Actions } from "types/authTypes";

const login = async (
  username: string,
  password: string,
  force?: string
): Promise<any> => {
  const data = await axios({
    method: "GET",
    url: "https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/auth/login",
    auth: {
      username: username,
      password: password,
    },
    params: {
      force: force,
    },
  });
  console.log(data.data);
  return data.data;
};

export const useLoginData = (
  username: string,
  password: string,
  dispatch: ({ type, payload }: Actions) => void,
  force?: string
) =>
  useQuery({
    queryKey: ["Login_detail"],
    queryFn: () => login(username, password, force),
    retry: 0,
    onSuccess: (data) => {
      dispatch({ type: "SET_TOKEN", payload: data.token });
      dispatch({ type: "SET_SESSIONID", payload: data.sessionId });
      dispatch({ type: "SET_SESSION_RUNNING" });
    },
    enabled: false,
  });
