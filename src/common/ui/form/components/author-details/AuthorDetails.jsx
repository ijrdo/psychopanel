import React from "react";
import "./style.css";
import { usePanelData } from "app-manager/panel-context/PanelProvider";
import SecondaryAuthors from "../secondary-authors/SecondaryAuthors";
const AuthorDetails = () => {
  const { state, dispatch } = usePanelData();
  const article = state.articleData;
  return (
    <>
      <div className="AuthorInfo">
        <h2 className="AuthorInfo-heading">Authors Information</h2>
        <h3 className="AuthorInfo-subheading">Primary Author</h3>
        <div className="AuthorForm-group">
          <label className="AuthorForm-label">
            Name
            <input
              value={article.authorDetails.primary.name}
              type="text"
              className="AuthorForm-input"
              onChange={(e) =>
                dispatch({
                  type: "SET_ARTICLE_PRIMARY_AUTHOR",
                  payload: {
                    ...article.authorDetails.primary,
                    name: e.target.value,
                  },
                })
              }
              required
            />
          </label>
        </div>
        <div className="AuthorForm-group">
          <label className="AuthorForm-label">
            Affiliation
            <input
              value={article.authorDetails.primary.affiliation}
              onChange={(e) =>
                dispatch({
                  type: "SET_ARTICLE_PRIMARY_AUTHOR",
                  payload: {
                    ...article.authorDetails.primary,
                    affiliation: e.target.value,
                  },
                })
              }
              required
              type="text"
              className="AuthorForm-input"
            />
          </label>
        </div>
        <div className="AuthorForm-group">
          <label className="AuthorForm-label">
            Country
            <input
              value={article.authorDetails.primary.country}
              onChange={(e) =>
                dispatch({
                  type: "SET_ARTICLE_PRIMARY_AUTHOR",
                  payload: {
                    ...article.authorDetails.primary,
                    country: e.target.value,
                  },
                })
              }
              type="text"
              className="AuthorForm-input"
            />
          </label>
        </div>
        <div className="AuthorForm-group">
          <label className="AuthorForm-label">
            Phone
            <input
              value={article.authorDetails.primary.phone}
              onChange={(e) =>
                dispatch({
                  type: "SET_ARTICLE_PRIMARY_AUTHOR",
                  payload: {
                    ...article.authorDetails.primary,
                    phone: e.target.value,
                  },
                })
              }
              type="tel"
              className="AuthorForm-input"
            />
          </label>
        </div>
        <div className="AuthorForm-group">
          <label className="AuthorForm-label">
            Email
            <input
              value={article.authorDetails.primary.email}
              onChange={(e) =>
                dispatch({
                  type: "SET_ARTICLE_PRIMARY_AUTHOR",
                  payload: {
                    ...article.authorDetails.primary,
                    email: e.target.value,
                  },
                })
              }
              required
              type="email"
              className="AuthorForm-input"
            />
          </label>
        </div>
      </div>

      <SecondaryAuthors />
    </>
  );
};

export default AuthorDetails;
