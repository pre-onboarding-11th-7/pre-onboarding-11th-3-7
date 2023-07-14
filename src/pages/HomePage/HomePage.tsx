import React from "react";
import { IssueList } from "../../components";
import { IssueProvider } from "../../contexts";

export const HomePage = () => {
  return (
    <IssueProvider>
      <IssueList />
    </IssueProvider>
  );
};
