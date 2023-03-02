import React from "react";
import "./style.css";

export default function Input({ author }) {
  return (
    <div className="ArticleForm-ArticleInfo">
      <h3 className="ArticleForm-subheading">Secondary Author</h3>
      <div className="ArticleForm-group">
        <label className="ArticleForm-label">
          Name
          <input
            value={author.name}
            type="text"
            className="ArticleForm-input"
          />
        </label>
      </div>
      <div className="ArticleForm-group">
        <label className="ArticleForm-label">
          Affiliation
          <input
            value={author.affiliation}
            type="text"
            className="ArticleForm-input"
          />
        </label>
      </div>
      <div className="ArticleForm-group">
        <label className="ArticleForm-label">
          Country
          <input
            value={author.country}
            type="text"
            className="ArticleForm-input"
          />
        </label>
      </div>
      <div className="ArticleForm-group">
        <label className="ArticleForm-label">
          Phone
          <input
            value={author.phone}
            type="Number"
            className="ArticleForm-input"
          />
        </label>
      </div>
      <div className="ArticleForm-group">
        <label className="ArticleForm-label">
          Email
          <input
            value={author.email}
            type="email"
            className="ArticleForm-input"
          />
        </label>
      </div>
    </div>
  );
}
