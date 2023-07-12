import { useEffect, useState } from "react";
import { useIssuesContext } from "../../contexts/issues";
import { IssueResponseType } from "issue";

type State = {
  state: IssueResponseType[];
  loading: boolean;
  error: Error | null;
};

function useIssues() {
  const { issuesFetch, issuesOwnerAndRepo, issuesSetUrl } = useIssuesContext();
  const [fetchState, setFetchState] = useState<State>({
    state: [],
    loading: true,
    error: null,
  });
  useEffect(() => {
    issuesFetch()
      .then((response) => {
        setFetchState({ ...fetchState, state: response, loading: false });
      })
      .catch((e) => setFetchState({ ...fetchState, loading: false, error: e }));
  }, [issuesOwnerAndRepo?.owner, issuesOwnerAndRepo?.repo]);
  return {
    state: fetchState.state,
    loading: fetchState.loading,
    error: fetchState.error,
    changeOrgAndRepo: issuesSetUrl,
  };
}

export default useIssues;
