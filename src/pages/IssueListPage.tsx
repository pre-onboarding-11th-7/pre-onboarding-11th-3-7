import { Header } from 'components/Header';
import { IssueList } from 'components/IssueList';
import { GitHubIssueListProvider } from 'contexts/gitHubIssueListContext';
import { useParams } from 'react-router-dom';

export function IssueListPage() {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();

  if (!owner || !repo) {
    return null;
  }

  return (
    <>
      <Header owner={owner} repo={repo} />
      <GitHubIssueListProvider owner={owner} repo={repo}>
        <main css={{ paddingTop: '5rem' }}>
          <IssueList />
        </main>
      </GitHubIssueListProvider>
    </>
  );
}
