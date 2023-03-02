import axios from "axios";

export const deletePermanent = async (sessionId, token, articleId) => {
  const trash = await axios({
    url: "https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/trash",
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      suid: sessionId,
      articleId: articleId,
    },
  });
  return trash.data.articles;
};
