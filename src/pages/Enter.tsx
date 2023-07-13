import { ChangeEvent, FormEvent, useState } from "react";
import { Layout } from "../components";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useIssuesContext } from "../contexts/issues";
import { useNavigate } from "react-router-dom";

const Enter = () => {
  const { issuesSetUrl } = useIssuesContext();
  const [inputValue, setInputValue] = useState({
    owner: "",
    repo: "",
  });
  const navigate = useNavigate();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const onRequestIssues = (e: FormEvent) => {
    e.preventDefault();
    const reqUrl = issuesSetUrl({
      owner: inputValue.owner,
      repo: inputValue.repo,
    });
    navigate(reqUrl);
  };
  return (
    <Layout>
      <form className="space-y-5 p-5 pt-48" onSubmit={onRequestIssues}>
        <Input
          type="text"
          label="Owner"
          name="owner"
          onChange={onChangeInput}
          value={inputValue.owner}
        />
        <Input
          type="text"
          label="Repository"
          name="repo"
          onChange={onChangeInput}
          value={inputValue.repo}
        />
        <Button label="Enter" />
      </form>
    </Layout>
  );
};

export default Enter;
