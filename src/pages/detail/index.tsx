import Loading from "../../components/Loading";
import IssueDetail from "../../components/IssueDetail";
import { useIsLoading } from "../../context/LoadingContext";
import Header from "../../components/Header";

function Detail() {
  const isLoading = useIsLoading();

  return (
    <div>
      <Header />
      {!isLoading ? <IssueDetail /> : <Loading />}
    </div>
  );
}

export default Detail;
