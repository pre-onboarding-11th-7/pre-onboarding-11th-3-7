import React, { createContext, useContext, useState } from "react";

const PageNumContext = createContext<number>(1);
const SetPageNumContext = createContext<
  React.Dispatch<React.SetStateAction<number>> | undefined
>(undefined);

export const usePageNum = () => useContext(PageNumContext);
export const useSetPageNum = (): React.Dispatch<
  React.SetStateAction<number>
> => {
  const setPageNum = useContext(SetPageNumContext);
  if (!setPageNum) {
    throw new Error("useSetPageNum must be used within a PageNumProvider");
  }
  return setPageNum;
};

export function PageNumProvider({ children }: { children: React.ReactNode }) {
  const [pageNum, setPageNum] = useState<number>(1);

  return (
    <SetPageNumContext.Provider value={setPageNum}>
      <PageNumContext.Provider value={pageNum}>
        {children}
      </PageNumContext.Provider>
    </SetPageNumContext.Provider>
  );
}
