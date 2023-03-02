import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const publish = async (token, sessionId, finalData) => {
  const data = axios({
    method: "POST",
    url: "https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/publish",
    headers: {
      Authorization: "Bearer " + token,
    },
    data: finalData,

    params: {
      suid: sessionId,
    },
  });
  return data;
};

export const usePublishArticle = (token, sessionId, finalData, dispatch) =>
  useQuery({
    queryKey: ["Publish-Article"],
    queryFn: () => publish(token, sessionId, finalData),
    retry: 0,
    onSuccess: () => {
      dispatch({
        type: "SET_RESPONSE_TEXT",
        payload: "Article Published",
      });
    },
    onError: (err) => {
      if (err.response.data === "invalid file name") {
        dispatch({ type: "INVALID_FILE_TYPE" });
        dispatch({
          type: "SET_RESPONSE_TEXT",
          payload: "Invalid File Name",
        });
        return;
      }
      dispatch({
        type: "SET_RESPONSE_TEXT",
        payload: "Something Went Wrong",
      });
    },

    enabled: false,
  });
