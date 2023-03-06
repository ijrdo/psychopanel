import { useQueryData } from "services/getQueryData";
import styles from "../style.module.css";

export default function ReadyArticleLists() {
  const data = useQueryData("ready-articles");
  console.log(data);

  return <div></div>;
}
