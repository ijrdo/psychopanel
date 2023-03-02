import "./style.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MainContainer = () => {
  const { pathname } = useLocation();
  return (
    <div className="paneltab_links">
      <Link
        className={
          (pathname === "/panel/dashboard" ? "active" : null) ||
          pathname.includes("ready-articles")
            ? "active"
            : ""
        }
        to="ready-articles"
      >
        Ready To Publish
      </Link>
      <Link
        className={pathname.includes("review-articles") ? "active" : ""}
        to="review-articles"
      >
        For Review
      </Link>
      <Link
        className={pathname.includes("unpublished-articles") ? "active" : ""}
        to="unpublished-articles"
      >
        Unpublished
      </Link>
    </div>
  );
};

export default MainContainer;
