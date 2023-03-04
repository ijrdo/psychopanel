import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "./common/root/Root";

export default function Routes() {
  const routes = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<Root />}></Route>)
  );
  return <RouterProvider router={routes} />;
}
