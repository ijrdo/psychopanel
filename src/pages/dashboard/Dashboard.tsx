import styles from "./style.module.css";
import React from "react";
import { useLocation } from "react-router";
import ReadyArticles from "pages/ready-articles/ReadyArticles";

export default function Dashboard() {
  const { hash } = useLocation();
  console.log(hash);
  if (hash === "#ready-articles")
    return (
      <div className={styles.dashboard}>
        <ReadyArticles />
      </div>
    );
  return <div className={styles.dashboard}>dashboard</div>;
}
