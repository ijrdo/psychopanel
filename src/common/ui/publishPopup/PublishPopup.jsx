import ArticleDetails from "./components/articleDetails/ArticleDetails";
import SelectVolume from "./components/select-volumes/SelectVolume";
import ArticleReview from "./components/article-review/ArticleReview";
import { usePanelData } from "app-manager/panel-context/PanelProvider";
import "./style.css";
import FinalReview from "./components/article-review/conponents/final-review/FinalReview";
const PublishPopup = ({ article, show }) => {
  const { state } = usePanelData();
  const { popUpState } = state;

  if (popUpState === 2)
    return (
      <div id="popup_container">
        <SelectVolume />
      </div>
    );
  if (popUpState === 4)
    return (
      <div id="popup_container">
        <FinalReview />
      </div>
    );
  if (popUpState === 3)
    return (
      <div id="popup_container">
        <ArticleReview finalStructure={article} />
      </div>
    );
  return (
    <div id="popup_container">
      <ArticleDetails article={article} show={show} />
    </div>
  );
};

export default PublishPopup;
