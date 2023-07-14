import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css';

import { useGitHubIssueDetail } from 'contexts/gitHubIssueDetailContext';
import { IssueListItem } from './IssueListItem';
import { Spinner } from './Spinner';

export function IssueDetail() {
  const { issue, isLoading, isError } = useGitHubIssueDetail();

  if (isError) {
    return (
      <h1 css={{ fontSize: '1.5rem', textAlign: 'center', paddingTop: '10rem' }}>해당 Issue를 찾을 수 없습니다.</h1>
    );
  }

  if (isLoading) {
    return <Spinner css={{ marginTop: '10rem' }} />;
  }

  return (
    <div>
      <section
        css={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          gap: '2rem',
          margin: '2rem 0',
          'li:last-of-type': { flexGrow: 1 },
        }}
      >
        <img src={issue.user.avatar_url} alt="작성자 프로필 이미지" css={{ width: '5rem', height: '5rem' }} />
        <IssueListItem hasLink={false} {...issue} />
      </section>
      <article className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{issue.body}</ReactMarkdown>
      </article>
    </div>
  );
}
