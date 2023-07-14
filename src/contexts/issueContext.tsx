import React, { createContext, useContext, useEffect, useState } from "react";
import { Issue } from "../types";
import { useScroll } from "../hooks";
import { useService } from "../contexts";

interface IContext {
  issues: Issue[];
}

const IssueContext = createContext<IContext | undefined>(undefined);

export const useIssue = (): IContext => {
  const context = useContext(IssueContext);

  if (!context) {
    throw new Error("useIssue must be used within a IssueProvider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const IssueProvider: React.FC<IProps> = ({ children }) => {
  const { issueService } = useService();
  const { isScrollEnd, setScrollEnd } = useScroll();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [page, setPage] = useState(1);
  const per_page = 20;

  const fetch = async () => {
    try {
      const response = await issueService.getAll(page, per_page);
      setIssues((prev) => [...prev, ...response]);
      setPage((prev) => prev + 1);
      setScrollEnd(false);
    } catch (err) {
      throw new Error("데이터를 찾을 수 없습니다");
    }
  };

  useEffect(() => {
    fetch();
  }, [isScrollEnd]);

  return (
    <IssueContext.Provider value={{ issues }}>{children}</IssueContext.Provider>
  );
};
