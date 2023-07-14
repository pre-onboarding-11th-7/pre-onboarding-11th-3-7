import colors from 'constants/colors';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
      }}
    >
      <h1 css={{ fontSize: '1.5rem', fontWeight: 'bold' }}>해당 페이지를 찾을 수 없습니다.</h1>
      <p css={{ fontSize: '1rem' }}>404 - Page is not Found</p>
      <Link
        to="/"
        css={{
          background: colors.blue400,
          color: colors.white,
          fontWeight: 'bold',
          fontSize: '1.2rem',
          marginTop: '2rem',
          padding: '0.5rem 1rem',
          borderRadius: '7px',
        }}
      >
        홈으로 이동
      </Link>
    </main>
  );
}

export default NotFoundPage;
