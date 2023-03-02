import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getUnpublishedArticles = async (sessionId, token) => {
  const articles = await axios({
    url: "https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/articles",
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      suid: sessionId,
      type: "unpublished",
    },
  });

  return articles.data.articles;
};
export const useUnpublishedArticlesData = (sessionId, token) =>
  useQuery({
    queryKey: ["unpublished-articles"],
    queryFn: () => getUnpublishedArticles(sessionId, token),
    retry: 1,
  });
