import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import articleStructure from "../panel-context/data";

async function addArticle(token, formData, sessionId) {
  const data = await axios({
    method: "POST",
    url: "https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/article",
    headers: {
      Authorization: "Bearer " + token,
    },
    data: formData,
    params: {
      suid: sessionId,
    },
  });
  return data.data;
}

export const useAddArticle = (token, formData, sessionId, dispatch) =>
  useQuery({
    queryKey: ["add-newArticle"],
    queryFn: () => addArticle(token, formData, sessionId),
    enabled: false,
    retry: 0,
    onSuccess: () => {
      dispatch({ type: "SHOW_FORM_RESPONSE", payload: true });
      dispatch({ type: "RESET_FORM_INDEX" });
      dispatch({ type: "RESET_FORM_DATA", payload: articleStructure });
    },
    onError: () => {
      dispatch({ type: "SHOW_FORM_RESPONSE", payload: true });
    },
  });
