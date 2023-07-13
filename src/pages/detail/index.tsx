import { useDetail } from "../../context/DetailContext";
import { Issue } from "../../@types/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Detail() {
  const detail: Issue = useDetail();

  console.log(detail);
  const body = detail.body;
  return (
    <div>
      {detail && (
        <div>
          <h4>
            #{detail.number}
            {detail.title}
          </h4>
          <span>작성자 {detail.user.login}</span>
          <span>작성일 {detail.created_at}</span>
          <span>코멘트 {detail.comments}</span>
          <div>
            {body && (
              <ReactMarkdown children={body} remarkPlugins={[remarkGfm]} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
