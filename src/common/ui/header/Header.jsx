import "./style.css";
import React from "react";
import plus from "assets/media/svg/plus.svg";
import { PanelLink } from "../panelLink/PanelLink";
import logo from "assets/media/svg/logo-header.svg";
import closeTrash from "assets/media/svg/trash.svg";
import { useLogout } from "app-manager/query/logout";
import openTrash from "assets/media/svg/openTrash.svg";
import Notification from "../notification/Notification";
import { PanelButton } from "../panelButton/PanelButton";
import { useVerify } from "app-manager/query/sessionVerify";
import articleStructure from "app-manager/panel-context/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePanelData } from "app-manager/panel-context/PanelProvider";
import { useAuth, useAuthDispatch } from "app-manager/auth/AuthProvider";

const PanelHeader = () => {
  const { token, sessionId, userName } = useAuth();
  const dispatch = useAuthDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { userType } = useAuth();
  const { state, dispatch: panelDispatch } = usePanelData();

  const { refetch: logout, isFetching } = useLogout(
    token,
    sessionId,
    userName,
    dispatch
  );

  useVerify(sessionId, token, userName, dispatch);
  const logoutHandler = () => {
    logout();
  };
  const resetForm = () => {
    panelDispatch({ type: "SET_ARTICLE_DATA", payload: articleStructure });
    panelDispatch({ type: "RESET_FORM_INDEX" });
  };

  return (
    <div id="HeaderAdmin">
      {state?.notification?.sent && (
        <Notification
          status={state?.notification?.status}
          content={state?.notification?.message}
        />
      )}
      <Link to="">
        <img src={logo} alt="panel_logo" />
      </Link>
      <div>
        <PanelLink to="add" onClick={resetForm}>
          <img className="headerAdmin-icon" src={plus} alt="" />
        </PanelLink>
        {userType === "admin" && (
          <PanelLink to="trash">
            <img
              className="headerAdmin-icon"
              src={location.pathname.includes("trash") ? openTrash : closeTrash}
              alt=""
            />
          </PanelLink>
        )}
        <PanelButton onClick={() => navigate("unpublish-article")}>
          Retract Article
        </PanelButton>
        <PanelButton sending={isFetching} onClick={logoutHandler}>
          Logout
        </PanelButton>
      </div>
    </div>
  );
};
export default PanelHeader;
