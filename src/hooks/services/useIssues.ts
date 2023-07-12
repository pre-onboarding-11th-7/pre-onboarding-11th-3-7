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
  const { issuesFetch, issuesOwnerAndRepo, issuesSetUrl } = useIssuesContext();
  const { setErrorMsg } = useErrorMessageContext();
  const [fetchState, setFetchState] = useState<State>({
    state: [],
    loading: true,
    error: null,
  });
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
  }, [issuesOwnerAndRepo?.owner, issuesOwnerAndRepo?.repo]);
  return {
    state: fetchState.state,
    loading: fetchState.loading,
    error: fetchState.error,
    // TODO : change repo request
    changeOrgAndRepo: issuesSetUrl,
  };
}

export default useIssues;
