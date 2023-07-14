import { useParams } from "react-router-dom";

export const getIssueNumber = () => {
  const { id } = useParams();

  const numbericId = Number(id);
  return numbericId;
};
