import React, { useEffect } from "react";
import { useSetList } from "../../context/listContext";
import { useList } from "../../context/listContext";
import IssueList from "../../components/IssueList";
import { useInView } from "react-intersection-observer";
import { Issue } from "../../@types/types";
function List() {
  const list = useList();
  const setList = useSetList();
  const [ref, inview] = useInView();

  const issue: Issue = {
    id: 222,
    title: "gkgk",
    user: { login: "gkgk" },
    created_at: "ddd",
    comments: 555,
  };
  const issue2: Issue = {
    id: 232,
    title: "gkgk",
    user: { login: "한규k" },
    created_at: "ddd",
    comments: 555,
  };
  const arr: Issue[] = [issue, issue2];

  // inview 받아와서 useEffect로 객체 추가 요청, list에 저장
  useEffect(() => {
    if (list.length !== 0 && inview) {
      console.log(inview, "무한 스크롤 요청");
      if (setList) {
        setList([...list, ...arr]);
      }
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
