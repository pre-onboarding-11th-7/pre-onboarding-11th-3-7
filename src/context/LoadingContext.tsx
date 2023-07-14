import { createContext, useContext, useState } from "react";

export const IsLoadingContext = createContext(false);
export const SetIsLoadingContext = createContext<
  React.Dispatch<React.SetStateAction<boolean>> | undefined
>(undefined);

export const useIsLoading = () => useContext(IsLoadingContext);
export const useSetIsLoading = () => useContext(SetIsLoadingContext);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <IsLoadingContext.Provider value={isLoading}>
      <SetIsLoadingContext.Provider value={setIsLoading}>
        {children}
      </SetIsLoadingContext.Provider>
    </IsLoadingContext.Provider>
  );
}
