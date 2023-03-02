import axios from "axios";

export const deleteArticle = async (sessionId, token, articleId) => {
  const articles = await axios({
    url: "https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/article",
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      suid: sessionId,
      articleId: articleId,
      action: "delete",
    },
  });
  return articles.data.articles;
};
