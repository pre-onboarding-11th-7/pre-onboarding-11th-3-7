import React, { createContext, useContext, useEffect, useState } from "react";

import { IssueService } from "../api/IssueService";
import { Issue } from "../@types/types";
import { usePageNum } from "./PageNumContext";
import { useSetIsLoading } from "./LoadingContext";

const ListContext = createContext<Issue[]>([]);
const SetListContext = createContext<
  React.Dispatch<React.SetStateAction<Issue[]>> | undefined
>(undefined);

export const useList = () => useContext(ListContext);
export const useSetList = () => useContext(SetListContext);

export function ListProvider({
  children,
  issueService,
}: {
  children: React.ReactNode;
  issueService: IssueService;
}) {
  const [list, setList] = useState<Issue[]>([]);
  const pageNum = usePageNum();
  const setIsLoading = useSetIsLoading();

  useEffect(() => {
    setIsLoading?.(true);

    const fetchData = async () => {
      try {
        const newList = await issueService.getList(pageNum);
        console.log(newList);
        setList((prevList) => [...prevList, ...newList]);
        setIsLoading?.(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [pageNum]);

  return (
    <ListContext.Provider value={list}>
      <SetListContext.Provider value={setList}>
        {children}
      </SetListContext.Provider>
    </ListContext.Provider>
  );
}
