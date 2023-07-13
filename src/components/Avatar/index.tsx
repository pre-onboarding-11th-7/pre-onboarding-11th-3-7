export const Avatar = ({ avatarUrl, userName }: AvatarProps) => {
  return (
    <figure className="w-32 h-32 rounded-full bg-gray-300">
      <img
        src={avatarUrl}
        alt={userName}
        loading="lazy"
        className="rounded-full"
      />
    </figure>
  );
};

interface AvatarProps {
  avatarUrl: string;
  userName: string;
}
