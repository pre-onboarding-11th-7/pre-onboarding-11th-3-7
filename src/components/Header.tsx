import { css } from '@emotion/react';

interface HeaderProps {
  owner: string;
  repo: string;
}

export function Header({ owner, repo }: HeaderProps) {
  return (
    <header css={headerStyle}>
      <h1 css={titleStyle}>
        {owner} / {repo}
      </h1>
    </header>
  );
}

const headerStyle = css`
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const titleStyle = css`
  font-size: 2rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
`;
