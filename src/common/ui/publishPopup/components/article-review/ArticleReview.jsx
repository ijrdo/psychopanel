import "./style.css";
import { usePanelData } from "app-manager/panel-context/PanelProvider";
import { useQueryData } from "app-manager/query/getQueryData";
import { PanelButton } from "common/ui/panelButton/PanelButton";

const ArticleReview = ({ finalStructure }) => {
  const { state, dispatch } = usePanelData();
  const { totalPage } = state;
  const articleData = useQueryData(["article-data"]);

  const getEndPage = (e) => {
    if (e.target.value) {
      return dispatch({
        type: "SET_TOTAL_PAGE",
        payload: +e.target.value,
      });
    }
    return dispatch({
      type: "SET_TOTAL_PAGE",
      payload: "",
    });
  };
  const lastReview = (e) => {
    e.preventDefault();
    dispatch({ type: "FINAL_ARTICLE_DATA", payload: finalStructure });
    dispatch({ type: "UPDATE_FINAL_DATA", payload: articleData });
    dispatch({ type: "UPDATE_END_PAGE" });
    dispatch({ type: "SET_POPUP_STATE", payload: 4 });
  };

  const gooback = () => {
    dispatch({ type: "SET_POPUP_STATE", payload: 2 });
  };
  const setFile = (e) => {
    dispatch({ type: "SET_FINAL_FILE", payload: e.target.files[0] });
  };

  return (
    <>
      <form onSubmit={lastReview} className="reviewArticle-form">
        <div className="popupBtns">
          <PanelButton onClick={gooback}>Back</PanelButton>
          <PanelButton type={"submit"}>Preview</PanelButton>
        </div>
        <div>
          <h3>Alloted Article ID:</h3>
          <p>{articleData.articleId}</p>
        </div>
        <div>
          <h3> Alloted D.O.I:</h3>
          <p>{articleData.doi}</p>
        </div>
        <div>
          <h3>Alloted Start Page:</h3> <p>{articleData.startPage}</p>
        </div>
        <div>
          <h3>Total Pages in the Article:</h3>
          <input
            pattern="[0-9]"
            className="pages_number"
            min="1"
            type="number"
            value={totalPage}
            placeholder="enter total pages"
            onChange={getEndPage}
            required
          />
        </div>
        <div>
          <h3>Alloted End Page:</h3>
          <p>{totalPage ? articleData?.startPage + totalPage - 1 : "--"}</p>
        </div>

        <div>
          <div>
            <h3>Upload File:</h3>
          </div>
          <input
            className="file-input"
            type="file"
            onChange={(e) => setFile(e)}
            required
          />
        </div>
      </form>
    </>
  );
};

export default ArticleReview;
