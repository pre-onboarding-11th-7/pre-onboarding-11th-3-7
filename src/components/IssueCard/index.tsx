export const IssueCard = ({
  issueNo,
  title,
  author,
  createdAt,
  commentsCount,
}: IssueCard) => {
  return (
    <div>
      <div>
        <h2>
          #{issueNo} {title}
        </h2>
        <div>
          <div>
            <span>작성자: </span>
            <span>{author}</span>
          </div>
          <div>
            <span>작성일: </span>
            <span>{createdAt.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <div>
        <span>코멘트: </span>
        <span>{commentsCount}</span>
      </div>
      <hr />
    </div>
  );
};

interface IssueCard {
  issueNo: number;
  title: string;
  author: string;
  createdAt: Date;
  commentsCount: number;
}
