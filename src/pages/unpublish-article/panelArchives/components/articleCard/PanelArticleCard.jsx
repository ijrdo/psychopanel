import "./styles.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePanelData } from "pages/src/panel/app-manager/panel-context/PanelProvider";
import { useAuth } from "pages/src/panel/app-manager/auth/AuthProvider";
import { useUnpublishFn } from "pages/src/panel/app-manager/query/unpublishArticle";
import { useRedactArticle } from "pages/src/panel/app-manager/query/redactArticle";
import { PanelButton } from "pages/src/panel/common/ui/panelButton/PanelButton";
import { useDownloadFile } from "pages/src/panel/app-manager/query/downloadFile";

export default function PanelArticleCard({ article }) {
  const { token, sessionId } = useAuth();
  const { isError, refetch, isFetched } = useDownloadFile(
    sessionId,
    token,
    article.articleId
  );
  const { dispatch } = usePanelData();
  const [status, setStatus] = useState("Download");
  const navigate = useNavigate();
  const { refetch: unpublishNow, isFetching: unpublishing } = useUnpublishFn(
    token,
    sessionId,
    article?.articleId,
    article?.startPage,
    dispatch
  );
  const { refetch: redactNow, isFetching: redacting } = useRedactArticle(
    token,
    sessionId,
    article?.articleId,
    article?.startPage,
    dispatch
  );

  function handleDownload() {
    setStatus("Downloading");
    refetch();
  }

  useEffect(() => {
    if (isFetched) setStatus("Download");
    if (isError) setStatus("Error");
  }, [isFetched, isError]);

  const unpublish = () => {
    unpublishNow();
  };

  const redact = () => {
    redactNow();
  };
  const showAbstract = () => {
    navigate(article.articleId);
  };

  return (
    <>
      <div id="article-card">
        <h2>{article.title}</h2>
        <p>
          <span>Authors: </span>
          <span> {article.primaryAuthor}</span>
        </p>
        <p>
          <span>DOI: </span>
          <span className="doi_link">
            <Link to={article.articleId}>
              {article.doiPrefix}/{article.doiIdentifier}/{article.articleId}
            </Link>
          </span>
        </p>
        <p>
          <span>Pages:</span>
          <span> {article.startPage}</span>
          <span>-</span>
          <span>{article.endPage}</span>
        </p>
        <p>
          <span>Keywords: </span>

          <span> {article.keywords.join(", ")}</span>
        </p>
        <div className="article-card-buttons">
          {!article?.isRedacted && (
            <>
              <PanelButton onClick={showAbstract}>Abstract</PanelButton>
              <span onClick={handleDownload}>
                <PanelButton>{status}</PanelButton>
              </span>
              <PanelButton sending={redacting} onClick={redact}>
                Redact
              </PanelButton>
              {/* <PanelButton sending={unpublishing} onClick={unpublish}>
                Unpublish
              </PanelButton> */}
            </>
          )}
        </div>
      </div>
    </>
  );
}
