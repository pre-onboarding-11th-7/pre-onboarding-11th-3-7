import { Fragment } from 'react';
import { GitHubIssue } from 'github';
import { useGitHubIssueList } from 'contexts/gitHubIssueListContext';
import colors from 'constants/colors';
import convertToKoreanDate from 'utils/convertToKoreanDate';
import { Skeleton } from './Skeleton';

export function IssueList() {
  const { issueList, isLoading } = useGitHubIssueList();

  if (isLoading) {
    return <IssueListSkeleton />;
  }

  return (
    <ul css={{ listStyle: 'none', padding: 0 }}>
      {issueList.map(gitHubIssue => (
        <IssueItem key={gitHubIssue.id} {...gitHubIssue} />
      ))}
    </ul>
  );
}

function IssueItem({ number, title, comments, created_at, user }: GitHubIssue) {
  return (
    <li
      css={{
        padding: '1rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid',
      }}
    >
      <div css={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
        <h2
          css={{ cursor: 'pointer', fontSize: FONT_SIZE.large, fontWeight: 600, ':hover': { color: colors.blue400 } }}
        >
          <span css={{ color: colors.grey600 }}>#{number}</span> {title}
        </h2>
        <div css={{ fontSize: FONT_SIZE.medium }}>
          <h3 css={{ display: 'inline-block', marginRight: '0.3rem' }}>작성자: {user.login},</h3>
          <time dateTime={created_at}>작성일: {convertToKoreanDate(created_at)}</time>
        </div>
      </div>
      <div css={{ fontSize: FONT_SIZE.medium, minWidth: '6rem', textAlign: 'end' }}>코멘트: {comments}</div>
    </li>
  );
}

function IssueListSkeleton() {
  return (
    <>
      {Array.from({ length: 30 }, (_, i) => (
        <Fragment key={i}>
          <Skeleton css={{ width: '100%', height: '4rem', margin: '1rem 0' }} />
          <hr />
        </Fragment>
      ))}
    </>
  );
}

const FONT_SIZE = {
  medium: '0.9rem',
  large: '1.1rem',
};
