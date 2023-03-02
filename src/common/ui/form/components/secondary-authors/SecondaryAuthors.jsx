import "./style.css";
import React from "react";
import minus from "assets/media/svg/minus.svg";
import { PanelButton } from "common/ui/panelButton/PanelButton";
import { usePanelData } from "app-manager/panel-context/PanelProvider";
export default function SecondaryAuthors() {
  const { state, dispatch } = usePanelData();
  const article = state.articleData;

  return (
    <>
      <div id="secondary_author-container">
        {article.authorDetails.secondaryAuthors.length > 0 &&
          article.authorDetails.secondaryAuthors.map((author, index) => {
            return (
              <div key={index} className="AuthorInfo-form">
                <div className="AuthorInfo-minus">
                  <h3 className="AuthorInfo-subheading">
                    Secondary Author {index + 1}{" "}
                  </h3>
                  <div
                    onClick={(e) =>
                      dispatch({
                        type: "REMOVE_SECONDARY_AUTHOR",
                        payload: index,
                      })
                    }
                  >
                    <img src={minus} alt="" />
                  </div>
                </div>
                <div className="AuthorInfo">
                  <div className="AuthorForm-group">
                    <label className="AuthorForm-label">
                      Name
                      <input
                        value={author.name}
                        type="text"
                        className="AuthorForm-input"
                        onChange={(e) =>
                          dispatch({
                            type: "SET_SECONDARY_AUTHOR_DATA",
                            payload: {
                              ...author,
                              name: e.target.value,
                              index,
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
                        value={author.affiliation}
                        type="text"
                        className="AuthorForm-input"
                        onChange={(e) =>
                          dispatch({
                            type: "SET_SECONDARY_AUTHOR_DATA",
                            payload: {
                              ...author,
                              affiliation: e.target.value,
                              index,
                            },
                          })
                        }
                        required
                      />
                    </label>
                  </div>
                  <div className="AuthorForm-group">
                    <label className="AuthorForm-label">
                      Country
                      <input
                        value={author.country}
                        type="text"
                        className="AuthorForm-input"
                        onChange={(e) =>
                          dispatch({
                            type: "SET_SECONDARY_AUTHOR_DATA",
                            payload: {
                              ...author,
                              country: e.target.value,
                              index,
                            },
                          })
                        }
                      />
                    </label>
                  </div>
                  <div className="AuthorForm-group">
                    <label className="AuthorForm-label">
                      Phone
                      <input
                        value={author.phone}
                        type="tel"
                        className="AuthorForm-input"
                        onChange={(e) =>
                          dispatch({
                            type: "SET_SECONDARY_AUTHOR_DATA",
                            payload: {
                              ...author,
                              phone: e.target.value,
                              index,
                            },
                          })
                        }
                      />
                    </label>
                  </div>
                  <div className="AuthorForm-group">
                    <label className="AuthorForm-label">
                      Email
                      <input
                        value={author.email}
                        type="email"
                        className="AuthorForm-input"
                        onChange={(e) =>
                          dispatch({
                            type: "SET_SECONDARY_AUTHOR_DATA",
                            payload: {
                              ...author,
                              email: e.target.value,
                              index,
                            },
                          })
                        }
                        required
                      />
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <PanelButton onClick={(e) => dispatch({ type: "ADD_SECONDARY_AUTHOR" })}>
        Add More Authors
      </PanelButton>
    </>
  );
}
