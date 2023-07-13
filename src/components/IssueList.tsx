import { Fragment } from 'react';
import { useGitHubIssueList } from 'contexts/gitHubIssueListContext';
import useIntersect from 'hooks/useIntersect';
import colors from 'constants/colors';
import { WantedAdvertisementImage } from './WantedAdvertisementImage';
import { IssueListItem, IssueListItemSkeleton } from './IssueListItem';

export function IssueList() {
  const { issueList, fetchNextIssueList, isLoading } = useGitHubIssueList();
  const intersectRef = useIntersect(() => fetchNextIssueList());

  return (
    <ul css={{ listStyle: 'none', padding: 0 }}>
      {issueList.map((gitHubIssue, i) => (
        <Fragment key={gitHubIssue.id}>
          {i === 4 && (
            <WantedAdvertisementImage
              css={{
                display: 'block',
                textAlign: 'center',
                padding: '1rem 0',
                borderBottom: `1px solid ${colors.border}`,
              }}
            />
          )}
          <IssueListItem hasLink {...gitHubIssue} />
        </Fragment>
      ))}
      {isLoading ? <IssueListSkeleton /> : <div ref={intersectRef} css={{ height: '1px' }} />}
    </ul>
  );
}

function IssueListSkeleton() {
  return Array.from({ length: 30 }, (_, i) => <IssueListItemSkeleton key={i} />);
}
