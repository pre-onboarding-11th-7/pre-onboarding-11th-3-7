import { ReactNode, createContext, useContext } from "react";
import { AnIssueService } from "../instances/AnIssueInstance";
import { IssueResponseType } from "issue";

interface AnIssueContextInterface {
  anIssueFetch: (issueNum: number) => Promise<IssueResponseType | null>;
}

const AnIssueContext = createContext<AnIssueContextInterface>({
  anIssueFetch: async () => null,
});
export const useAnIssueContext = () => useContext(AnIssueContext);

const AnIssueProvider = ({
  children,
  anIssueInstance,
}: IssuesProviderProps) => {
  const anIssueFetch = anIssueInstance.fetch.bind(anIssueInstance);
  return (
    <AnIssueContext.Provider value={{ anIssueFetch }}>
      {children}
    </AnIssueContext.Provider>
  );
};

export default AnIssueProvider;

interface IssuesProviderProps {
  children: ReactNode;
  anIssueInstance: AnIssueService;
}
