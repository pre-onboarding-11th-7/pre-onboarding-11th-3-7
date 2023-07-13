import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { GitHubIssue } from 'github';
import GitHubIssueRepository from 'repository/api/GitHubIssueRepository';

interface GitHubIssueListContextProps {
  isLoading: boolean;
  issueList: GitHubIssue[];
  fetchNextIssueList: () => void;
}

const GitHubIssueListContext = createContext<GitHubIssueListContextProps>({
  isLoading: true,
  issueList: [],
  fetchNextIssueList: () => {},
});

interface GitHubIssueListProviderProps {
  owner: string;
  repo: string;
  children: ReactNode;
}

export const GitHubIssueListProvider = ({ owner, repo, children }: GitHubIssueListProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [issueList, setIssueList] = useState<GitHubIssue[]>([]);
  const gitHubIssueRepository = useMemo(() => new GitHubIssueRepository({ owner, repo }), [owner, repo]);

  useEffect(() => {
    if (issueList.length > 0) {
      return;
    }
    gitHubIssueRepository.getIssueListPage().then(initalIssueList => {
      setIssueList(initalIssueList);
      setIsLoading(false);
    });
  }, [gitHubIssueRepository, issueList]);

  const fetchNextIssueList = async () => {
    setIsLoading(true);
    const nextIssueList = await gitHubIssueRepository.getIssueListPage();
    setIssueList([...issueList, ...nextIssueList]);
    setIsLoading(false);
  };

  return (
    <GitHubIssueListContext.Provider value={{ isLoading, issueList, fetchNextIssueList }}>
      {children}
    </GitHubIssueListContext.Provider>
  );
};

export const useGitHubIssueList = () => useContext(GitHubIssueListContext);