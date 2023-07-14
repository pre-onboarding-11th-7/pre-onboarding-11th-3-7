export interface Issue {
  number: number;
  id: number;
  title: string;
  user: {
    login: string;
    avatar_url: string;
  };
  comments: number;
  created_at: string;
  body: string;
}
