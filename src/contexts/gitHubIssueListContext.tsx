import { ReactNode, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
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
  const isEndRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [issueList, setIssueList] = useState<GitHubIssue[]>([]);
  const gitHubIssueRepository = useMemo(() => new GitHubIssueRepository({ owner, repo }), [owner, repo]);

  useEffect(() => {
    gitHubIssueRepository.getIssueListPage().then(initalIssueList => {
      setIssueList(initalIssueList);
      setIsLoading(false);
    });
  }, [gitHubIssueRepository]);

  const fetchNextIssueList = async () => {
    if (isLoading || isEndRef.current) {
      return;
    }

    setIsLoading(true);

    const nextIssueList = await gitHubIssueRepository.getIssueListPage();

    if (nextIssueList.length === 0) {
      isEndRef.current = true;
    }

    setIssueList(state => [...state, ...nextIssueList]);
    setIsLoading(false);
  };

  return (
    <GitHubIssueListContext.Provider value={{ isLoading, issueList, fetchNextIssueList }}>
      {children}
    </GitHubIssueListContext.Provider>
  );
};

export const useGitHubIssueList = () => useContext(GitHubIssueListContext);
