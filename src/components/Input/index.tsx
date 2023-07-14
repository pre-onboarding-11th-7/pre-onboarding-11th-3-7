import React, { useState } from "react";
import { useOwnerRepo, useSetOwnerRepo } from "../../context/OwnerRepoContext";
import { OwnerRepo } from "../../@types/types";
import { useNavigate } from "react-router-dom";

function Input() {
  const setOwnerRepo = useSetOwnerRepo();
  const ownerRepo = useOwnerRepo();
  const [ownerInput, setOwnerInput] = useState(ownerRepo?.owner || "");
  const [repoInput, setRepoInput] = useState(ownerRepo?.repo || "");
  const navigate = useNavigate();

  const handleClick = () => {
    const newRepo: OwnerRepo = {
      owner: ownerInput,
      repo: repoInput,
    };
    setOwnerRepo?.(newRepo);
    navigate("/list");
  };

  return (
    <div>
      <input
        type="text"
        value={ownerInput}
        onChange={(e) => setOwnerInput(e.target.value)}
        placeholder="Owner"
      />
      <input
        type="text"
        value={repoInput}
        onChange={(e) => setRepoInput(e.target.value)}
        placeholder="Repo"
      />
      <button onClick={handleClick}>Go</button>
    </div>
  );
}

export default Input;
