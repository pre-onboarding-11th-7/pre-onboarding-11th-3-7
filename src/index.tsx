import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ListProvider } from "./context/listContext";
import { ListService } from "./api/ListService";
import { HttpClient } from "./api/httpClient/httpClient";
import { PageNumProvider } from "./context/pageNumContext";

const httpClient = new HttpClient(
  process.env.REACT_APP_BASE_URL || "default-value",
  process.env.REACT_APP_GITHUB_TOKEN || "default-value"
);

const listService = new ListService(httpClient);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <PageNumProvider>
    <ListProvider listService={listService}>
      <App />
    </ListProvider>
  </PageNumProvider>
);
