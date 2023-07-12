export class HttpClient {
  protected readonly BASE_URL: string;
  constructor() {
    this.BASE_URL = `https://api.github.com/repos/`;
  }
  fetch(url: string, options: RequestInit = {}) {
    return window.fetch(`${this.BASE_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        ...options.headers,
      },
    });
  }
}
