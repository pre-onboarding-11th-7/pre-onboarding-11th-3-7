import { memo } from "react";
import { Banner, IssueCard, Layout } from "../components";
import useIssues from "../hooks/services/useIssues";
import { Link } from "react-router-dom";
import { IssueResponseType } from "issue";
import useInfinityScroll from "../hooks/useInfinityScroll";

const Home = () => {
  const { issues, loading, onAddFetch } = useIssues();
  const waitingRef = useInfinityScroll(onAddFetch);
  const MemorizedIssueCard = memo((issue: IssueResponseType) => (
    <IssueCard
      title={issue.title}
      issueNo={issue.number}
      author={issue.user.login}
      createdAt={new Date(issue.created_at)}
      commentsCount={issue.comments}
    />
  ));
  return (
    <Layout>
      <ul className="py-5 space-y-4 dark:text-white w-full">
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
          : issues?.map((issue, idx) => (
              <li key={issue.node_id}>
                {(idx + 1) % 5 ? (
                  <Link to={`/${issue.number}`}>
                    <MemorizedIssueCard {...issue} />
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
        <div ref={waitingRef}>{loading ? <div>Loading...</div> : null}</div>
      </ul>
    </Layout>
  );
};

export default Home;
