import { ReactNode, isValidElement, useEffect } from "react";
import { ErrorElement } from "../ErrorElement";
import { useErrorMessageContext } from "../../contexts/errorMessage";
import { Layout } from "../Layout";

export const ErrorBoundary = ({ children }: ErrorBoundary) => {
  const { errorMsg, setErrorMsg } = useErrorMessageContext();

  useEffect(() => {
    return () => setErrorMsg("");
  }, [setErrorMsg]);

  if (errorMsg || !isValidElement(children)) {
    return (
      <Layout>
        <ErrorElement errorMsg={errorMsg} />
      </Layout>
    );
  }

  return children;
};

interface ErrorBoundary {
  children: ReactNode;
}
