import React from "react";
import { Issue } from "../Issue";
import { useIssue } from "../../contexts";
import { Advertisement } from "../../components";

export const IssueList = () => {
  const { issues } = useIssue();

  return (
    <div>
      {issues.map((issue, idx) => (
        <>
          <Issue
            key={issue.id}
            comments={issue.comments}
            created_at={issue.created_at}
            number={issue.number}
            title={issue.title}
            user={issue.user.login}
          />
          {(idx + 1) % 5 === 0 && (
            <Advertisement
              key={`ad-${issue.id}`}
              img={
                "https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100"
              }
              link={"https://www.wanted.co.kr/"}
            />
          )}
        </>
      ))}
    </div>
  );
};
