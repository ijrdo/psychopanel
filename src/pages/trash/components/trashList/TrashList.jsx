import { useAuth } from "app-manager/auth/AuthProvider";
import { restoreTrash } from "app-manager/query/restoreTrash";
import { deletePermanent } from "app-manager/query/permanentDelete";
import { PanelButton } from "common/ui/panelButton/PanelButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./style.css";
import { usePanelData } from "app-manager/panel-context/PanelProvider";

export default function TrashList({ article }) {
  const queryClient = useQueryClient();
  const { sessionId, token } = useAuth();
  const { dispatch } = usePanelData();

  const restore = useMutation({
    mutationFn: () => restoreTrash(sessionId, token, article.articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trash"] });
      dispatch({
        type: "ADD_FEEDBACK_MESSAGE",
        payload: { message: "Article Restored.", status: "success" },
      });
    },
  });
  const deleteArticlePermanent = useMutation({
    mutationFn: () => deletePermanent(sessionId, token, article.articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trash"] });
      dispatch({
        type: "ADD_FEEDBACK_MESSAGE",
        payload: { message: "Article Deleted.", status: "success" },
      });
    },
  });

  const deletePermanently = () => {
    deleteArticlePermanent.mutate();
  };
  const restoreArticle = () => {
    restore.mutate();
  };

  return (
    <div className="trashList">
      <h3 className="trash_title">{article.title}</h3>
      <div className="trash_btns">
        <PanelButton sending={restore.isLoading} onClick={restoreArticle}>
          Restore
        </PanelButton>
        <PanelButton
          sending={deleteArticlePermanent.isLoading}
          onClick={deletePermanently}
        >
          Delete Permanently
        </PanelButton>
      </div>
    </div>
  );
}
