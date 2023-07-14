import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components";
import { DetailPage, HomePage } from "./pages";
import { IssueProvider, DetailProvider } from "./contexts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <IssueProvider>
            <HomePage />
          </IssueProvider>
        ),
      },
      {
        path: "/:num",
        element: (
          <DetailProvider>
            <DetailPage />
          </DetailProvider>
        ),
      },
    ],
  },
]);

export default router;
