import React, { useState } from "react";
import { PanelButton } from "common/ui/panelButton/PanelButton";
import { usePanelData } from "app-manager/panel-context/PanelProvider";
import PopUpMain from "common/ui/publishPopup/PopUpMain";
import fileDownload from "assets/media/svg/fileDownload.svg";
import { useDownloadFile } from "app-manager/query/downloadFile";
import { useAuth } from "app-manager/auth/AuthProvider";

export default function ReadyArticle({ article, index }) {
  const { token, sessionId } = useAuth();
  const { refetch } = useDownloadFile(sessionId, token, article.articleId);
  const { dispatch } = usePanelData();
  const [show, setShow] = useState(false);

  const downloadFile = () => {
    refetch();
  };
  const showPublishPopupfn = () => {
    setShow((prev) => !prev);
    dispatch({ type: "SET_PUBLISH_ARTICLE_DATA", payload: article });
    dispatch({ type: "SET_OLD_ARTICLE_ID", payload: article.articleId });
  };
  return (
    <>
      <div className="articleList">
        <h4 className="articleList-index">{index + 1}</h4>
        <div className="articleList-container">
          <div className="articleList-details">
            <h4>Title: </h4>
            <span className="title">{article.title}</span>
          </div>
          <div className="articleList-details">
            <h4>keywords: </h4>
            <span>
              {article.keywords.length > 0 && article.keywords.join(", ")}
            </span>
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
              <img
                onClick={downloadFile}
                className="fileDownload"
                src={fileDownload}
                alt=""
              />
            </span>
          </div>
        </div>
        <div className="articleList-btn">
          <PanelButton onClick={showPublishPopupfn}>
            Review & Publish
          </PanelButton>
        </div>
      </div>
      {show && <PopUpMain article={article} show={setShow} />}
    </>
  );
}
