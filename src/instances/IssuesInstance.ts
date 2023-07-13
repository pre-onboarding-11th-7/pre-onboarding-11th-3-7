import { HttpClient } from "./HttpClient";

export class IssuesService {
  protected readonly httpClient;
  public owner;
  public repo;
  public issuesURL;
  protected page;
  protected pageQuery;
  private readonly baseQuery;
  private fetchCount;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.owner = "";
    this.repo = "";
    this.issuesURL = `${this.owner}/${this.repo}/issues`;
    this.baseQuery = `?sort=comments`;
    this.page = 1;
    this.pageQuery = `&page=${this.page}`;
    this.fetchCount = 0;
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

  setChangeOwnerAndRepo() {
    return {
      owner: this.owner,
      repo: this.repo,
    };
  }

  getNextPage() {
    this.page = this.page + 1;
    this.pageQuery = `&page=${this.page}`;
    return this.page;
  }

  initializedFetchData() {
    this.page = 1;
    this.pageQuery = `&page=${this.page}`;
    this.fetchCount = 0;
  }

  async fetch() {
    const response = await (
      await this.httpClient.fetch(
        this.issuesURL + this.baseQuery + this.pageQuery
      )
    ).json();
    if (Object.hasOwn(response, "message")) {
      throw new Error(response.message);
    }
    this.fetchCount = this.fetchCount + 1;
    return response;
  }
}
