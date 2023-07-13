import React, { createContext, useContext, useEffect, useState } from "react";

import { ListService } from "../api/ListService";
import { Issue } from "../@types/types";
import { usePageNum } from "./pageNumContext";

const ListContext = createContext<Issue[]>([]);
const SetListContext = createContext<
  React.Dispatch<React.SetStateAction<Issue[]>> | undefined
>(undefined);

export const useList = () => useContext(ListContext);
export const useSetList = () => useContext(SetListContext);

export function ListProvider({
  children,
  listService,
}: {
  children: React.ReactNode;
  listService: ListService;
}) {
  const [list, setList] = useState<Issue[]>([]);
  const pageNum = usePageNum();

  useEffect(() => {
    const data = listService.get().then(setList);
    console.log("초기 값" + data);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log(pageNum);

      try {
        const newList = await listService.get(pageNum);
        setList((prevList) => [...prevList, ...newList]);
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
