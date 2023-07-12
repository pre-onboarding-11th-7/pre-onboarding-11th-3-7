import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ListProvider } from "./context/listContext";
import { ListService } from "./api/ListService";
import { HttpClient } from "./api/httpClient/httpClient";

const httpClient = new HttpClient(
  process.env.REACT_APP_BASE_URL || "default-value"
);

const listService = new ListService(httpClient);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ListProvider listService={listService}>
    <App />
  </ListProvider>
);
