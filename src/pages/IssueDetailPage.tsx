import { Header } from 'components/Header';
import { IssueDetail } from 'components/IssueDetail';
import { GitHubIssueDetailProvider } from 'contexts/gitHubIssueDetailContext';
import { useParams } from 'react-router-dom';

function IssueDetailPage() {
  const { owner, repo, issueNumber } = useParams<{ owner: string; repo: string; issueNumber: string }>();

  if (!owner || !repo || !issueNumber) {
    return null;
  }

  return (
    <>
      <Header owner={owner} repo={repo} />
      <GitHubIssueDetailProvider owner={owner} repo={repo} issueNumber={Number(issueNumber)}>
        <main css={{ paddingTop: '5rem' }}>
          <IssueDetail />
        </main>
      </GitHubIssueDetailProvider>
    </>
  );
}

export default IssueDetailPage;
