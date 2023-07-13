import { ReactNode } from 'react';
import { GitHubIssue } from 'github';
import { useGitHubIssueList } from 'contexts/gitHubIssueListContext';
import useIntersect from 'hooks/useIntersect';
import colors from 'constants/colors';
import convertToKoreanDate from 'utils/convertToKoreanDate';
import { Skeleton } from './Skeleton';

export function IssueList() {
  const { issueList, fetchNextIssueList, isLoading } = useGitHubIssueList();
  const intersectRef = useIntersect(() => fetchNextIssueList());

  return (
    <ul css={{ listStyle: 'none', padding: 0 }}>
      {issueList.map(gitHubIssue => (
        <IssueItem key={gitHubIssue.id} {...gitHubIssue} />
      ))}
      {isLoading ? <IssueListSkeleton /> : <div ref={intersectRef} css={{ height: '1px' }} />}
    </ul>
  );
}

function IssueListSkeleton() {
  return Array.from({ length: 30 }, (_, i) => (
    <IssueItemTemplate
      key={i}
      title={<Skeleton css={{ width: '100%', height: '2rem' }} />}
      detail={<Skeleton css={{ width: '50%', height: '1.5rem' }} />}
      comment={<Skeleton css={{ width: '4.5rem', height: '1.5rem' }} />}
    />
  ));
}

function IssueItem({ number, title, comments, created_at, user }: GitHubIssue) {
  return (
    <IssueItemTemplate
      title={
        <h2
          css={{
            cursor: 'pointer',
            fontSize: FONT_SIZE.large,
            fontWeight: 600,
            ':hover': { color: colors.blue400 },
          }}
        >
          <span css={{ color: colors.grey600 }}>#{number}</span> {title}
        </h2>
      }
      detail={
        <div css={{ fontSize: FONT_SIZE.medium }}>
          <h3 css={{ display: 'inline-block', marginRight: '0.3rem' }}>작성자: {user.login},</h3>
          <time dateTime={created_at}>작성일: {convertToKoreanDate(created_at)}</time>
        </div>
      }
      comment={<>코멘트: {comments}</>}
    />
  );
}

interface IssueItemTemplateProps {
  title: ReactNode;
  detail: ReactNode;
  comment: ReactNode;
}

function IssueItemTemplate({ title, detail, comment }: IssueItemTemplateProps) {
  return (
    <li
      css={{
        lineHeight: 1.3,
        padding: '1rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '7%',
        borderBottom: '1px solid',
      }}
    >
      <div css={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', flexGrow: 1 }}>
        {title}
        {detail}
      </div>
      <div css={{ fontSize: FONT_SIZE.medium, textAlign: 'end', whiteSpace: 'nowrap' }}>{comment}</div>
    </li>
  );
}

const FONT_SIZE = {
  medium: '0.9rem',
  large: '1.1rem',
};
