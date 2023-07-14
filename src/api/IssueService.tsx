import { HttpClient } from "./httpClient/httpClient";
import { Issue, OwnerRepo } from "../@types/types";

export class IssueService {
  private httpClient: HttpClient;
  private ownerRepo: OwnerRepo;

  constructor(httpClient: HttpClient, ownerRepo: OwnerRepo) {
    this.httpClient = httpClient;
    this.ownerRepo = ownerRepo;
  }
  async getList(pageNum?: number) {
    const { data }: { data: Issue[] } = await this.httpClient.request(
      `/repos/${this.ownerRepo.owner}/${this.ownerRepo.repo}/issues?state=open&sort=comments&per_page=10&page=${pageNum}`,
      "GET"
    );
    return data;
  }

  async getDetail(issueNum?: number) {
    const data = await this.httpClient.request(
      `/repos/${this.ownerRepo.owner}/${this.ownerRepo.repo}/issues/${issueNum}`,
      "GET"
    );
    return data;
  }
}
