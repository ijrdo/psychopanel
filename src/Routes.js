import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import React, { lazy, Suspense } from "react";
import NotFound from "pages/error-404/NotFound";
import Loading from "common/ui/loading/Loading";
import Trash from "pages/trash/Trash";
import DashboardRoot from "common/root/dashboard-root/DashboardRoot";
import ReadyArticles from "pages/readyArticles/ReadyArticles";
import ReviewArticles from "pages/reviewArticles/ReviewArticles";
import UnpublishArticles from "pages/unpublishArticles/UnpublishArticles";
import PanelArticles from "pages/unpublish-article/panelArchives/components/articles/PanelArticles";
import ArticleInfo from "pages/unpublish-article/component/ArticleInfo";
import RootUnpublishArticles from "common/root/unpublish-article-root/RootUnpublishArticles";
import PanelArchivesInfo from "pages/unpublish-article/panelArchives/components/PanelArchivesInfo";
const RootPanel = lazy(() => import("common/root/Root"));
const Form = lazy(() => import("common/ui/form/Form"));

export default function Routes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootPanel />}>
        <Route path="" element={<DashboardRoot />}>
          <Route index element={<ReadyArticles />} />
          <Route path="ready-articles" element={<ReadyArticles />} />
          <Route path="review-articles" element={<ReviewArticles />} />
          <Route path="unpublished-articles" element={<UnpublishArticles />} />
        </Route>
        <Route
          path="add"
          element={
            <Suspense fallback={<Loading />}>
              <Form />
            </Suspense>
          }
        />

        <Route
          path="trash"
          element={
            <Suspense fallback={<Loading />}>
              <Trash />
            </Suspense>
          }
        />
        <Route
          path="edit-form"
          element={
            <Suspense fallback={<Loading />}>
              <Form />
            </Suspense>
          }
        />
        <Route
          path="unpublish-article"
          element={
            <Suspense fallback={<Loading />}>
              <RootUnpublishArticles />
            </Suspense>
          }
        >
          <Route index element={<PanelArchivesInfo />} />
          <Route path=":vol/:issue" element={<PanelArticles />} />
          <Route path=":vol/:issue/:articleId" element={<ArticleInfo />} />
          <Route path=":articleId" element={<ArticleInfo />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
