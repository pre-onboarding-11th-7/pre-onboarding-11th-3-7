import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import { HttpClient } from "./instances/HttpClient";
import { IssuesService } from "./instances/IssuesInstance";
import IssuesProvider from "./contexts/issues";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostDetail from "./pages/Detail";
import AnIssueProvider from "./contexts/anIssue";
import { AnIssueService } from "./instances/AnIssueInstance";
import ErrorMsgProvider from "./contexts/errorMessage";
import { ErrorBoundary } from "./components";

const httpClient = new HttpClient();
const issuesInstance = new IssuesService(httpClient);
const anIssueInstance = new AnIssueService(httpClient, issuesInstance);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <ErrorMsgProvider>
      <IssuesProvider issuesInstance={issuesInstance}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ErrorBoundary>
                  <Home />
                </ErrorBoundary>
              }
            />
            <Route
              path="/:number"
              element={
                <AnIssueProvider anIssueInstance={anIssueInstance}>
                  <ErrorBoundary>
                    <PostDetail />
                  </ErrorBoundary>
                </AnIssueProvider>
              }
            />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </BrowserRouter>
      </IssuesProvider>
    </ErrorMsgProvider>
  </>
);
