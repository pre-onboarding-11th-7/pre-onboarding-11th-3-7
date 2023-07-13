import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import HomePage from 'pages/HomePage.tsx';
import { IssueListPage } from 'pages/IssueListPage.tsx';
import IssueDetailPage from 'pages/IssueDetailPage.tsx';
import NotFoundPage from 'pages/404.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/issues/:owner/:repo',
    element: <IssueListPage />,
  },
  {
    path: '/issues/:owner/:repo/:issueNumber',
    element: <IssueDetailPage />,
  },
  {
    path: '/*',
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);
