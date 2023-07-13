import { useEffect, useState } from "react";
import { IssueResponseType } from "issue";
import { useAnIssueContext } from "../../contexts/anIssue";
import { useParams } from "react-router-dom";
import { useErrorMessageContext } from "../../contexts/errorMessage";

function useAnIssue() {
  const { number } = useParams<ParamsType>();
  const { anIssueFetch } = useAnIssueContext();
  const { setErrorMsg } = useErrorMessageContext();
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
      .catch((e: Error) => {
        setFetchState({ ...fetchState, loading: false, error: e });
        setErrorMsg(e.message);
      });
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
