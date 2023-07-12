import { Link } from "react-router-dom";

export const Header = ({ owner, repo }: HeaderProps) => {
  return (
    <header>
      <Link to={"/"}>
        <h1>
          {owner} / {repo}
        </h1>
      </Link>
    </header>
  );
};

interface HeaderProps {
  owner: string;
  repo: string;
}
