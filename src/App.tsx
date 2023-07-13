import React from "react";
import List from "./pages/list";
import Detail from "./pages/detail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HttpClient } from "./api/httpClient/httpClient";
import { ListProvider } from "./context/ListContext";
import { DetailProvider } from "./context/DetailContext";
import { IssueService } from "./api/IssueService";
import { PageNumProvider } from "./context/PageNumContext";

const httpClient = new HttpClient(
  process.env.REACT_APP_BASE_URL || "default-value",
  process.env.REACT_APP_GITHUB_TOKEN || "default-value"
);

const issueService = new IssueService(httpClient);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PageNumProvider>
              <ListProvider issueService={issueService}>
                <List />
              </ListProvider>
            </PageNumProvider>
          }
        />

        <Route
          path="/detail/:id"
          element={
            <DetailProvider issueService={issueService}>
              <Detail />
            </DetailProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
