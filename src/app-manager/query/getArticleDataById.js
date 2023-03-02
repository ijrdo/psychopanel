import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getArticle = (id) => {
  const article = axios({
    method: "GET",
    url: "https://whkkg99fl7.execute-api.us-east-2.amazonaws.com/2onxu2g92m/article",
    headers: {
      "x-api-key": "beL2l7aY9N17CT49sQcmC9mNKyARq2KX6MRisGfv",
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
