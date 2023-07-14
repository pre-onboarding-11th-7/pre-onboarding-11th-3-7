const routes = {
  issues: ({ owner, repo }: { owner: string; repo: string }) => `/issues/${owner}/${repo}`,
};

export default routes;
