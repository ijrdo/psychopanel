import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getArticle = (id) => {
  const article = axios({
    method: "GET",
    url: process.env.REACT_APP_API_LINK_BY_ID,
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
    },
    params: {
      articleId: id,
    },
  }).then((res) => res.data);
  return article;
};

export const useGetArticleById = (id) =>
  useQuery({
    queryKey: ["Article", id],
    queryFn: () => getArticle(id),
    retry: 0,
    refetchOnWindowFocus: false,
  });
