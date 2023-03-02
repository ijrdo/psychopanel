import { usePanelData } from "app-manager/panel-context/PanelProvider";
import edit from "assets/media/svg/edit.svg";
import trash from "assets/media/svg/trash.svg";
import { PanelButton } from "../../../panelButton/PanelButton";
import { PanelLink } from "../../../panelLink/PanelLink";
import "./style.css";
import { useAuth } from "app-manager/auth/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteArticle } from "app-manager/query/deleteArticle";
import { useVolumesData } from "app-manager/query/getVolumes";

export default function PopupBtns({ article, show }) {
  const { dispatch } = usePanelData();
  const { token, sessionId } = useAuth();
  const queryClient = useQueryClient();

  const { refetch, isFetching } = useVolumesData(sessionId, token, dispatch);
  const setArticle = () => {
    dispatch({ type: "SET_ARTICLE_DATA", payload: article });
    dispatch({ type: "RESET_FORM_INDEX" });
  };

  const moveToBin = useMutation({
    mutationFn: () => deleteArticle(sessionId, token, article.articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ready-articles"] });
      dispatch({
        type: "ADD_FEEDBACK_MESSAGE",
        payload: { message: "Moved To Bin.", status: "success" },
      });
      show(() => false);
    },
  });

  const deleteArticleHandler = () => {
    moveToBin.mutate();
  };

  const startPublish = () => {
    refetch();
  };

  return (
    <div className="popupBtns">
      <PanelLink to="/panel/dashboard/edit-form" onClick={setArticle}>
        <img className="articleList-icon" src={edit} alt="" />
      </PanelLink>
      <PanelLink onClick={deleteArticleHandler}>
        <img className="articleList-icon" src={trash} alt="" />
      </PanelLink>
      <PanelButton sending={isFetching} onClick={startPublish}>
        Publish Now
      </PanelButton>
    </div>
  );
}
