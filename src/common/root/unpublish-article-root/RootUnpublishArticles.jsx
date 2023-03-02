import UnpublishAnArticle from "pages/unpublish-article/UnpublishAnArticle";
import { Outlet } from "react-router";

export default function RootUnpublishArticles() {
  return (
    <>
      <UnpublishAnArticle />
      <Outlet />
    </>
  );
}
