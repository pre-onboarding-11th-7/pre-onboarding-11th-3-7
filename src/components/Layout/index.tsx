import { ReactNode } from "react";
import { Header } from "../Header";
import { useIssuesContext } from "../../contexts/issues";

export const Layout = ({ children }: LayoutProps) => {
  const { issuesOwnerAndRepo } = useIssuesContext();
  const { owner, repo } = issuesOwnerAndRepo();
  return (
    <main className="w-full min-h-screen px-3 py-5 dark:bg-slate-800 dark:text-white h-fit overflow-y-scroll">
      <Header owner={owner} repo={repo} />
      <section className="mt-16 max-w-screen-lg mx-auto h-[80vh]">
        {children}
      </section>
    </main>
  );
};

interface LayoutProps {
  children: ReactNode;
}
