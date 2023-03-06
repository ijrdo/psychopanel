import { PrimaryBTN } from "types/ui";
import styles from "./style.module.css";
export default function PrimaryButton({ children, type, onClick }: PrimaryBTN) {
  return (
    <button className={styles.primaryBtn} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
