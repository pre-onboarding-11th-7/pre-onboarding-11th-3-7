import { useEffect, useState } from "react";
import { useIssuesContext } from "../../contexts/issues";
import { IssueResponseType } from "issue";
import { useErrorMessageContext } from "../../contexts/errorMessage";

type State = {
  state: IssueResponseType[];
  loading: boolean;
  error: Error | null;
};

function useIssues() {
  const { issuesFetch, issuesGetNextPage } = useIssuesContext();
  const { setErrorMsg } = useErrorMessageContext();
  const [fetchState, setFetchState] = useState<State>({
    state: [],
    loading: true,
    error: null,
  });
  const [isNowLoading, setIsNowLoading] = useState(false);

  const onAddFetch = async () => {
    if (isNowLoading) {
      return;
    }
    setFetchState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    setIsNowLoading(true);
    issuesGetNextPage();

    try {
      const res = await issuesFetch();
      setFetchState((prev) => ({
        ...prev,
        state: [...prev.state, ...res],
      }));
    } catch (e) {
      const err = e as Error;
      setFetchState((prev) => ({
        ...prev,
        error: err,
      }));
      setErrorMsg(err.message);
    } finally {
      setFetchState((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    setErrorMsg("");
    issuesFetch()
      .then((response) => {
        setFetchState({ ...fetchState, state: response, loading: false });
      })
      .catch((e: Error) => {
        setFetchState({ ...fetchState, loading: false, error: e });
        setErrorMsg(e.message);
      });
  }, []);

  return {
    issues: fetchState.state,
    loading: fetchState.loading,
    error: fetchState.error,
    onAddFetch,
    // TODO : change repo request
  };
}

export default useIssues;
