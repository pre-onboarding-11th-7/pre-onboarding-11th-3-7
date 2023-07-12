import colors from 'constants/colors';

interface HeaderProps {
  owner: string;
  repo: string;
}

export function Header({ owner, repo }: HeaderProps) {
  return (
    <header css={{ padding: '20px', background: colors.background, position: 'fixed', top: 0, left: 0, right: 0 }}>
      <h1
        css={{
          fontSize: '2rem',
          fontWeight: 700,
          textAlign: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          ['@media screen and (max-width: 480px)']: {
            fontSize: ' 1.5rem',
          },
        }}
      >
        {owner} / {repo}
      </h1>
    </header>
  );
}
