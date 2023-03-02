import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getVolumes = async (sessionId, token) => {
  const volumes = await axios({
    url: "https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/volumes",
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      suid: sessionId,
    },
  });
  return volumes.data;
};

export const useVolumesData = (sessionId, token, dispatch) =>
  useQuery({
    queryKey: ["volumes"],
    queryFn: () => getVolumes(sessionId, token),
    onSuccess: () => dispatch({ type: "SET_POPUP_STATE", payload: 2 }),
    retry: 1,
    enabled: false,
  });
