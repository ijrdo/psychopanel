import logo from "assets/svg/logo-header.svg";
import { useLocation } from "react-router";
import CustomLink from "../link/CustomLink";
import styles from "./style.module.css";
export default function Sidebar() {
  const { hash } = useLocation();

  return (
    <aside className={styles.navbar}>
      <img src={logo} alt="" />
      <CustomLink to="#create-article">Create Article</CustomLink>
      <div className={styles.navlinks}>
        <CustomLink
          active={hash === "#ready-articles" ? true : false}
          to="#ready-articles"
        >
          Ready To Publish
        </CustomLink>
        <CustomLink
          active={hash === "#review-articles" ? true : false}
          to="#review-articles"
        >
          Ready To Review
        </CustomLink>
        <CustomLink
          active={hash === "#unpublished-articles" ? true : false}
          to="#unpublished-articles"
        >
          Unpublished Articles
        </CustomLink>
        <CustomLink
          active={hash === "#unpublish-retract-articles" ? true : false}
          to="#unpublish-retract-articles"
        >
          Unpublish/Retract
        </CustomLink>
        <CustomLink active={hash === "#bin" ? true : false} to="#bin">
          Bin
        </CustomLink>
      </div>
    </aside>
  );
}
