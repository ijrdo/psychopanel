import { ChangeEvent, FormEvent } from "react";
import PrimaryButton from "common/ui/primary-button/PrimaryButton";
import styles from "./style.module.css";
import user from "assets/svg/userIcon.svg";
import pass from "assets/svg/passkey.svg";
import logo from "assets/svg/logo-header.svg";
import { useLoginData } from "services/login";
import {
  useAuthDispatch,
  useAuthState,
} from "context-provider/auth-context/ContextProvider";

export default function Login() {
  const { username, password } = useAuthState();
  const dispatch = useAuthDispatch();

  const setUsername = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_USER_NAME", payload: e.target.value });
  };
  const setPassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SET_PASSWORD", payload: e.target.value });
  };

  const { refetch } = useLoginData(username, password, dispatch);

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    refetch();
  };
  return (
    <div className={styles.loginContainer}>
      <img className={styles.logo} src={logo} alt="logo_svg" />
      <h1> Welcome Back</h1>
      <form onSubmit={submitForm} className={styles.loginForm}>
        <label className={styles.formLabel}>
          <img src={user} alt="user_svg" />
          <div></div>
          <input
            onChange={setUsername}
            type="text"
            placeholder="enter your username"
          />
        </label>
        <label className={styles.formLabel}>
          <img className={styles.passIcon} src={pass} alt="pass_svg" />
          <div></div>
          <input
            type="password"
            onChange={setPassword}
            placeholder="enter your password"
          />
        </label>
        <PrimaryButton type="submit">Login</PrimaryButton>
      </form>
    </div>
  );
}
