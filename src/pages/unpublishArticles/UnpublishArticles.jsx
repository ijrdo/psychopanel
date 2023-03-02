import React from "react";
import "./style.css";
import UnpublishArticle from "./components/unpublishArticle/UnpublishArticle";
import { useUnpublishedArticlesData } from "pages/src/panel/app-manager/query/getUnpublishedArticles";
import Loading from "common/ui/loading/Loading";
import { useAuth } from "pages/src/panel/app-manager/auth/AuthProvider";
import ErrorBoundary from "pages/error-boundary/ErrorBoundary";
import search from "assets/media/svg/search.svg";
import { usePanelData } from "pages/src/panel/app-manager/panel-context/PanelProvider";
import NotFound from "common/ui/notFound/NotFound";

export default function UnpublishArticles() {
  const { token, sessionId } = useAuth();
  const { state, dispatch } = usePanelData();
  const { data, isLoading, error, refetch } = useUnpublishedArticlesData(
    sessionId,
    token
  );
  if (isLoading) return <Loading />;
  if (error) {
    if (error.response?.status === 404) return <NotFound />;
    return <ErrorBoundary onClick={refetch} />;
  }

  const searchValue = (e) => {
    dispatch({ type: "SEARCH_UNPUBLISHED_ARTICLE", payload: e.target.value });
  };

  const searchInput = state.searchUnpublishArticle;
  const lists =
    searchInput.length > 0
      ? data?.filter(
          (d) =>
            d?.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
            d?.keywords?.includes(searchInput) ||
            d?.secondaryAuthors?.includes(searchInput) ||
            d?.primaryAuthor?.toLowerCase().includes(searchInput.toLowerCase())
        )
      : data;
  return (
    <div id="unpublishedArticles">
      <label className="search_articles">
        <input
          value={searchInput}
          onChange={searchValue}
          type="search"
          placeholder="search articles"
        />
        <img src={search} alt="" />
      </label>
      {lists.map((article, i) => (
        <UnpublishArticle key={i} article={article} index={i} />
      ))}
    </div>
  );
}
