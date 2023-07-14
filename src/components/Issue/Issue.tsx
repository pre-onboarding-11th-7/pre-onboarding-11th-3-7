import React from "react";
import { Link } from "react-router-dom";
import * as Styled from "./Issue.style";

interface Props {
  number: number;
  user: string;
  title: string;
  created_at: string;
  comments: number;
}

export const Issue: React.FC<Props> = ({
  comments,
  created_at,
  number,
  title,
  user,
}) => {
  return (
    <Styled.Container>
      <Styled.Content>
        <h1>
          <span>{`#${number}`}</span>
          <Link to={`/${number}`}>
            <span>{title}</span>
          </Link>
        </h1>
        <ul>
          <li>작성자: {user}</li>
          <li>작성일: {created_at}</li>
        </ul>
      </Styled.Content>
      <div>
        <span>코멘트: {comments}</span>
      </div>
    </Styled.Container>
  );
};
