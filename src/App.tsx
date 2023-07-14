import { ReactNode } from 'react';
import normalize from 'emotion-normalize';
import { Global, css } from '@emotion/react';
import { PageLayout } from 'components/PageLayout.tsx';

function App({ children }: { children: ReactNode }) {
  return (
    <>
      <Global
        styles={css`
          ${normalize}
          h1, h2, h3, h4, h5, h6 {
            font-size: 1em;
            font-weight: normal;
            margin: 0;
          }
          a {
            text-decoration: none;
            color: inherit;
          }
        `}
      />
      <PageLayout>{children}</PageLayout>
    </>
  );
}

export default App;
