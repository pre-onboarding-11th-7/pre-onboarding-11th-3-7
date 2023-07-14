import React from "react";
import * as s from "./style";

function Loading() {
  return (
    <s.Background>
      <img src="/loading.gif" alt="로딩중" width="10%" />
    </s.Background>
  );
}

export default Loading;
