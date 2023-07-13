import { Link, useParams, useLocation } from "react-router-dom";

export const Header = ({ owner, repo }: HeaderProps) => {
  const params = useParams();
  const { pathname } = useLocation();
  return (
    <header className="text-center dark:text-white fixed top-0 left-0 right-0 backdrop-blur-md py-5">
      {pathname === "/" ? (
        <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
          Enter the desired Owner and Repository
        </h1>
      ) : (
        <Link
          to={".."}
          relative={Object.hasOwn(params, "number") ? "path" : "route"}>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {owner} / {repo}
          </h1>
        </Link>
      )}
    </header>
  );
};

interface HeaderProps {
  owner: string;
  repo: string;
}
