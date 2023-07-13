import { GitHubIssue } from 'github';
import HttpClient from 'lib/HttpClient';

class GitHubIssueRepository extends HttpClient {
  private path;

  private issueListPageNumber = 1;

  private prevIssueListPageNumber = 0;

  constructor({ owner, repo }: { owner: string; repo: string }) {
    super({ isGitHub: true });
    this.path = `/repos/${owner}/${repo}/issues`;
  }

  async getIssueListPage() {
    if (this.prevIssueListPageNumber === this.issueListPageNumber) {
      return [];
    }

    const data = await this.get<GitHubIssue[]>(this.path, {
      params: { sort: 'comments', page: this.issueListPageNumber },
    });

    this.prevIssueListPageNumber = this.issueListPageNumber;
    this.issueListPageNumber += 1;

    return data;
  }

  async getIssue(issueNumber: number) {
    const data = await this.get<GitHubIssue>(`${this.path}/${issueNumber}`);
    return data;
  }
}

export default GitHubIssueRepository;
