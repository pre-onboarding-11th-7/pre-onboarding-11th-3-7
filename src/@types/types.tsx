export interface Issue {
  id: number;
  title: string;
  user: { login: string };
  created_at: string;
  comments: number;
}
