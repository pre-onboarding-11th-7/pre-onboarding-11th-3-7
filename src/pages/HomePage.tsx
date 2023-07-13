import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import colors from 'constants/colors';
import routes from 'constants/routes';

function HomePage() {
  const navigate = useNavigate();
  const ownerRef = useRef<HTMLInputElement>(null);
  const repoRef = useRef<HTMLInputElement>(null);

  const handleGoToIssueListPage = () => {
    if (!ownerRef.current || !repoRef.current) {
      return;
    }

    const owner = ownerRef.current.value;
    const repo = repoRef.current.value;

    if (!owner || !repo) {
      alert('Owner와 Repository name 모두 입력해주세요.');
      return;
    }

    navigate(routes.issues({ owner, repo }));
  };

  return (
    <main
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        height: '90vh',
      }}
    >
      <h1 css={{ fontSize: '1.7rem' }}>GitHub Repository Issues</h1>
      <input ref={ownerRef} placeholder="Owner" css={inputStyle} />
      <input ref={repoRef} placeholder="Repository name" css={inputStyle} />
      <button
        onClick={handleGoToIssueListPage}
        css={{
          cursor: 'pointer',
          padding: '0.3rem 0.5rem',
          fontSize: '1.5rem',
          color: colors.white,
          background: colors.blue400,
          border: 'none',
          borderRadius: '4px',
          ':hover': {
            background: colors.blue500,
          },
        }}
      >
        →
      </button>
    </main>
  );
}

export default HomePage;

const inputStyle = css`
  width: 50%;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid;
`;
