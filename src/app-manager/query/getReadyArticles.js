import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getReadyArticles = async (sessionId, token) => {
  const articles = await axios({
    url: "https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/articles",
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      suid: sessionId,
      type: "ready",
    },
  });

  return articles.data.articles;
};
export const useReadyArticlesData = (sessionId, token) =>
  useQuery({
    queryKey: ["ready-articles"],
    queryFn: () => getReadyArticles(sessionId, token),
    retry: 1,
  });
