import React, { createContext, useContext, useEffect, useState } from "react";
import { IssueService } from "../api/IssueService";
import { getIssueNumber } from "../utils/getIssueNumber";
import { Issue } from "../@types/types";

const initailValue = {
  number: 1,
  title: "title",
  user: { login: "user" },
  created_at: "created at",
  comments: 0,
  body: "body",
};

const DetailContext = createContext<Issue>(initailValue); // 초기값 타입 오류

export const useDetail = () => useContext(DetailContext);

export function DetailProvider({
  children,
  issueService,
}: {
  children: React.ReactNode;
  issueService: IssueService;
}) {
  const [detail, setDetail] = useState(initailValue); // 초기값 타입 오류
  const id = getIssueNumber();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const { data } = await issueService.getDetail(id);
          setDetail(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, []);

  return (
    <DetailContext.Provider value={detail}>{children}</DetailContext.Provider>
  );
}

export default DetailProvider;
