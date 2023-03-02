import { useAuth } from "app-manager/auth/AuthProvider";
import PanelLogin from "pages/login/PanelLogin";
export default function RequiresAuth({ children }) {
  const auth = useAuth();
  if (auth.token) return <>{children}</>;
  return <PanelLogin />;
}
