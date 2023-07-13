import React from "react";
import { useList } from "../../context/listContext";
import IssueCard from "../IssueCard";
import Ad from "../Ad";
function IssueList() {
  const list = useList();
  return (
    <div>
      {list ? (
        list.map(({ id, title, user, created_at, comments }, index) => (
          <React.Fragment key={id}>
            <IssueCard
              title={title}
              userId={user.login}
              created_at={created_at}
              comments={comments}
            />
            {(index + 1) % 5 === 0 && <Ad />}
          </React.Fragment>
        ))
      ) : (
        <div>목록이 비었습니다</div>
      )}
    </div>
  );
}

export default IssueList;
