import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import { IssueListPage } from 'pages/IssueListPage.tsx';
import IssueDetailPage from 'pages/IssueDetailPage.tsx';
import routes from 'constants/routes.ts';

const router = createBrowserRouter([
  {
    path: `${routes.issues}/:owner/:repo`,
    element: <IssueListPage />,
  },
  {
    path: `${routes.issues}/:owner/:repo/:issueNumber`,
    element: <IssueDetailPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);
