import React from "react";
import PopupBtns from "../popup-btns/PopupBtns";
export default function ArticleDetails({ article, show }) {
  return (
    <>
      <PopupBtns article={article} show={show} />
      <div className="publish_popup-info">
        <h3>
          Title: <span>{article.title}</span>
        </h3>
        <h3>
          Abstract: <span>{article.abstract}</span>
        </h3>
        <h3>
          Primary-Author: <span>{article.primaryAuthor}</span>
        </h3>
        <h3>
          Secondary-Authors: <span>{article.secondaryAuthors.join(", ")}</span>
        </h3>
      </div>
    </>
  );
}
