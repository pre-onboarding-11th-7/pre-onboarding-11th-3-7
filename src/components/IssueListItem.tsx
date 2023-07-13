import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GitHubIssue } from 'github';
import colors from 'constants/colors';
import convertToKoreanDate from 'utils/convertToKoreanDate';
import { Skeleton } from './Skeleton';
import { css } from '@emotion/react';

interface IssueListItemProps extends GitHubIssue {
  hasLink: boolean;
}

export function IssueListItem({ number, title, comments, created_at, user, hasLink, ...props }: IssueListItemProps) {
  const location = useLocation();

  const IssueTitle = (
    <>
      <span css={{ color: colors.grey600 }}>#{number}</span> {title}
    </>
  );

  return (
    <IssueItemTemplate
      title={
        hasLink ? (
          <Link to={`${location.pathname}/${number}`} css={issueTitleStyle(hasLink)}>
            {IssueTitle}
          </Link>
        ) : (
          <h2 css={issueTitleStyle(hasLink)}>{IssueTitle}</h2>
        )
      }
      detail={
        <div css={{ fontSize: FONT_SIZE.medium }}>
          <h3 css={{ display: 'inline-block', marginRight: '0.3rem' }}>작성자: {user.login},</h3>
          <time dateTime={created_at}>작성일: {convertToKoreanDate(created_at)}</time>
        </div>
      }
      comment={<>코멘트: {comments}</>}
      {...props}
    />
  );
}

export function IssueListItemSkeleton() {
  return (
    <IssueItemTemplate
      title={<Skeleton css={{ width: '100%', height: '2rem' }} />}
      detail={<Skeleton css={{ width: '50%', height: '1.5rem' }} />}
      comment={<Skeleton css={{ width: '4.5rem', height: '1.5rem' }} />}
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
        gap: '5%',
        borderBottom: `1px solid ${colors.border}`,
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

const issueTitleStyle = (hasLink: boolean) => css`
  font-size: ${FONT_SIZE.large};
  font-weight: 600;
  ${hasLink &&
  `
    cursor: pointer;
    :hover { color: ${colors.blue400} }
  `}
`;
