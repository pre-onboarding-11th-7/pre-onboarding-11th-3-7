import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { GitHubIssue } from 'github';
import GitHubIssueRepository from 'repository/api/GitHubIssueRepository';

type GitHubIssueDetailContextProps = { isLoading: true; issue: null } | { isLoading: false; issue: GitHubIssue };

const GitHubIssueDetailContext = createContext<GitHubIssueDetailContextProps>({
  isLoading: true,
  issue: null,
});

interface GitHubIssueDetailProviderProps {
  owner: string;
  repo: string;
  issueNumber: number;
  children: ReactNode;
}

export const GitHubIssueDetailProvider = ({ owner, repo, issueNumber, children }: GitHubIssueDetailProviderProps) => {
  const [issue, setIssue] = useState<GitHubIssue | null>(null);
  const gitHubIssueRepository = useMemo(() => new GitHubIssueRepository({ owner, repo }), [owner, repo]);

  const contextValue = useMemo<GitHubIssueDetailContextProps>(() => {
    if (issue) {
      return { isLoading: false, issue };
    }
    return { isLoading: true, issue: null };
  }, [issue]);

  useEffect(() => {
    gitHubIssueRepository.getIssue(issueNumber).then(fetchedIssue => {
      setIssue(fetchedIssue);
    });
  }, [gitHubIssueRepository, issueNumber]);

  return <GitHubIssueDetailContext.Provider value={contextValue}>{children}</GitHubIssueDetailContext.Provider>;
};

export const useGitHubIssueDetail = () => useContext(GitHubIssueDetailContext);
