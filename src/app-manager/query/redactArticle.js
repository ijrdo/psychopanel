import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const redactArticle = async (token, sessionId, articleId, startPage) => {
  const data = axios({
    method: "PATCH",
    url: "https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/article",
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      suid: sessionId,
      articleId: articleId,
      action: "redactArticle",
      startPage: startPage,
    },
  });
  return data;
};

export const useRedactArticle = (
  token,
  sessionId,
  articleId,
  startPage,
  dispatch
) =>
  useQuery({
    queryKey: ["Redact-Article"],
    queryFn: () => redactArticle(token, sessionId, articleId, startPage),
    retry: 0,
    onSuccess: () => {
      dispatch({
        type: "SET_RESPONSE_TEXT",
        payload: "Article Redacted",
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
