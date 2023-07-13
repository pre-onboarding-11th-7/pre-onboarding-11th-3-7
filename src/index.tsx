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
import "./styles/index.css";
import NotFound from "./pages/NotFound";
import Enter from "./pages/Enter";

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
            <Route path="/" element={<Enter />} />
            <Route
              path="/:owner/:repo/issues"
              element={
                <ErrorBoundary>
                  <Home />
                </ErrorBoundary>
              }
            />
            <Route
              path="/:owner/:repo/issues/:number"
              element={
                <AnIssueProvider anIssueInstance={anIssueInstance}>
                  <ErrorBoundary>
                    <PostDetail />
                  </ErrorBoundary>
                </AnIssueProvider>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </IssuesProvider>
    </ErrorMsgProvider>
  </>
);
