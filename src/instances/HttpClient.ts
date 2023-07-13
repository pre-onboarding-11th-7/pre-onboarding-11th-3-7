export class HttpClient {
  protected readonly BASE_URL: string;
  constructor() {
    this.BASE_URL = `https://api.github.com/repos/`;
  }
  fetch(url: string, options?: RequestInit | undefined) {
    return window.fetch(`${this.BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        authorization: `Bearer ${process.env.REACT_APP_GITHUB_REST_API_TOKEN}`,
        ...options?.headers,
      },
    });
  }
}
