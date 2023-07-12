import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { GitHubIssue } from 'github';
import GitHubIssueRepository from 'repository/api/GitHubIssueRepository';

interface GitHubIssueListContextProps {
  issueList: GitHubIssue[];
  fetchNextIssueList: () => void;
}

const GitHubIssueListContext = createContext<GitHubIssueListContextProps>({
  issueList: [],
  fetchNextIssueList: () => {},
});

interface GitHubIssueListProviderProps {
  owner: string;
  repo: string;
  children: ReactNode;
}

export const GitHubIssueListProvider = ({ owner, repo, children }: GitHubIssueListProviderProps) => {
  const [issueList, setIssueList] = useState<GitHubIssue[]>([]);
  const gitHubIssueRepository = useMemo(() => new GitHubIssueRepository({ owner, repo }), [owner, repo]);

  useEffect(() => {
    if (issueList.length > 0) {
      return;
    }
    gitHubIssueRepository.getIssueListPage().then(initalIssueList => {
      setIssueList(initalIssueList);
    });
  }, [gitHubIssueRepository, issueList]);

  const fetchNextIssueList = async () => {
    const nextIssueList = await gitHubIssueRepository.getIssueListPage();
    setIssueList([...issueList, ...nextIssueList]);
  };

  return (
    <GitHubIssueListContext.Provider value={{ issueList, fetchNextIssueList }}>
      {children}
    </GitHubIssueListContext.Provider>
  );
};

export const useGitHubIssueList = () => useContext(GitHubIssueListContext);
