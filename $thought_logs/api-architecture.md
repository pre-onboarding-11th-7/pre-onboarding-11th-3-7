# API Architecture

## 1. Fetch Instance

- `class` 사용하여 `fetch` 인스턴스 구성
- baseUrl : `https://api.github.com/repos/`
- 공용 `headers` 설정

```js
fetch(url, options = {}) {
    return window.fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
          "Content-Type": "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        ...options.headers,
      },
    });
  }
```

## 2. Issues Instance

```js
export class IssuesService {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.owner = "facebook";
    this.repo = "react";
    this.issuesURL = `${issueOpt.owner}/${issueOpt.repo}/issues`
    this.baseQuery = `?sort=comments&page=1`
  }

  get fetchURL() {
    return this.issuesURL;
  }

  set fetchURL(owner, repo) {
    this.owner = owner;
    this.repo = repo
  }

  async fetch() {
    const response = await (await this.httpClient.fetch(this.issuesURL + this.baseQuery)).json();
    // 잘못된 요청 시 response에 message가 담겨 옴
    if (Object.hasOwn(response, "message")){
      throw ...
    }
    return response;
  }
}
```

## 3. Issues Context

- `issues instance` 제공

```js
const IssuesContext = createContext(null);
export const useIssuesContext = () => useContext(IssuesContext);

const IssuesProvider = ({ children, issuesInstance }) => {
  const issuesFetch = issuesInstance.fetch;
  return (
    <IssuesContext.Provider value={issuesInstance}>
      {children}
    </IssuesContext.Provider>
  );
};

export default IssuesProvider;
```

## 3. Issues Request Hook

- ~~issuesUrl : `${owner}/${repo}/issues`~~
- ~~options : `{owner, repo}`~~
- ~~baseQuery : `?sort=comments&page=1`~~
  - `Issues Instance`와 `Issues Context`에서 처리

```js
async function useIssues() {
  const { issuesFetch } = useIssuesContext();
  const { state, loading, error, refetch } = useFetch(issuesInstance);

  useEffect(() => {
    issuesFetch().then(...).catch(...);
  }, [owner, repo]);

  return { state, loading, error, changeOrgAndRepo: setIssueOpt };
}
```

## 4. An Issue Instance

- 리스트를 보여주는 서비스와 개별 이슈 보여주는 서비스는 별개라고 판단하여 분리
- `baseURL` 공유를 위해 `Issues Instance` 상속

```js
export class AnIssueService {
  constructor(httpClient, issuesInstance) {
    this.httpClient = httpClient;
    this.issuesURL = issuesInstance.fetchURL;
    this.issueNumber;
  }

  set issueNumber(issueNumber) {
    this.issueNumber = issueNumber;
  }
  async fetch() {
    const response = await (
      await this.httpClient.fetch(this.issuesURL + "/" + this.issueNumber)
    ).json();

    // Issues와 동일하게 에러 핸들링
    return response;
  }
}
```

## 5. An Issue Context

- `an issue instance` 제공

```js
const AnIssueContext = createContext(null);
export const useAnIssueContext = () => useContext(AnIssueContext);

const AnIssueProvider = ({ children, anIssueInstance }) => {
  const auIssueFetch = anIssueInstance.fetch;
  return (
    <AnIssueContext.Provider value={{ auIssueFetch }}>
      {children}
    </AnIssueContext.Provider>
  );
};

export default AnIssueProvider;
```

## 4. An Issue Request API

- issue number를 param으로 사용
- api 주소는 ~~어떻게?~~ -> `An Issue Context`로 해결
- `react router`의 `useParams`로 이슈 번호 가져옴

```js
async function useAnIssue(issueNumber) {
  const { number } = useParams<ParamsType>();
  const { auIssueFetch } = useAnIssueContext();
  const { state, loading, error } = useFetch(issuesInstance);

  useEffect(() => {
    if (number) {
      auIssueFetch().then(...).catch(...)
    }
  }, [issueOpt.owner, issueOpt.repo]);

  return { state, loading, error };
}
```

## 5. useFetching (**Deprecate**)

### 방법을 좀 더 고민해봐야 할 듯

- 서비스 훅 내에서 API 요청만 담당하는 훅
- 부가적인 params와 query를 인자로 받고 `fetch`함
- state, loading, error를 반환

```ts
async function useFetch(instance) {
  const [fetchState, setFetchState] = useState({
    state: null,
    loading: true,
    error: null,
  });
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  useEffect(() => {
    try {
      const response = await instance.fetch();
      setFetchState({ ...fetchState, state: response, loading: false });
    } catch (e) {
      setFetchState({ ...fetchState, loading: false, error: e });
    }
  }, [refetchingTrigger]);

  return {
    state: fetchState.state,
    loading: fetchState.loading,
    error: fetchState.error,
    refetch: setRefetchTrigger,
  };
}
```
