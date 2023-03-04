/* eslint-disable no-unused-vars */
import Loading from "common/ui/loading/Loading";
import { useAuth } from "app-manager/auth/AuthProvider";
import { usePanelData } from "app-manager/panel-context/PanelProvider";
import { useGetArticleById } from "app-manager/query/getArticleDataById";
import { useRedactArticle } from "app-manager/query/redactArticle";
// import { useUnpublishFn } from "app-manager/query/unpublishArticle";
import { PanelButton } from "common/ui/panelButton/PanelButton";
import ResponsePopup from "common/ui/responsePopup/ResponsePopUp";
import React from "react";
import "./style.css";
import { useParams } from "react-router";
import NotFound from "pages/error-404/PageNotFound";
export default function ArticleInfo() {
  const { articleId: id } = useParams();
  const { token, sessionId } = useAuth();
  const { state, dispatch } = usePanelData();
  const { popupResponse } = state;

  const { isFetching, data } = useGetArticleById(id);

  // const { refetch: unpublishNow, isFetching: unpublishing } = useUnpublishFn(
  //   token,
  //   sessionId,
  //   data?.articleId,
  //   data?.startPage,
  //   dispatch
  // );
  const { refetch: redactNow, isFetching: redacting } = useRedactArticle(
    token,
    sessionId,
    data?.articleId,
    data?.startPage,
    dispatch
  );
  if (isFetching) return <Loading />;
  if (data) {
    const {
      title,
      doiIdentifier,
      startPage,
      endPage,
      primaryAuthor,
      secondaryAuthors,
      year,
      keywords,
      month,
      articleId,
      abstract,
      volume,
      issue,
      doiPrefix,
    } = data;

    // const unpublish = () => {
    //   unpublishNow();
    // };

    const redact = () => {
      redactNow();
    };

    return (
      <>
        <div className="Unpublish_article">
          <div className="article_info-btns">
            {!data?.isRedacted && (
              <>
                <PanelButton sending={redacting} onClick={redact}>
                  Redact
                </PanelButton>
              </>
            )}
            {/* <PanelButton sending={unpublishing} onClick={unpublish}>
              Unpublish
            </PanelButton> */}
          </div>

          <h2 className={data?.isRedacted ? "redacted" : ""}> {title}</h2>

          <p className="authors">
            Authors: <span>{primaryAuthor}</span>
            {secondaryAuthors.length > 0 && ", "}
            <span>{secondaryAuthors.join(", ")}</span>
          </p>
          <div className="abstract">
            <h3>
              Abstract: <span>{abstract}</span>
            </h3>
          </div>
          <div className="details">
            <h3>Paper Details:</h3>
            <div className="stats">
              <div>
                <h4>Month:</h4>
                <span>{month}</span>
              </div>
              <div>
                <h4>Year:</h4>
                <span> {year}</span>
              </div>
              <div>
                <h4>D.O.I:</h4>
                <span>
                  {data?.isRedacted
                    ? "--"
                    : `${doiPrefix}/${doiIdentifier}/${articleId}`}
                </span>
              </div>
              <div>
                <h4>Pages:</h4>
                <span>
                  {startPage}-{endPage}
                </span>
              </div>
              <div>
                <h4>Issue:</h4>
                <span> {issue}</span>
              </div>
              <div>
                <h4>Volume:</h4>
                <span> {volume}</span>
              </div>
              <div>
                <h4>Keywords:</h4>
                <span> {keywords.join(", ")}</span>
              </div>
            </div>
          </div>
        </div>
        {popupResponse && (
          <div className="popupResponse">
            <ResponsePopup id={id} />
          </div>
        )}
      </>
    );
  }
  return <NotFound />;
}
