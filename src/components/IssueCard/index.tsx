import React from "react";
interface IssueCardProps {
  title: string;
  userId: string;
  created_at: string;
  comments: number;
}

function IssueCard({ title, userId, created_at, comments }: IssueCardProps) {
  return (
    <div>
      <span>{title}</span>
      <span>{userId}</span>
      <span>{created_at}</span>
      <span>{comments}</span>
    </div>
  );
}

export default IssueCard;
