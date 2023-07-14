# dawnheee/pre-onboarding-11th-3-7

원티드 프리온보딩 인터십 7팀의 3주 차 과제

<img src="https://github.com/dawnheee/pre-onboarding-11th-3-7/assets/99721472/a6288591-e30e-4e88-bf9d-a4df2f82fcf1">

## 요구사항

### 1 이슈 목록 화면

- [x] 이슈 목록 가져오기 API 활용
- [x] open 상태의 이슈 중 코멘트가 많은 순으로 정렬
- [x] 각 행에는 ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트수’를 표시
- [x] 다섯번째 셀에는 광고 이미지 출력
  - ![이미지](https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100)
  - <https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100>
  - 광고 이미지 클릭 시 https://www.wanted.co.kr/ 로 이동
- [x] 화면을 아래로 스크롤 할 시 이슈 목록 추가 로딩(인피니티 스크롤)

### #2 이슈 상세 화면

- [x] 이슈의 상세 내용 표시
- [x] ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트 수, 작성자 프로필 이미지, 본문' 표시

### #3 공통 헤더

- [ ] 두 페이지는 공통 헤더를 공유합니다.
- [x] 헤더에는 Organization Name / Repository Name이 표시됩니다.

### #4 필수 요구 사항

- [x] 이슈 목록 및 상세 화면 기능 구현
- [x] Context API를 활용한 API 연동
- [x] 데이터 요청 중 로딩 표시
- [x] 에러 화면 구현
- [x] 지정된 조건(open 상태, 코멘트 많은 순)에 맞게 데이터 요청 및 표시

## 프레임워크 및 라이브러리

추가적으로 선택하여 사용하였습니다.
</br>`emotion`, `remark-gfm`, `react-intersection-observer`

## 과제 진행 시 주안점 및 개선할 점

**주안점: context API 활용**
</br>

- 데이터 공유: 비동기 로직을 처리하는 과정에서 발생한 데이터를 여러 컴포넌트에서 사용하기 위해 Context Provider를 사용하여 컴포넌트 간에 데이터를 효율적으로 공유하고 동기화하도록 했습니다.

- 로직 분리: Context Provider를 사용하여 비동기 로직을 분리하면, 해당 로직에 대한 추상화와 캡슐화하여 재사용성이 향상되도록 했습니다.

- 의존성 주입: Context Provider를 통해 비동기 로직에 필요한 의존성을 주입하였습니다.

- 컴포넌트 간의 결합도 감소: 로직을 처리하는 컴포넌트가 UI 컴포넌트와 분리되므로, 유지보수와 테스트의 용이성을 높이도록 했습니다.

**개선할 점: 관심사 분리, 요구 사항 미충족**
</br>

- 기능과 뷰 컴포넌트를 완전히 분리하지 못했습니다.

- redux와 context API를 함께 사용하여 비동기 요청 상태, 프론트의 상태를 분리하고자 하였으나 두 기능 모두 미숙하여 context API에 집중하였습니다.

- context API와 Provider 구현에 집중한 나머지 `List`, `Detail` 페이지가 서로 다른 Provider에 종속되어 공통 헤더를 설정하지 못했습니다. 현재 각각 페이지에서 Header 컴포넌트를 렌더링하고 있습니다.

- 무한 스크롤 구현 중 재요청 후 데이터가 추가되면 스크롤이 페이지 맨 위로 올라가는 상태입니다.

- 기능 구현에 집중하여 ui를 구현하지 못했습니다.
