import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const downloadFile = async (sessionId, token, id) => {
  const file = await axios({
    url: `https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/article`,
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      suid: sessionId,
      articleId: id,
      action: "downloadArticle",
    },
  });
  return file;
};

export const useDownloadFile = (sessionId, token, id) =>
  useQuery({
    queryKey: ["File", id],
    queryFn: () => downloadFile(sessionId, token, id),
    refetchOnMount: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: false,
    retry: 0,
  });
