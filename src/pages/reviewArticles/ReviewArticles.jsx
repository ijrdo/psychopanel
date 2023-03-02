import Loading from "common/ui/loading/Loading";
import ErrorBoundary from "pages/error-boundary/ErrorBoundary";
import { useAuth } from "app-manager/auth/AuthProvider";
import { usePanelData } from "app-manager/panel-context/PanelProvider";
import { useReviewArticlesData } from "app-manager/query/getReviewArticles";
import React from "react";
import ReviewArticle from "./components/reviewArticle/ReviewArticle";
import "./style.css";
import search from "assets/media/svg/search.svg";
import NotFound from "pages/error-404/NotFound";
export default function ReviewArticles() {
  const { token, sessionId } = useAuth();
  const { state, dispatch } = usePanelData();

  const { data, isLoading, error, refetch } = useReviewArticlesData(
    sessionId,
    token
  );
  if (isLoading) return <Loading />;
  if (error) {
    if (error.response?.status === 404) return <NotFound />;
    return <ErrorBoundary onClick={refetch} />;
  }

  const searchValue = (e) => {
    dispatch({ type: "SEARCH_REVIEW_ARTICLE", payload: e.target.value });
  };

  const searchInput = state.searchReviewArticle;
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
    <div id="reviewArticles">
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
        <ReviewArticle key={i} article={article} index={i} />
      ))}
    </div>
  );
}
