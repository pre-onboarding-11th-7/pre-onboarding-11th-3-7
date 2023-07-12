import React from "react";
import { useList } from "../../context/listContext";

function List() {
  const list = useList();
  console.log(list);
  return <div>list</div>;
}

export default List;
