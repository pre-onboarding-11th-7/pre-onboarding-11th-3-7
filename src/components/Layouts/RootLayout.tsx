import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components";

export const RootLayout = () => {
  const organ = "facebook";
  const repo = "react";
  return (
    <>
      <Header organization={organ} repository={repo} />
      <Outlet />
    </>
  );
};
