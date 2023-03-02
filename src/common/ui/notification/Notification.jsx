import { usePanelData } from "app-manager/panel-context/PanelProvider";
import { useEffect, useState } from "react";
import "./style.css";

export default function Notification({ content, status }) {
  const [active, setActive] = useState(true);
  const { dispatch } = usePanelData();
  useEffect(() => {
    const tick = setTimeout(() => {
      setActive(false);
      dispatch({ type: "REMOVE_FEEDBACK_MESSAGE" });
    }, 3000);
    return () => {
      clearTimeout(tick);
    };
  }, [dispatch]);
  return (
    <div id="notification" className={active ? `active ${status}` : ""}>
      <p>{content}</p>
    </div>
  );
}
