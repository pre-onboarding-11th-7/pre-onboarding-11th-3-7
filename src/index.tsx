import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HttpClient } from "./instances/HttpClient";
import { IssuesService } from "./instances/IssuesInstance";
import IssuesProvider from "./contexts/issues";

const httpClient = new HttpClient();
const issuesInstance = new IssuesService(httpClient);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <IssuesProvider issuesInstance={issuesInstance}>
      <App />
    </IssuesProvider>
  </React.StrictMode>
);
