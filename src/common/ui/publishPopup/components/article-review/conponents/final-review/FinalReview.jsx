import "./style.css";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "app-manager/auth/AuthProvider";
import { PanelButton } from "common/ui/panelButton/PanelButton";
import { usePublishArticle } from "app-manager/query/publishArticle";
import { usePanelData } from "app-manager/panel-context/PanelProvider";

const FinalReview = () => {
  const { token, sessionId } = useAuth();
  const { state, dispatch } = usePanelData();
  const queryClient = useQueryClient();
  const {
    finalFile,
    publishArticleData: article,
    oldArticleId,
    createdNewVol,
    newVolumeCreated,
  } = state;
  const {
    articleId,
    abstract,
    primaryAuthor,
    volume,
    issue,
    fileName,
    title,
    secondaryAuthors,
    keywords,
    doiIdentifier,
    doiPrefix,
    startPage,
    endPage,
    day,
    month,
    year,
  } = article;

  const finalData = new FormData();
  const { refetch: publishNow, isFetching } = usePublishArticle(
    token,
    sessionId,
    finalData,
    dispatch
  );

  const publish = () => {
    finalData.append("file", finalFile);
    finalData.append("article", JSON.stringify(article));
    finalData.append("oldArticleId", oldArticleId);
    if (createdNewVol) {
      finalData.append("volume", JSON.stringify(newVolumeCreated));
    }

    publishNow().then(() => queryClient.invalidateQueries(["ready-articles"]));
  };
  const goBack = () => {
    dispatch({ type: "SET_POPUP_STATE", payload: 3 });
  };
  return (
    <>
      <div className="popupBtns">
        <PanelButton onClick={goBack}>Back</PanelButton>
        <PanelButton sending={isFetching} onClick={publish}>
          Publish
        </PanelButton>
      </div>
      <div id="final_review">
        <div>
          <h3>Article ID:</h3>
          <p>{articleId}</p>
        </div>
        <div>
          <h3>Article Title:</h3>
          <p>{title}</p>
        </div>
        <div className="abstract">
          <h3>Abstract:</h3>
          <p>{abstract}</p>
        </div>
        <div>
          <h3>Keywords:</h3>
          <p>{keywords.join(", ")}</p>
        </div>
        <div>
          <h3>Article DOI:</h3>
          <p>
            {doiPrefix}/{doiIdentifier}/{articleId}
          </p>
        </div>
        <div>
          <h3>Volume:</h3>
          <p>{volume}</p>
        </div>
        <div>
          <h3>Issue:</h3>
          <p>{issue}</p>
        </div>
        <div>
          <h3>Pages:</h3>
          <p>
            {startPage}-{endPage}
          </p>
        </div>
        <div>
          <h3>Primary Author:</h3>
          <p>{primaryAuthor}</p>
        </div>
        <div>
          <h3>Secondary Authors:</h3>
          <p>
            {secondaryAuthors.length > 0 ? secondaryAuthors.join(",") : "-"}
          </p>
        </div>
        <div>
          <h3>File Name:</h3>
          <p>{fileName}</p>
        </div>
        <div>
          <h3>Publish Dated:</h3>
          <p>
            {day}/{month}/{year}
          </p>
        </div>
      </div>
    </>
  );
};
export default FinalReview;
