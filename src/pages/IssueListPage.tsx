import { Header } from 'components/Header';
import { IssueList } from 'components/IssueList';
import { GitHubIssueListProvider } from 'contexts/gitHubIssueListContext';

const owner = 'facebook';
const repo = 'react';

export function IssueListPage() {
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
