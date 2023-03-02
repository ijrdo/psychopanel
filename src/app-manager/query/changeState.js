import axios from "axios";

const changeState = async (sessionId, token, articleId, state) => {
  const articles = await axios({
    url: "https://hm5m25z57j.execute-api.us-east-2.amazonaws.com/production/article",
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
    },
    params: {
      suid: sessionId,
      action: "changeState",
      state: state,
      articleId: articleId,
    },
  });
  return articles.data.articles;
};
export default changeState;
