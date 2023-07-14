import React from "react";
import { Link } from "react-router-dom";
import * as Styled from "./Advertisement.style";

interface IProps {
  img: string;
  link: string;
}

export const Advertisement: React.FC<IProps> = ({ img, link }) => {
  return (
    <Styled.Container>
      <Link to={link}>
        <img src={img} />
      </Link>
    </Styled.Container>
  );
};
