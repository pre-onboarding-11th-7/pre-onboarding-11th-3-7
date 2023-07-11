# Task Architecture

## 1. 컴포넌트 구조

### 1-1. Home

#### Issues List

```jsx
<Layout>
  <Main>
    <ListItem
      key={node_id}
      issueNo={number}
      title={title}
      author={user.login}
      createdAt={created_at}
      commentsCount={comments}
    />
    <ListItem />
    <ListItem />
    <ListItem />
    <Banner />
    <ListItem />
    <ListItem />
    <ListItem />
    <ListItem />
    <Banner />
    <ListItem />
    {/* more component */}
  </Main>
</Layout>
```

#### Banner

```jsx
<BannerWrapper>
  <img src="wanted-logo-url" loading="lazy" />
</BannerWrapper>
```

### 1-2. Detail

#### PostDetail

```jsx
<Layout>
  <Main>
    <Avatar />
    <ListItem
      key={node_id}
      issueNo={number}
      title={title}
      author={user.login}
      createdAt={created_at}
      commentsCount={comments}
    />
    <MarkdownRenderer />
  </Main>
</Layout>
```

### 1-3. Common

#### Layout

```jsx
<main>
  <Header />
  {children}
</main>
```

#### Header

```jsx
<HeaderWrapper>
  <h1>
    {owner} / {repo}
  </h1>
</HeaderWrapper>
```

#### ListITem

```jsx
<ListItemWrapper>
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
        <span>{createdAt}</span>
      </div>
    </div>
  </div>
  <div>
    <span>코멘트: </span>
    <span>{commentsCount}</span>
  </div>
  <hr />
</ListItemWrapper>
```
