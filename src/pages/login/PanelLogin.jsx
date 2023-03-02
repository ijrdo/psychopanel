import "./style.css";
import logoHeader from "assets/media/svg/logo-header.svg";
import { useAuth, useAuthDispatch } from "app-manager/auth/AuthProvider";
import { PanelButton } from "../../common/ui/panelButton/PanelButton";
import { useLoginData } from "../../app-manager/query/login";
import { useForceLogin } from "../../app-manager/query/forceLogin";

export default function PanelLogin() {
  const auth = useAuth();
  const { userName, passkey } = auth;
  const dispatch = useAuthDispatch();

  const { refetch: login, isFetching: loginin } = useLoginData(
    userName,
    passkey,
    dispatch
  );
  const { refetch: forceLogin, isFetching: forceLoginin } = useForceLogin(
    userName,
    passkey,
    dispatch
  );
  const setUserName = (e) => {
    dispatch({ type: "USERNAME", payload: e.target.value });
  };
  const setPassKey = (e) => {
    dispatch({ type: "PASSKEY", payload: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    login();
  };

  const forceLoginFn = () => {
    forceLogin();
  };
  return (
    <div id="login_page">
      <div className="login-container">
        <div className="logo">
          <img src={logoHeader} alt="" />
        </div>
        <form onSubmit={submitForm} className="login-card">
          <label>
            Username
            <input type="text" onChange={setUserName} placeholder="username" />
          </label>
          <label>
            Password
            <input
              type="password"
              onChange={setPassKey}
              placeholder="Password"
            />
          </label>
          <PanelButton sending={loginin} className="login_button" type="submit">
            Login
          </PanelButton>
        </form>
      </div>
      {auth.sessionRunning && (
        <div className="forceLogin">
          <div className="force_login-card">
            <h2>Other Session is Running</h2>
            <PanelButton sending={forceLoginin} onClick={forceLoginFn}>
              Terminate Other Session
            </PanelButton>
          </div>
        </div>
      )}
    </div>
  );
}
