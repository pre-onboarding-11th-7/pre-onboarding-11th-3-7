import React from "react";
import * as Styled from "./Header.style";
import { Link } from "react-router-dom";

interface IProps {
  organization: string;
  repository: string;
}

export const Header: React.FC<IProps> = ({ organization, repository }) => {
  return (
    <Styled.Container>
      <Link to={"/"}>
        <h1>{`${organization} / ${repository}`}</h1>
      </Link>
    </Styled.Container>
  );
};
