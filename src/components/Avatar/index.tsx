export const Avatar = ({ avatarUrl, userName }: AvatarProps) => {
  return (
    <picture>
      <img src={avatarUrl} alt={userName} loading="lazy" />
    </picture>
  );
};

interface AvatarProps {
  avatarUrl: string;
  userName: string;
}
