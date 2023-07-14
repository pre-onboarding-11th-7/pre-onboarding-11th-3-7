import React from "react";
import { DetailProvider } from "../../contexts";
import { Detail } from "../../components";

export const DetailPage = () => {
  return (
    <DetailProvider>
      <Detail />
    </DetailProvider>
  );
};
