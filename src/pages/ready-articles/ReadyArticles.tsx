import { useAuthState } from "context-provider/auth-context/ContextProvider";
import React from "react";
import { useReadyArticlesData } from "services/getReadyArticles";
import styles from "./style.module.css";

export default function ReadyArticles() {
  const { token, sessionId } = useAuthState();
  const { data } = useReadyArticlesData(sessionId, token);
  console.log(data);
  return <div>ReadyArticles</div>;
}
