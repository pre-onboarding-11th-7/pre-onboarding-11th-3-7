import { HttpClient } from "./HttpClient";

export class IssuesService {
  protected readonly httpClient;
  public owner;
  public repo;
  public issuesURL;
  private readonly baseQuery;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.owner = "facebook";
    this.repo = "react";
    this.issuesURL = `${this.owner}/${this.repo}/issues`;
    this.baseQuery = `?sort=comments&page=1`;
  }

  getFetchURL() {
    return this.issuesURL;
  }

  setChangeURL({ owner, repo }: { owner: string; repo: string }) {
    this.owner = owner;
    this.repo = repo;
    this.issuesURL = `${this.owner}/${this.repo}/issues`;
    return this.issuesURL;
  }

  async fetch() {
    const response = await (
      await this.httpClient.fetch(this.issuesURL + this.baseQuery)
    ).json();
    if (Object.hasOwn(response, "message")) {
      throw new Error(response.message);
    }
    return response;
  }
}
