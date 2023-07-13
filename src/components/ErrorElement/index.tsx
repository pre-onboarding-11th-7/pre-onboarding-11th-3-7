export const ErrorElement = ({ errorMsg }: ErrorElement) => {
  return <strong className="text-4xl font-extrabold">{errorMsg}</strong>;
};

interface ErrorElement {
  errorMsg: string;
}
