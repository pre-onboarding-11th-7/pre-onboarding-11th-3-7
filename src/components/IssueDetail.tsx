import { useGitHubIssueDetail } from 'contexts/gitHubIssueDetailContext';
import { IssueListItem } from './IssueListItem';

export function IssueDetail() {
  const { issue, isLoading } = useGitHubIssueDetail();

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <section css={{ display: 'flex', alignItems: 'center', width: '100%', gap: '2rem' }}>
        <img
          src={issue.user.avatar_url}
          alt="작성자 프로필 이미지"
          css={{
            width: '5rem',
            height: '5rem',
          }}
        />
        <IssueListItem hasLink={false} {...issue} />
      </section>
    </div>
  );
}
