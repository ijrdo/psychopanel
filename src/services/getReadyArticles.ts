import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ArticleType } from "types/ui";

const getReadyArticles = async (
  sessionId: string,
  token: string
): Promise<ArticleType[]> => {
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
export const useReadyArticlesData = (
  sessionId: string,
  token: string
): UseQueryResult<ArticleType[], Error> =>
  useQuery({
    queryKey: ["ready-articles"],
    queryFn: () => getReadyArticles(sessionId, token),
    retry: 1,
  });
