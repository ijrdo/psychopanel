import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getReviewArticles = async (sessionId, token) => {
  const articles = await axios({
    url: "https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/articles",
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      suid: sessionId,
      type: "review",
    },
  });

  return articles.data.articles;
};
export const useReviewArticlesData = (sessionId, token) =>
  useQuery({
    queryKey: ["review-articles"],
    queryFn: () => getReviewArticles(sessionId, token),
    retry: 0,
  });
