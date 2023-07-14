import Loading from "../../components/Loading";
import IssueDetail from "../../components/IssueDetail";
import { useIsLoading } from "../../context/LoadingContext";

function Detail() {
  const isLoading = useIsLoading();

  return <div>{!isLoading ? <IssueDetail /> : <Loading />}</div>;
}

export default Detail;
