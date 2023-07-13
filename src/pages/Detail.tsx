import { IssueCard, Layout, MarkDownViewer } from "../components";
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
      <article className="p-5 w-full">
        {state ? (
          <div className="flex flex-col items-center space-y-6">
            <div className="grid grid-cols-[max-content_1fr] self-start w-full gap-3">
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
            </div>
            <div className="w-full">
              <MarkDownViewer markdown={state.body} />
            </div>
          </div>
        ) : (
          <div>Now Loading...</div>
        )}
      </article>
    </Layout>
  );
};

export default PostDetail;
