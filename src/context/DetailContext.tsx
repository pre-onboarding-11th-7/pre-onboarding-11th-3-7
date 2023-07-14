import React, { createContext, useContext, useEffect, useState } from "react";
import { IssueService } from "../api/IssueService";
import { getIssueNumber } from "../utils/getIssueNumber";
import { Issue } from "../@types/types";
import { useSetIsLoading } from "./LoadingContext";

const DetailContext = createContext<Issue | undefined>(undefined);

export const useDetail = () => useContext(DetailContext);

export function DetailProvider({
  children,
  issueService,
}: {
  children: React.ReactNode;
  issueService: IssueService;
}) {
  const [detail, setDetail] = useState<Issue | undefined>(undefined);
  const id = getIssueNumber();
  const setIsLoading = useSetIsLoading();
  useEffect(() => {
    setIsLoading?.(true);
    if (id) {
      const fetchData = async () => {
        try {
          const { data } = await issueService.getDetail(id);
          setDetail(data);
          setIsLoading?.(false);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, []);

  return (
    <DetailContext.Provider value={detail}>{children}</DetailContext.Provider>
  );
}

export default DetailProvider;
