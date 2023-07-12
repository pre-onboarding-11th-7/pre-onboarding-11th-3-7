declare module "issue" {
  interface IssueResponseType {
    message?: string;
    node_id: string;
    number: number;
    title: string;
    user: {
      login: string;
      avatar_url: string;
    };
    comments: number;
    created_at: string;
    body: string;
  }
}
