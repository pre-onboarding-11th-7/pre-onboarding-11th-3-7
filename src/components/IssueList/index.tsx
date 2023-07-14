import React from "react";
import { useList } from "../../context/ListContext";
import IssueCard from "../IssueCard";
import Ad from "../Ad";
function IssueList() {
  const list = useList();

  return (
    <ul>
      {list ? (
        list.map(({ title, user, created_at, comments, number }, index) => (
          <React.Fragment key={index}>
            <IssueCard
              number={number}
              title={title}
              userId={user.login}
              created_at={created_at}
              comments={comments}
            />
            {(index + 1) % 5 === 0 && <Ad />}
          </React.Fragment>
        ))
      ) : (
        <div>ISSUE가 없습니다</div>
      )}
    </ul>
  );
}

export default IssueList;
