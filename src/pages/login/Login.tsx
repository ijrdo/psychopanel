import { FormEvent } from "react";
import PrimaryButton from "../../common/ui/primary-button/PrimaryButton";
import styles from "./login.module.css";

export default function Login() {
  const submitForm = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className={styles.loginContainer}>
      <form onSubmit={submitForm} className={styles.loginForm}>
        <label>
          Username
          <input type="text" placeholder="enter your username" />
        </label>
        <label>
          Password
          <input type="text" placeholder="enter your password" />
        </label>
        <PrimaryButton type="submit">SUBMIT</PrimaryButton>
      </form>
    </div>
  );
}
