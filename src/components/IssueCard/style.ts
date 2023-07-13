import styled from "@emotion/styled";

export const Item = styled.li`
  border-bottom: 2px solid black;
  min-height: 100px;
  padding: 2%;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    min-width: 500px;
  }
`;
