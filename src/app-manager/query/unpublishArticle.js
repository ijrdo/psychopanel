import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const unpublishArticle = async (token, sessionId, articleId, startPage) => {
  const data = axios({
    method: "GET",
    url: "https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/unpublish",
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      suid: sessionId,
      articleId: articleId,
      startPage: startPage,
    },
  });
  return data;
};

export const useUnpublishFn = (
  token,
  sessionId,
  articleId,
  startPage,
  dispatch
) =>
  useQuery({
    queryKey: ["Unpublish-Article"],
    queryFn: () => unpublishArticle(token, sessionId, articleId, startPage),
    retry: 0,
    onSuccess: () => {
      dispatch({
        type: "SET_RESPONSE_TEXT",
        payload: "Article Unpublished",
      });
    },
    onError: () => {
      dispatch({
        type: "SET_RESPONSE_TEXT",
        payload: "Something Went Wrong",
      });
    },
    enabled: false,
  });
