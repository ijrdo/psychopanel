import "./style.css";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { PanelButton } from "../../common/ui/panelButton/PanelButton";

export default function UnpublishAnArticle() {
  const searchArticleId = useRef();
  const navigate = useNavigate();

  const getArticle = (e) => {
    e.preventDefault();
    navigate(searchArticleId.current.value);
  };

  return (
    <div id="Unpublish_now">
      <form className="search_article">
        <input
          type="search"
          ref={searchArticleId}
          placeholder="search article by id"
        />
        <PanelButton type={"submit"} onClick={getArticle}>
          Search
        </PanelButton>
      </form>
    </div>
  );
}
