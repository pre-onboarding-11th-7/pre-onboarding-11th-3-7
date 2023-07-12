import { ReactNode } from "react";
import { Header } from "../Header";
import { useIssuesContext } from "../../contexts/issues";

export const Layout = ({ children }: LayoutProps) => {
  const { issuesOwnerAndRepo } = useIssuesContext();
  return (
    <main>
      <Header
        owner={issuesOwnerAndRepo.owner ?? "Loading..."}
        repo={issuesOwnerAndRepo.repo ?? "Loading..."}
      />
      {children}
    </main>
  );
};

interface LayoutProps {
  children: ReactNode;
}
