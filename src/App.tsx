import { Banner, IssueCard, Layout } from "./components";
import useIssues from "./hooks/services/useIssues";
import { Link } from "react-router-dom";

function App() {
  const { state, loading } = useIssues();
  return (
    <Layout>
      <ul>
        {loading
          ? Array(20)
              .fill(0)
              .map((_, idx) => (
                <li key={idx}>
                  <IssueCard
                    title={"Loading..."}
                    issueNo={0}
                    author={"Loading..."}
                    createdAt={new Date("0000-00-00")}
                    commentsCount={0}
                  />
                </li>
              ))
          : state?.map((issue, idx) => (
              <li key={issue.node_id}>
                {(idx + 1) % 5 ? (
                  <Link to={`/${issue.number}`}>
                    <IssueCard
                      title={issue.title}
                      issueNo={issue.number}
                      author={issue.user.login}
                      createdAt={new Date(issue.created_at)}
                      commentsCount={issue.comments}
                    />
                  </Link>
                ) : (
                  <Link
                    to="https://wanted.co.kr"
                    target="_blank"
                    rel="noopener noreferrer">
                    <Banner />
                  </Link>
                )}
              </li>
            ))}
      </ul>
    </Layout>
  );
}

export default App;
