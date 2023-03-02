import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getArticles = (volume, issue) => {
  const articles = axios
    .get(
      "https://whkkg99fl7.execute-api.us-east-2.amazonaws.com/5ca34674s6/search/articles",
      {
        headers: {
          "x-api-key": "beL2l7aY9N17CT49sQcmC9mNKyARq2KX6MRisGfv",
        },
        params: {
          volume: volume,
          issue: issue,
        },
      }
    )
    .then((res) => res.data);
  return articles;
};

export const useArticles = (volume, issue) =>
  useQuery({
    queryKey: ["Articles", [volume, issue]],
    queryFn: () => getArticles(volume, issue),
    refetchOnMount: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: 1,
  });
