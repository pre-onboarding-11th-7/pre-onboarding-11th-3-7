import React from "react";
import { Issue } from "../../components";
import { useDetail } from "../../contexts";
import * as Styled from "./Detail.style";

export const Detail = () => {
  const { detail, isLoading } = useDetail();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!detail) {
    return <div>데이터가 존재하지 않습니다</div>;
  }

  return (
    <>
      <Styled.Profile>
        <img src={detail.user.avatar_url} alt={detail.user.login} />
        <Issue
          comments={detail.comments}
          created_at={detail.created_at}
          number={detail.number}
          title={detail.title}
          user={detail.user.login}
        />
      </Styled.Profile>
      <p>{detail.body}</p>
    </>
  );
};
