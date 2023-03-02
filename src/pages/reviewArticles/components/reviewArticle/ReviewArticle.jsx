import { usePanelData } from "app-manager/panel-context/PanelProvider";
import { PanelButton } from "common/ui/panelButton/PanelButton";
import { PanelLink } from "common/ui/panelLink/PanelLink";
import fileDownload from "assets/media/svg/fileDownload.svg";
import React from "react";
import { useAuth } from "app-manager/auth/AuthProvider";
import edit from "assets/media/svg/edit.svg";
import "./style.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteArticle } from "app-manager/query/deleteArticle";
import changeState from "app-manager/query/changeState";

export default function ReviewArticle({ article, index }) {
  const queryClient = useQueryClient();
  const { token, sessionId } = useAuth();
  const { dispatch } = usePanelData();

  const setArticle = (articleData) => {
    dispatch({ type: "SET_ARTICLE_DATA", payload: articleData });
    dispatch({ type: "RESET_FORM_INDEX" });
  };
  const moveToBin = useMutation({
    mutationFn: () => deleteArticle(sessionId, token, article.articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review-articles"] });
      dispatch({
        type: "ADD_FEEDBACK_MESSAGE",
        payload: { message: "Moved To Bin.", status: "success" },
      });
    },
  });
  const sendToReadyHandler = useMutation({
    mutationFn: () => changeState(sessionId, token, article.articleId, "ready"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review-articles"] });
      dispatch({
        type: "ADD_FEEDBACK_MESSAGE",
        payload: { message: "Added to for Publish.", status: "success" },
      });
    },
  });

  const sendToReady = () => {
    sendToReadyHandler.mutate();
  };
  const deleteArticleHandler = () => {
    moveToBin.mutate();
  };
  return (
    <div className="articleList">
      <h4 className="articleList-index">{index + 1}</h4>
      <div className="articleList-container">
        <div className="articleList-details">
          <h4>Title: </h4>
          <span className="title">{article.title}</span>
        </div>
        <div className="articleList-details">
          <h4>keywords:</h4>

          {article.keywords.length > 0 &&
            article.keywords.map((item, i) => (
              <span key={item + i}>{item}</span>
            ))}
        </div>
        <div className="articleList-details">
          <h4>Author:</h4>
          <span>
            {article?.primaryAuthor}
            {article?.secondaryAuthors.length ? ", " : false}
            {article?.secondaryAuthors.join(", ")}
          </span>
        </div>
        <div className="articleList-details">
          <h4>File:</h4>
          <span>
            {article.fileName}{" "}
            <img className="fileDownload" src={fileDownload} alt="" />
          </span>
        </div>
      </div>
      <div className="articleList-btn">
        <PanelLink
          to="edit-form"
          onClick={() => setArticle(article)}
        >
          <img className="articleList-icon" src={edit} alt="edit_icn" />
        </PanelLink>
        <PanelButton
          sending={moveToBin.isLoading}
          onClick={deleteArticleHandler}
        >
          Delete
        </PanelButton>
        <PanelButton
          sending={sendToReadyHandler.isLoading}
          onClick={sendToReady}
        >
          Ready to Publish
        </PanelButton>
      </div>
    </div>
  );
}
