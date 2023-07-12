import { ReactNode } from "react";
import { Header } from "../Header";
import { useIssuesContext } from "../../contexts/issues";

export const Layout = ({ children }: LayoutProps) => {
  const issuesInstance = useIssuesContext();
  return (
    <main>
      <Header
        owner={issuesInstance?.owner ?? "Loading..."}
        repo={issuesInstance?.repo ?? "Loading..."}
      />
      {children}
    </main>
  );
};

interface LayoutProps {
  children: ReactNode;
}
