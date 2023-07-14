import React, { createContext, useContext } from "react";
import { httpClient } from "../utils";
import { IssueService } from "../services";

interface IContext {
  issueService: IssueService;
}

const RootContext = createContext<IContext | undefined>(undefined);

export const useService = (): IContext => {
  const context = useContext(RootContext);

  if (!context) {
    throw new Error("useService must be used within a IssueProvider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const RootProvider: React.FC<IProps> = ({ children }) => {
  const faceBookClient = httpClient(
    "https://api.github.com/repos/facebook/react",
  );
  const issueService = new IssueService(faceBookClient);

  return (
    <RootContext.Provider value={{ issueService }}>
      {children}
    </RootContext.Provider>
  );
};
