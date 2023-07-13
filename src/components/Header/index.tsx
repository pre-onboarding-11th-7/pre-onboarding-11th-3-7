import { Link } from "react-router-dom";

export const Header = ({ owner, repo }: HeaderProps) => {
  return (
    <header className="text-center dark:text-white fixed top-0 left-0 right-0 backdrop-blur-md py-5">
      <Link to={"/"}>
        <h1 className="text-5xl font-bold">
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
