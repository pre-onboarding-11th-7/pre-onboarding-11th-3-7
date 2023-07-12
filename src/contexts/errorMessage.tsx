import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

const ErrorMessageContext = createContext<ErrorMsgInterface>({
  errorMsg: "",
  setErrorMsg: () => "",
});
export const useErrorMessageContext = () => useContext(ErrorMessageContext);

const ErrorMsgProvider = ({ children }: ErrorMsgProviderProps) => {
  const [errorMsg, setErrorMsg] = useState("");
  return (
    <ErrorMessageContext.Provider value={{ errorMsg, setErrorMsg }}>
      {children}
    </ErrorMessageContext.Provider>
  );
};

export default ErrorMsgProvider;

interface ErrorMsgProviderProps {
  children: ReactNode;
}

interface ErrorMsgInterface {
  errorMsg: string;
  setErrorMsg: Dispatch<string>;
}
