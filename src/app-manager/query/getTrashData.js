import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getTrash = async (sessionId, token) => {
  const trash = await axios({
    url: "https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/trash",
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      suid: sessionId,
    },
  });
  return trash.data.articles;
};

export const useTrash = (sessionId, token) =>
  useQuery({
    queryKey: ["trash"],
    queryFn: () => getTrash(sessionId, token),
    retry: 0,
  });
