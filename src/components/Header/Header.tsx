import React from "react";
import * as Styled from "./Header.style";

interface IProps {
  organization: string;
  repository: string;
}

export const Header: React.FC<IProps> = ({ organization, repository }) => {
  return (
    <Styled.Container>
      <h1>{`${organization} / ${repository}`}</h1>
    </Styled.Container>
  );
};
