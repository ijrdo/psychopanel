import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const sendVol = async (sessionId, token, vol, issue, issueType, date) => {
  const data = await axios({
    url: "https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/stats",
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      suid: sessionId,
      volume: vol,
      issue: issue,
      issueType: issueType,
      date: date,
    },
  });
  return data.data;
};
export const useArticleData = (
  sessionId,
  token,
  vol,
  issue,
  issueType,
  date,
  dispatch
) =>
  useQuery({
    queryKey: ["article-data"],
    queryFn: () => sendVol(sessionId, token, vol, issue, issueType, date),
    retry: 1,
    enabled: false,
    onSuccess: () => dispatch({ type: "SET_POPUP_STATE", payload: 3 }),
  });
