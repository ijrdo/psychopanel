import "./style.css";
import React, { useState } from "react";
import { useLocation } from "react-router";
import { useAuth } from "app-manager/auth/AuthProvider";
import { PanelButton } from "../panelButton/PanelButton";
import { usePanelData } from "app-manager/panel-context/PanelProvider";
import ArticleDetails from "./components/article-details/ArticleDetails";
import AuthorDetails from "./components/author-details/AuthorDetails";
import { useUpdateArticle } from "app-manager/query/updateArticle";
import FormResponse from "./components/response/FormResponse";
import { useAddArticle } from "app-manager/query/addArticle";
export default function Form() {
  const { pathname } = useLocation();
  const { state, dispatch } = usePanelData();
  const { sessionId, token } = useAuth();
  const [file, setFile] = useState();
  const { articleData: article, showFormResponse } = state;
  const submit = new FormData();

  const secAuthors = [];
  article?.authorDetails?.secondaryAuthors?.forEach((detail) =>
    secAuthors.push(detail?.name)
  );
  const {
    refetch: addArticle,
    isFetching: adding,
    error: addingError,
  } = useAddArticle(token, submit, sessionId, dispatch);

  const {
    refetch: updateArticle,
    isFetching: updating,
    error: updatingError,
  } = useUpdateArticle(token, submit, sessionId, dispatch);

  const setArticleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const selectState = () => {
    dispatch({ type: "SET_ARTICLE_STATUS" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    submit.append("article", JSON.stringify(article));
    submit.append("file", file ? file : "");
    if (pathname.includes("add")) {
      return addArticle();
    }
    updateArticle();
  };
  return (
    <div className="form_Tab">
      <div className="ArticleForm-btns">
        {state.formIndex !== 0 && (
          <PanelButton
            onClick={(e) => dispatch({ type: "DECREASE_FORM_INDEX" })}
          >
            Prev
          </PanelButton>
        )}
        {state.formIndex !== 2 && (
          <PanelButton
            onClick={(e) => {
              state.formIndex === 1 &&
                dispatch({ type: "SET_SECONDARY_AUTHORS_NAME" });
              dispatch({ type: "INCREASE_FORM_INDEX" });
            }}
          >
            Next
          </PanelButton>
        )}
      </div>
      <form id="ArticleForm" onSubmit={handleSubmit}>
        {state.formIndex === 0 && <ArticleDetails article={article} />}
        {state.formIndex === 1 && <AuthorDetails />}
        {state.formIndex === 2 && (
          <>
            <input
              type="file"
              className="ArticleForm-input"
              onChange={setArticleFile}
              multiple={false}
            />
            <label className="ArticleForm-readytopublish">
              <input
                type="checkbox"
                value={article.status}
                id="Article-checkbox"
                onChange={selectState}
                checked={article.status === "ready" ? true : false}
              />
              Ready to publish
            </label>
            <div>
              <PanelButton
                sending={adding || updating}
                type="submit"
                className="form-btn"
              >
                {pathname === "/panel/dashboard/edit-form" ? "Update" : "Save"}
              </PanelButton>
            </div>
          </>
        )}
      </form>

      {showFormResponse && (
        <FormResponse
          error={addingError || updatingError}
          refetch={addArticle || updateArticle}
        />
      )}
    </div>
  );
}
