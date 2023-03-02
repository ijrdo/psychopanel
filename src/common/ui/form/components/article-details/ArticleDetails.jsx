import React from "react";
import "./style.css";
import MultipleSelect from "common/ui/mulitipleselect/MultipleSelect";
import { usePanelData } from "app-manager/panel-context/PanelProvider";
const ArticleDetails = ({ article }) => {
  const { dispatch } = usePanelData();

  return (
    <div className="ArticleForm-info">
      <h2 className="ArticleForm-heading">Article Info</h2>
      <div className="ArticleForm-group">
        <label className="ArticleForm-label">
          Title
          <input
            value={article.title}
            type="text"
            className="ArticleForm-input"
            onChange={(e) =>
              dispatch({
                type: "SET_ARTICLE_TITLE",
                payload: e.target.value,
              })
            }
            required
          />
        </label>
      </div>
      <div className="ArticleForm-group">
        <label className="ArticleForm-label">
          Abstract
          <textarea
            value={article.abstract}
            rows="7"
            type="text"
            className="ArticleForm-input"
            onChange={(e) =>
              dispatch({
                type: "SET_ARTICLE_ABSTRACT",
                payload: e.target.value,
              })
            }
            required
          />
        </label>
      </div>
      <div className="ArticleForm-group">
        <label className="ArticleForm-label">
          Keywords
          <MultipleSelect
            selects={article.keywords}
            type="SET_ARTICLE_KEYWORDS"
          />
        </label>
      </div>
    </div>
  );
};

export default ArticleDetails;
