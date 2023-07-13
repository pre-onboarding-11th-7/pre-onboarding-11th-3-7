import React from "react";
import { useList } from "../../context/listContext";
import IssueList from "../../components/IssueList";

function List() {
  const list = useList();
  console.log(list);
  return (
    <div>
      <IssueList />
    </div>
  );
}

export default List;
