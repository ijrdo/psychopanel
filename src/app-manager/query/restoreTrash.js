import axios from "axios";

export const restoreTrash = async (sessionId, token, articleId) => {
  const trash = await axios({
    url: "https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/trash",
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      suid: sessionId,
      articleId: articleId,
      action: "restore",
    },
  });
  return trash.data.articles;
};
