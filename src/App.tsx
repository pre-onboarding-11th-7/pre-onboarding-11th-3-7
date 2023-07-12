import { Banner, IssueCard, Layout } from "./components";
import { ISSUES } from "./mocking/issues";

function App() {
  const mockingData = ISSUES;
  return (
    <Layout>
      <ul>
        {mockingData?.map((issue, idx) => (
          <li key={issue.node_id}>
            {(idx + 1) % 5 ? (
              <IssueCard
                title={issue.title}
                issueNo={issue.number}
                author={issue.user.login}
                createdAt={new Date(issue.created_at)}
                commentsCount={issue.comments}
              />
            ) : (
              <Banner />
            )}
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export default App;
