import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components";
import { DetailPage, HomePage } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/:num",
        element: <DetailPage />,
      },
    ],
  },
]);

export default router;
