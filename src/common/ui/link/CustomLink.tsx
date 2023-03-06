import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { CustomLinkType } from "types/ui";

export default function CustomLink({ children, to, active }: CustomLinkType) {
  return (
    <Link className={active ? styles.active : styles.link} to={to}>
      {children}
    </Link>
  );
}
