import { setDateFormat } from "../../utils";

export const IssueCard = ({
  issueNo,
  title,
  author,
  createdAt,
  commentsCount,
}: IssueCard) => {
  return (
    <article className="grid grid-flow-col border-2 border-solid rounded-md py-3 px-2 shadow-md shadow-gray-500 min-h-32 h-32 max-h-32 active:shadow-none">
      <div className="space-y-3 flex flex-col justify-around">
        <h2 className="text-2xl font-semibold">
          #{issueNo} {title}
        </h2>
        <div className="flex justify-start items-center space-x-3 flex-end">
          <div>
            <span>작성자: </span>
            <span>{author},</span>
          </div>
          <div>
            <span>작성일: </span>
            <span>{setDateFormat(createdAt)}</span>
          </div>
        </div>
      </div>
      <div className="self-center place-self-end">
        <span>코멘트: </span>
        <span>{commentsCount}</span>
      </div>
    </article>
  );
};

interface IssueCard {
  issueNo: number;
  title: string;
  author: string;
  createdAt: Date;
  commentsCount: number;
}
