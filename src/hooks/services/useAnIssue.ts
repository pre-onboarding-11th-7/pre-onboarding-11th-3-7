import { useEffect, useState } from "react";
import { IssueResponseType } from "issue";
import { useAnIssueContext } from "../../contexts/anIssue";
import { useParams } from "react-router-dom";

function useAnIssue() {
  const { number } = useParams<ParamsType>();
  const { anIssueFetch } = useAnIssueContext();
  const [fetchState, setFetchState] = useState<State>({
    state: null,
    loading: true,
    error: null,
  });
  useEffect(() => {
    if (!number) return setFetchState({ ...fetchState, loading: true });
    anIssueFetch(+number)
      .then((response) =>
        setFetchState({ ...fetchState, state: response, loading: false })
      )
      .catch((e) => setFetchState({ ...fetchState, loading: false, error: e }));
  }, [number, fetchState.loading]);
  return {
    state: fetchState.state,
    loading: fetchState.loading,
    error: fetchState.error,
  };
}

export default useAnIssue;

type State = {
  state: IssueResponseType | null;
  loading: boolean;
  error: Error | null;
};

type ParamsType = {
  number: string;
};
