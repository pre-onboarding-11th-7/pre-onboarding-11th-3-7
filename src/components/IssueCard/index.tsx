import React from "react";
import * as s from "./style";

interface IssueCardProps {
  title: string;
  userId: string;
  created_at: string;
  comments: number;
}

function IssueCard({ title, userId, created_at, comments }: IssueCardProps) {
  return (
    <s.Item>
      <h3>{title}</h3>
      <div>
        <span>작성자 {userId}</span>
        <span>작성일: {created_at}</span>
        <span>댓글 수: {comments}</span>
      </div>
    </s.Item>
  );
}

export default IssueCard;
