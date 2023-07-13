import { ReactNode, createContext, useContext } from "react";
import { IssuesService } from "../instances/IssuesInstance";
import { IssueResponseType } from "issue";

type OwnerAndRepo = {
  owner: string;
  repo: string;
};

interface IssuesContextInterface {
  issuesFetch: () => Promise<IssueResponseType[]>;
  issuesGetUrl: () => string;
  issuesSetUrl: (ownerAndRepo: OwnerAndRepo) => string;
  issuesOwnerAndRepo: OwnerAndRepo;
  issuesGetNextPage: () => number;
}

const IssuesContext = createContext<IssuesContextInterface>({
  issuesFetch: async () => [],
  issuesGetUrl: () => "",
  issuesSetUrl: () => "",
  issuesOwnerAndRepo: {
    owner: "",
    repo: "",
  },
  issuesGetNextPage: () => 1,
});
export const useIssuesContext = () => useContext(IssuesContext);

const IssuesProvider = ({ children, issuesInstance }: IssuesProviderProps) => {
  const issuesFetch = issuesInstance.fetch.bind(issuesInstance);
  const issuesGetUrl = issuesInstance.getFetchURL.bind(issuesInstance);
  const issuesSetUrl = issuesInstance.setChangeURL.bind(issuesInstance);
  const issuesGetNextPage = issuesInstance.getNextPage.bind(issuesInstance);
  const issuesOwnerAndRepo = {
    owner: issuesInstance.owner,
    repo: issuesInstance.repo,
  };
  return (
    <IssuesContext.Provider
      value={{
        issuesFetch,
        issuesGetUrl,
        issuesSetUrl,
        issuesOwnerAndRepo,
        issuesGetNextPage,
      }}>
      {children}
    </IssuesContext.Provider>
  );
};

export default IssuesProvider;

interface IssuesProviderProps {
  children: ReactNode;
  issuesInstance: IssuesService;
}
