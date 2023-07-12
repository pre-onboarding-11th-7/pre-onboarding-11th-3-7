export const Header = ({ owner, repo }: HeaderProps) => {
  return (
    <header>
      <h1>
        {owner} / {repo}
      </h1>
    </header>
  );
};

interface HeaderProps {
  owner: string;
  repo: string;
}
