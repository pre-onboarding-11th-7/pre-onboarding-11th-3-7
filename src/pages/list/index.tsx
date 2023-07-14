import React, { useEffect } from "react";
import { useList } from "../../context/ListContext";
import IssueList from "../../components/IssueList";
import { useInView } from "react-intersection-observer";
import { useSetPageNum } from "../../context/PageNumContext";
import Header from "../../components/Header";

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
    <>
      <Header />
      <>
        <IssueList />{" "}
        <div ref={ref}>
          <img src="/loading.gif" />
        </div>
      </>
    </>
  );
}

export default List;
