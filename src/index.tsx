import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HttpClient } from "./instances/HttpClient";
import { IssuesService } from "./instances/IssuesInstance";
import IssuesProvider from "./contexts/issues";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostDetail from "./pages/Detail";
import AnIssueProvider from "./contexts/anIssue";
import { AnIssueService } from "./instances/AnIssueInstance";

const httpClient = new HttpClient();
const issuesInstance = new IssuesService(httpClient);
const anIssueInstance = new AnIssueService(httpClient, issuesInstance);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <IssuesProvider issuesInstance={issuesInstance}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<App />}
            errorElement={<div>some error</div>}
          />
          <Route
            path="/:number"
            element={
              <AnIssueProvider anIssueInstance={anIssueInstance}>
                <PostDetail />
              </AnIssueProvider>
            }
            errorElement={<div>some error</div>}
          />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </IssuesProvider>
  </React.StrictMode>
);
