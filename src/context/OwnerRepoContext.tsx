import { createContext, useContext, useState } from "react";
import { OwnerRepo } from "../@types/types";
const initialOwnerRepo: OwnerRepo = {
  owner: "facebook",
  repo: "react",
};

const OwnerRepoContext = createContext<OwnerRepo>(initialOwnerRepo);

const SetOwnerRepoContext = createContext<
  React.Dispatch<React.SetStateAction<OwnerRepo>> | undefined
>(undefined);

export const useOwnerRepo = () => useContext(OwnerRepoContext);
export const useSetOwnerRepo = () => useContext(SetOwnerRepoContext);

export function OwnerRepoProvider({ children }: { children: React.ReactNode }) {
  const [ownerRepo, setOwnerRepo] = useState<OwnerRepo>(initialOwnerRepo);

  return (
    <SetOwnerRepoContext.Provider value={setOwnerRepo}>
      <OwnerRepoContext.Provider value={ownerRepo}>
        {children}
      </OwnerRepoContext.Provider>
    </SetOwnerRepoContext.Provider>
  );
}
