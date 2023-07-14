import React, { useEffect } from "react";
import { useList } from "../../context/ListContext";
import IssueList from "../../components/IssueList";
import { useInView } from "react-intersection-observer";
import { useSetPageNum } from "../../context/PageNumContext";
import { useIsLoading } from "../../context/LoadingContext";
import Loading from "../../components/Loading";

function List() {
  const list = useList();
  const [ref, inview] = useInView();
  const setPageNum = useSetPageNum();
  const isLoading = useIsLoading();

  useEffect(() => {
    if (list.length !== 0 && inview) {
      setPageNum((prev) => prev + 1);
    }
  }, [inview]);

  return (
    <>
      {!isLoading ? (
        <>
          <IssueList /> <div ref={ref}> 요청</div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default List;
