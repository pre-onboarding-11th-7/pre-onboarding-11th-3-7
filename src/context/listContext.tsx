import React, { createContext, useContext, useEffect, useState } from "react";

import { ListService } from "../api/ListService";
import { Issue } from "../@types/types";

const ListContext = createContext<Issue[]>([]);

export const useList = () => useContext(ListContext);

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
    console.log(data);
  }, [listService, setList]);

  return <ListContext.Provider value={list}>{children}</ListContext.Provider>;
}
