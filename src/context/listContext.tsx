import React, { createContext, useContext, useEffect, useState } from "react";

import { ListService } from "../api/ListService";
import { Issue } from "../@types/types";

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

  useEffect(() => {
    const data = listService.get().then(setList);
    console.log("초기 값" + data);
  }, []);

  return (
    <ListContext.Provider value={list}>
      <SetListContext.Provider value={setList}>
        {children}
      </SetListContext.Provider>
    </ListContext.Provider>
  );
}
