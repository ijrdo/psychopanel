import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getArticles = (volume, issue) => {
  const articles = axios
    .get(process.env.REACT_APP_API_LINK_BY_VOL, {
      headers: {
        "x-api-key": process.env.REACT_APP_API_KEY,
      },
      params: {
        volume: volume,
        issue: issue,
      },
    })
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
