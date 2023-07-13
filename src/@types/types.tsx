export interface Issue {
  number: number;
  title: string;
  user: { login: string };
  created_at: string;
  comments: number;
  body: string;
}
