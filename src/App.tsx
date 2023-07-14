import React from "react";
import List from "./pages/list";
import Detail from "./pages/detail";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { HttpClient } from "./api/httpClient/httpClient";
import { ListProvider } from "./context/ListContext";
import { DetailProvider } from "./context/DetailContext";
import { IssueService } from "./api/IssueService";
import { PageNumProvider } from "./context/PageNumContext";
import Main from "./pages/main";
import { useOwnerRepo } from "./context/OwnerRepoContext";
import NotFound from "./pages/notFound";
function App() {
  const httpClient = new HttpClient(
    process.env.REACT_APP_BASE_URL || "default-value",
    process.env.REACT_APP_GITHUB_TOKEN || "default-value"
  );

  const ownerRepo = useOwnerRepo();

  const issueService = new IssueService(httpClient, ownerRepo); // repo주소 인자로 받아야함.

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/list"
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
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
