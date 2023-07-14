import { AxiosInstance } from "axios";
import { Issue } from "../types";

interface IIssueService {
  getAll(page: number, size: number): Promise<Issue[]>;
}

export class IssueService implements IIssueService {
  private httpClient;

  constructor(httpClient: AxiosInstance) {
    this.httpClient = httpClient;
  }

  async getAll(page: number, size: number) {
    const response = await this.httpClient.get<Issue[]>(
      `/issues?sort=comments&page=${page}&per_page=${size}`,
    );
    return response.data;
  }

  async get(issue_number: number) {
    const response = await this.httpClient.get<Issue>(
      `/issues/${issue_number}`,
    );
    return response.data;
  }
}
