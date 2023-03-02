import { useArticles } from "app-manager/query//GetArticlesByVolume";
import Loading from "common/ui/loading/Loading";
import ErrorBoundary from "pages/error-boundary/ErrorBoundary";
import { useParams } from "react-router";
import PanelArticlesList from "../articleCard/PanelArticlesList";
import "./styles.css";

export default function PanelArticles() {
  const { vol, issue } = useParams();
  console.log(vol, issue);

  const { data, isLoading, isError, refetch } = useArticles(vol, issue);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorBoundary onClick={refetch} />;

  return (
    <div className="articles-all-box">
      <PanelArticlesList data={data.articles} />
    </div>
  );
}
