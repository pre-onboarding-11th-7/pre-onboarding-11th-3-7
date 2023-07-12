export const ErrorElement = ({ errorMsg }: ErrorElement) => {
  return <strong>{errorMsg}</strong>;
};

interface ErrorElement {
  errorMsg: string;
}
