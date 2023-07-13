import React from "react";
import { useList } from "../../context/listContext";
import IssueCard from "../IssueCard";
function IssueList() {
  const list = useList();
  return (
    <div>
      {list ? (
        list.map(({ id, title, user, created_at, comments }) => (
          <IssueCard
            key={id}
            title={title}
            userId={user.login}
            created_at={created_at}
            comments={comments}
          />
        ))
      ) : (
        <div>목록이 비었습니다</div>
      )}
    </div>
  );
}

export default IssueList;
