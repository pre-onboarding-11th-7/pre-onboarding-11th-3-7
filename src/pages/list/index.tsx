import React, { useEffect } from "react";
import { useList } from "../../context/ListContext";
import IssueList from "../../components/IssueList";
import { useInView } from "react-intersection-observer";
import { useSetPageNum } from "../../context/PageNumContext";

function List() {
  const list = useList();
  const [ref, inview] = useInView();
  const setPageNum = useSetPageNum();

  useEffect(() => {
    if (list.length !== 0 && inview) {
      setPageNum((prev) => prev + 1);
    }
  }, [inview]);
  return (
    <div>
      <IssueList />
      {list.length !== 0 && <div ref={ref}>재요청</div>}
    </div>
  );
}

export default List;
