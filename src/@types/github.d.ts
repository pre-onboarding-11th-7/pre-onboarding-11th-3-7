declare module 'github' {
  interface GitHubUser {
    id: string;
    login: string; // name
    avatar_url: string;
  }

  interface GitHubIssue {
    id: string;
    title: string;
    html_url: string;
    number: number;
    comments: number;
    created_at: string;
    body: string;
    user: GitHubUser;
  }
}
