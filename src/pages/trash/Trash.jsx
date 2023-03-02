import Loading from "common/ui/loading/Loading";
import NotFound from "common/ui/notFound/NotFound";
import ErrorBoundary from "pages/error-boundary/ErrorBoundary";
import React from "react";
import { useAuth } from "../../app-manager/auth/AuthProvider";
import { useTrash } from "../../app-manager/query/getTrashData";
import TrashContainer from "./components/trashContainer/TrashContainer";
import "./style.css";

const Trash = () => {
  const { sessionId, token } = useAuth();
  const { data, isLoading, error, refetch } = useTrash(sessionId, token);

  if (isLoading) return <Loading />;
  if (error) {
    if (error.response?.status === 404) return <NotFound />;
    return <ErrorBoundary onClick={refetch} />;
  }
  return (
    <div className="trashTab">
      <TrashContainer state={data ? data : null} />
    </div>
  );
};
export default Trash;
