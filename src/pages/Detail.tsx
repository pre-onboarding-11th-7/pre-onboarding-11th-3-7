import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { IssueCard, Layout } from "../components";
import { Avatar } from "../components/Avatar";
import useAnIssue from "../hooks/services/useAnIssue";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PostDetail = () => {
  const { state, error } = useAnIssue();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      return navigate("*");
    }
  }, [error]);
  return (
    <Layout>
      {state ? (
        <>
          <Avatar
            avatarUrl={state.user.avatar_url}
            userName={state.user.login}
          />
          <IssueCard
            author={state.user.login}
            commentsCount={state.comments}
            createdAt={new Date(state.created_at)}
            issueNo={state.number}
            title={state.title}
          />
          <ReactMarkdown children={state.body} />
        </>
      ) : (
        <div>Now Loading...</div>
      )}
    </Layout>
  );
};

export default PostDetail;
