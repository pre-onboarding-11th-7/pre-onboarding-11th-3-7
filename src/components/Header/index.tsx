import React from "react";
import { useOwnerRepo } from "../../context/OwnerRepoContext";

function Header() {
  const { owner, repo } = useOwnerRepo();

  return (
    <h1>
      {owner}/{repo}
    </h1>
  );
}

export default Header;
