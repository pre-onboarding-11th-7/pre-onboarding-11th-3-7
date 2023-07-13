import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

export const MarkDownViewer = ({ markdown }: MarkDownViewerProps) => {
  return (
    <ReactMarkdown
      children={markdown}
      linkTarget={"_blank"}
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-4xl font-extrabold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-3xl font-extrabold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-2xl font-extrabold">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-xl font-extrabold">{children}</h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-lg font-extrabold">{children}</h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-base font-extrabold">{children}</h6>
        ),
        p: ({ children }) => <p className="text-lg">{children}</p>,
        a: ({ children, href }) => (
          <a href={href} className="text-blue-600 underline">
            {children}
          </a>
        ),
        ul: ({ children }) => <ul className="pl-8 ">{children}</ul>,
        li: ({ children }) => <li className="list-disc">{children}</li>,
        hr: () => (
          <hr className="border-t-2 border-solid border-slate-700 h-0 my-3" />
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        strong: ({ children }) => (
          <strong className="font-bold">{children}</strong>
        ),
        blockquote: ({ children }) => (
          <blockquote className="bg-gray-300 my-6 p-4 border-l-[0.25rem] border-solid border-s-[0.25rem]">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <table className="border-2 border-solid">{children}</table>
        ),
        thead: ({ children }) => (
          <thead className="font-bold border-b-4 border-double">
            {children}
          </thead>
        ),
        tr: ({ children }) => (
          <tr className="divide-x divide-solid">{children}</tr>
        ),
        th: ({ children }) => <th className="py-1 px-2">{children}</th>,
        td: ({ children }) => <td className="py-1 px-2">{children}</td>,
        // eslint-disable-next-line unused-imports/no-unused-vars
        code: ({ node, inline, className, children, style, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return !inline || match ? (
            <SyntaxHighlighter
              style={darcula}
              language={match ? match[1] : "language-shell"}
              PreTag={"pre"}
              {...props}>
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              className={[
                className,
                "bg-neutral-800 text-gray-300 px-1.5 py-0.5 rounded-md dark:bg-neutral-400 dark:text-gray-700",
              ].join("")}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};

interface MarkDownViewerProps {
  markdown: string;
}
