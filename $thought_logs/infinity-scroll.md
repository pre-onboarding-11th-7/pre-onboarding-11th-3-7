# Infinity Scroll

## 1. 데이터 추가

- `fetch`로 받아온 `state`를 담는 배열 생성
- 맨 아래 요소 감지 시 `fetch`
- 기존 배열에 새 `state` 추가
- 감지는 `intersection observe` API 사용

## 2. Data refetching

- 맨 아래 요소 감지 시 `issuesInstance.fetch()` 실행
  - 그 전에 `page` 쿼리를 `+1`해주는 `getNextPage()` 실행
- 패치 동안 `loading` 보여줌
- 기존 렌더링된 컴포넌트는 `memo`로 감싸기

## 3. Intersection Observer

- useInfinityScroll

```ts
function useInfinityScroll({ currentData }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { issuesFetch } = useIssuesContext();
  const { setErrorMsg } = useErrorMessageContext();
  const [state, setState] = useState<{
    item: IssuesResponseType[];
    isLoading: boolean;
    error: Error | null;
  }>({
    item: [...currentData],
    isLoading: false,
    error: null,
  });
  const fetchItems = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      const res = await issuesFetch();
      setState((prev) => ({
        ...prev,
        item: [...prev.item, ...res],
        isLoading: false,
      }));
    } catch (e: Error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: e,
      }));
      setErrorMsg(e.message);
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (targetRef) {
      observer = new IntersectionObserver(
        async ([e], observer) => {
          if (e.isIntersecting) {
            observer.unobserve(e.target);
            await fetchItems();
            observer.observe(e.target);
          }
        },
        { threshold: 1 }
      );
      observer.observe(target.current as Element);
    }
    return () => observer.disconnect();
  }, [targetRef]);

  return [
    targetRef,
    { state: state.item, loading: state.loading, error: state.error },
  ];
}
```

### 변경

- 여러 번 요청을 보내는 현상 발생
- 먼저 받아온 `page=1`의 데이터를 인자로 받지 않고 infinity scroll 훅 내에서 최초 요청 훅 실행
- `targetRef` 요소의 노출 여부에 따라 observer 감지

```diff
- function useInfinityScroll({ currentData }) {
+ function useInfinityScroll() {
+   const { state: initialState, loading: initialLoading } = useIssues();
    const targetRef = useRef<HTMLDivElement>(null);
-   const { issuesFetch } = useIssuesContext();
+   const { issuesFetch, issuesGetNextPage } = useIssuesContext();
    const { setErrorMsg } = useErrorMessageContext();
    const [addFetchState, setAddFetchState] = useState<
    State<IssueResponseType[]>
  >({
    item: [],
    loading: true,
    error: null,
  });

  const fetchItems = async () => {
    setAddFetchState((prev) => ({
      ...prev,
      isLoading: true,
    }));
+   issuesGetNextPage();
    try {
      const res = await issuesFetch();
      setAddFetchState((prev) => ({
        ...prev,
        item: [...prev.item, ...res],
      }));
    } catch (e) {
      const err = e as Error;
      setAddFetchState((prev) => ({
        ...prev,
        error: err,
      }));
      setErrorMsg(err.message);
    } finally {
      setAddFetchState((prev) => ({ ...prev, loading: false }));
    }
  };

+  useEffect(() => {
+    setAddFetchState((prev) => ({
+      ...prev,
+      item: [...initialState],
+      loading: initialLoading,
+    }));
+  }, [initialLoading]);

  useEffect(() => {
-   let observer: IntersectionObserver;
-   if (targetRef) {
    const observer = new IntersectionObserver(
      async ([e], observer) => {
        if (e.isIntersecting) {
          observer.unobserve(e.target);
          await fetchItems();
          observer.observe(e.target);
        }
      },
      { threshold: 1 }
    );
    observer.observe(targetRef.current as Element);
-   }
    return () => observer.disconnect();
  }, [targetRef.current]);

- return [
-   targetRef,
-   { state: state.item, loading: state.loading, error: state.error },
- ];
+  return {
+    targetRef,
+    state: addFetchState.item,
+    loading: addFetchState.loading,
+    error: addFetchState.error,
+  };
}
```

## 고민

- ~~`useInfinityScroll`과 `useIssues`를 어떻게 분리하지?~~
  - 다시 살펴 보니 스크롤과 상관없는 도메인 로직이 다수 포함
  - 도메인 로직은 `useIssues`로 옮김
  - 인자로 콜백 함수를 받아 target 관찰 시 콜백 함수 동작

```tsx
function useInfinityScroll(addFetchFn: AddFetchFn) {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([e], observer) => {
        if (e.isIntersecting) {
          observer.unobserve(e.target);
          await addFetchFn();
          observer.observe(e.target);
        }
      },
      { threshold: 1 }
    );
    observer.observe(targetRef.current as Element);
    return () => observer.disconnect();
  }, [targetRef.current]);

  return targetRef;
}
```
