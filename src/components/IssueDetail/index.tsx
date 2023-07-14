import React from "react";
import { useDetail } from "../../context/DetailContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function IssueDetail() {
  const detail = useDetail();

  return (
    <div>
      {detail && (
        <div>
          <h4>
            #{detail.number}
            {detail.title}
          </h4>
          <span>작성자 {detail.user.login}</span>
          <span>작성일 {detail.created_at}</span>
          <span>코멘트 {detail.comments}</span>
          <div>
            {detail.body && (
              <ReactMarkdown
                children={detail.body}
                remarkPlugins={[remarkGfm]}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default IssueDetail;
