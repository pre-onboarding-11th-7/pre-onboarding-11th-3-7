import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Issue } from "../types";
import { useService } from "../contexts";

interface IContext {
  detail: Issue | undefined;
  isLoading: boolean;
}

const DetailContext = createContext<IContext | undefined>(undefined);

export const useDetail = (): IContext => {
  const context = useContext(DetailContext);

  if (!context) {
    throw new Error("useDetail must be used within a IssueProvider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const DetailProvider: React.FC<IProps> = ({ children }) => {
  const { num } = useParams();
  const { issueService } = useService();

  if (!num) {
    throw new Error("url이 올바르지 않습니다");
  }

  const [isLoading, setLoading] = useState(true);
  const [detail, setDetail] = useState<Issue | undefined>(undefined);

  const fetch = async () => {
    setLoading(true);
    try {
      const response = await issueService.get(Number(num));
      setDetail(response);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error("데이터를 찾을 수 없습니다");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <DetailContext.Provider value={{ detail, isLoading }}>
      {children}
    </DetailContext.Provider>
  );
};
