import { ReactNode, createContext, useContext } from "react";
import { IssuesService } from "../instances/IssuesInstance";

const IssuesContext = createContext<IssuesService | null>(null);
export const useIssuesContext = () => useContext(IssuesContext);

const IssuesProvider = ({ children, issuesInstance }: IssuesProviderProps) => {
  return (
    <IssuesContext.Provider value={issuesInstance}>
      {children}
    </IssuesContext.Provider>
  );
};

export default IssuesProvider;

interface IssuesProviderProps {
  children: ReactNode;
  issuesInstance: IssuesService;
}
