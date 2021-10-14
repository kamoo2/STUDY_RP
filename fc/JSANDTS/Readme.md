# TypeScript VS JavaScript

- 기존의 JS와 앞으로의 JS에서는 제공될 수 없는 데이터의 유형을 정의해주는 언어 -> TS

### 데이터 유형 정의의 중요성

- 큰 프로젝트를 하게 되었을 때 당연히 개발자의 수도 늘어나고 그렇게 되면 다른 사람의 코드도 내가 사용해야 할 경우가 빈번히 발생한다. 그로써 발생하는 여러가지 에러와 버그를 방지해주는 도움을 준다.

# nodejs & npm

## nodejs

- 일반적으로 JS를 실행시키기 위해서는 브라우저가 필요한데 node를 사용해 줌으로써 브라우저를 실행시키지 않고도 이 컴퓨터 시스템,운영체제에서 실행시킬수 있도록 하는 소프트웨어

## npm

- 아주 간단하게 어떤 기능을 하는 소프트웨어를 터미널에서 즉시 설치를 해서 바로 사용 할 수 있도록 도와준다.
- npmjs 홈페이지에 가보면 수십만개의 다양한 소프트웨어&패키지가 오픈소스로 존재한다.

# Hacker News Client App 만들어보기

Hacker News Client App : 많은 사람들이 직접 뉴스를 올리고 소통하는 어플리케이션 이라고 한다.

목적 : 입력 데이터를 출력 데이터로 변환하는 과정을 알아보기 위함

어플리케이션의 본질은 궁극적으로 입력 데이터를 어떠한 처리 과정을 통해서 출력 데이터로 변환하는 것을 뜻한다.

웹어플리케이션을 만들기 위해서는 입력 데이터가 필요하고 이를 만들기 위해서는 서버가 필요하다.

서버에서 네트워크를 통해 데이터를 보내주고 이를 처리해 아웃풋 출력의 결과물을 보여주는데 이것이 UI가 될 것이다.

바로 이 3가지 구성요소 입력,처리,출력가 온전히 있어야 웹어플리케이션이라고 할 수 있다.

그러나 현재 상태에서 서버를 만들기에는 어려움이 있지만 Hacker News에서는 서버 없이도 우리가 데이터를 받아 볼 수 있기 때문에 이 앱을 선정했다고 한다.

간단 하게 hacker news api를 이용해서 데이터를 전달 받을 수 있다.

# TS 정리

## 🔆 TS 환경설정

기본적으로 parcel을 사용하기 때문에 따로 설정할 것은 tsconfig.json 파일을 생성하고 필요한 설정 속성 작성

tsconfig.json에서 많은 것이 가능하지만 집중해야 할 것은 Compiler Options 이다.

Compiler Options에는 수많은 옵션 속성들이 존재하지만 필요한 것만 몇가지 다뤄보자.

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES5",
    "module": "CommonJS",
    "alwaysStrict": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "sourceMap": true,
    "downlevelIteration": true
  }
}
```

- alwaysStrict : 엄격 모드를 항상 사용하는 것을 의미
- noImplicitAny : JS는 Any라는 타입을 사용했다. 이 타입은 어떠한 타입도 허용하기 때문에 JS는 타입을 보장하지 못했다. 따라서 이 옵션을 걸어주게 되면 Any 타입을 가질 수 없게 해줌으로써 타입 보장을 해준다.
- sourceMap : 소스맵 파일 생성을 활성화 해주면 디버거에서 원본 TS 소스 코드를 표시 할 수 있다. 소스 맵 파일은 출력 파일 옆에 .js.map파일로 내보내 집니다.

## 🔆 변수에 타입 작성하기

타입은 두가지 타입이 존재한다.

1. Primitive Type : string,number,boolean,null,undefined, ...
2. Object Type : 어떤 객체를 만드느냐에 따라서 객체 타입은 달라지기 때문에 객체 타입은 어어어엄청나게 많다.

Object Type의 예) document.getElementById를 이용해 "root"라는 Id를 가지는 Element를 가져올 때

이는 어떤 객체 타입의 객체를 리턴하냐면 HTMLELEMENT | null 을 리턴한다.

즉 HTMLELEMENT 타입의 객체를 리턴하거나 null을 리턴한다.

`const container: HTMLElement | null = document.getElementById("root");`

new XMLHttpRequest()는 다음과 같은 타입을 가진다.

`const ajax: XMLHttpRequest = new XMLHttpRequest();`

다음은 객체에 타입을 지정하고자 하는데 이때 2가지 방법이 있다.

1. Type Alias
2. Interface

Type Alias를 이용한 타입 지정

```ts
type Store = {
  currentPage: number;
  // NewsFeed 타입이 들어가는 배열
  feeds: NewsFeed[];
};

type NewsFeed = {
  id: number;
  comments_count: number;
  url: string;
  user: string;
  time_ago: string;
  points: number;
  title: string;
  read?: boolean; //optional : read 속성은 처음 newsFeed가 만들어지고 나서 후에 추가해준 속성이다. 따라서 처음에는 null이므로 optional 마크를 사용
};

const store: Store = {
  currentPage: 1,
  feeds: [],
};

let newsFeed: NewsFeed[] = store.feeds;
```

## 🚫 Type Guard Function

여기서 container의 타입은 HTMLELEMENT | null 이므로 null 일 수도 있는 변수 이기 때문에 그냥 작성해주면

container.innerHTML에서 에러가 발생한다. null에는 innerHTML property가 존재하지 않기 때문이다.

이런 경우에는 타입 가드 함수를 만들어서 null인 경우에 해야할 동작을 지정 해줘야 한다.

```ts
// 타입 가드 함수
function updateView(html) {
  if (container) {
    container.innerHTML = html;
  } else {
    // root를 id로 가지는 Element가 존재하지 않는 경우 이므로 에러 발생
    console.error("최상위 컨테이너가 없어 UI를 진행하지 못합니다.");
  }
}

updateView(template);
```

## 🔆 함수의 Type

함수에는 인자로 들어가는 값의 타입과 리턴되는 값의 타입을 지정해 줘야한다.

```ts
function test(a: string): string {
  return string;
}
```

위의 코드와 같이 test라는 함수는 인자로 string 유형의 값만 받을 수 있고 리턴값도 string 유형이다.

getData와 같은 함수는 들어오는 url에 따라서 다른 유형을 리턴하는데 그러면 호출하는 곳에서 또 타입가드 함수를 만들어 줘야하는 것일까 ???

그래도 되지만 API가 점점 늘어나게 되면 그 늘어나는 개수 만큼 if~else를 해줘야 하기 때문에 이때 Type Alias의 기능인 **제네릭**을 사용한다.

### 제네릭 ⭐️

제네릭은 입력의 유형이 n개 일때 출력도 n개임을 정의 하는 것을 뜻한다고 한다.

즉 A의 유형이 입력되면 A의 유형이 출력됨을 뜻한다.

이 제네릭은 <> 을 이용해 작성할 수 있는데 예시는 다음과 같다.

일단 NewsFeed라는 유형과 NewsDetail이라는 유형을 만들어논 상태이고 getData는 이 두 유형 중 하나를 리턴하는 상황이다.

```ts
function getData<T>(url:string):T{
  ...
}

// 함수 호출시
const newsFeed = getData<NewsFeed[]>(NEWSFEED_URL)

const newsDetail = getData<NewsDetail>(NEWSDETAIL_URL)

```

위와 같이 함수를 호출 할 때 유형을 전달 받고 이를 사용해 유형을 정의한다. 제네릭 꼭 기억하자 !

### 작명을 생각하면서 하기 ❗️

위에서 제네릭 기능을 사용할 때 T와 같은 의미 없는 작명을 하는 것이 아니라

예를 들면 `AjaxResponse` 와 같이 누가 봐도 이해할 수 있는 좋은 작명을 하는 것이 좋다.

작명을 할 때 생각을 하면서 어떤 이름이 좋은 이름인가를 생각하면서 코딩을 진행 하자.

---

# Commit 목록

## 🔆 Commit 1 - 2021/10/04 14:31

---

### ❗️ KEY POINT

1. XHR을 이용한 데이터 읽어오기
2. DOM API를 이용해 Element 생성하고 추가하여 JS에서 HTML 생성해 기본적인 UI 제작
3. 반복된 코드의 방지
4. 브라우저의 기능 -> Event (hashchange : hash가 변경되었을 때 발생하는 이벤트)를 이용해 item 클릭시 그에 해당하는 함수 실행

### 현재 코드의 문제점

- JS의 DOM API를 이용해 HTML ELEMENT를 생성하고 추가 해주었기 때문에 가독성이 떨어진다.
- 이를 해결하기 위한 방법은 아이러니 하게도 DOM API 사용을 최소화 하는 것
- 즉 문자열을 이용해보면 마크업 구조가 명확하게 그려지는 것을 볼 수 있다. -> innerHTML

## 🔆 Commit 2 - 2021/10/04 16:30

---

### ❗️ KEY POINT

1. DOM API의 사용을 최소화하고 innerHTML을 이용해서 마크업 구조를 더 잘 볼 수 있도록 개선
2. 반복된 코드인 데이터를 가져오고 JSON형태로 변환해주는 코드를 함수로 만들어주는 리펙토링 작업
3. 현재 화면은 2가지 목록화면과 디테일화면이 존재한다. 이를 전환 해주기 위해서는 이 각각의 화면들을 UI로 보여주기 위한 함수를 생성해야 한다. 또한 화면을 컨트롤 해주는 router 함수를 생성해준다.
4. ⭐️⭐️⭐️⭐️⭐️ 기존의 hashchange 이벤트가 발생했을 때 디테일 화면을 보여줬지만 이제는 화면 전환을 해줘야 하기 때문에 hash가 변경 될 때마다 router 함수를 호출한다.
5. Pagination을 만들기 위해서 url의 구조를 재구성 하고 여러가지 고려해야할 사항들을 생각하면서 코딩을 진행했다.
6. currentPage는 공통적으로 사용되어야 하고 이러한 공유되어야 하는 자원들은 하나의 객체로 관리하는 것이 좋기 때문에 store라고하는 객체를 생성해준다.

## 🔆 Commit 3 - 2021/10/09 03:27

---

### ❗️ KEY POINT

1. 기존의 마크업 구조를 template을 이용한 방법으로 변경 -> 기존의 코드보다 더 가독성이 뛰어난 코드
2. tailwindcss,fontAwesome 사용해 UI 입히기
3. 댓글을 만드는 함수 생성하기
4. 댓글을 만드는 함수 생성 시 댓글,대댓글,대대댓글 ... 과 같은 구조를 생각하면 구현하기
5. 이와 같은 구조는 끝을 알 수 없는 구조이므로 재귀 함수를 사용해 구현

### 재귀 함수

재귀 함수를 이용해서 상세 페이지의 댓글 부분 구현하기

현재 하나의 뉴스에서 얻을 수 있는 데이터의 댓글 데이터의 구조는 다음과 같다.

comments가 배열로 존재하고 만약 첫번째 댓글에 대댓글이 존재한다면 comments[0].comments[] 가 존재한다.

이와 같은 구조는 끝을 알 수 없는 구조 이기 때문에 이럴 때 재귀 함수 테크닉이 자주 사용 된다고 한다.

반복적으로 그려보면서 생각을 해보면 이해가 되는 구조 였다.

맨 처음 호출되는 makeComment의 comments는 모든 댓글 중 첫번째 댓글을 배열로 가진다.

이 처음 호출된 makeComment가 리턴되기 전에 다시 한번 호출 되기 때문에 이 makeComment 함수는 잠시 중단되고

새로운 인자를 가진 makeComment가 호출이 된다. 이렇게 반복 되면서 makeComment가 리턴도 반복되고 마지막으로 처음 호출된 makeComment가 리턴될 때 까지 반복되는 것을 볼 수 있다.

```js
function makeComment(comments, called = 0) {
  const commentString = [];

  for (let i = 0; i < comments.length; i++) {
    commentString.push(`
        <div style="padding-left:${called * 40}px;" class="mt-4">
          <div class="text-gray-400">
            <i class="fa fa-sort-up mr-2"></i>
            <strong>${comments[i].user}</strong> ${comments6[i].time_ago}
          </div>
          <p class="text-gray-700">${comments[i].content}</p>
        </div>
      `);

    //재귀 호출
    if (comments[i].comments.length > 0) {
      commentString.push(makeComment(comments[i].comments, called + 1));
    }
  }

  return commentString.join("");
}

container.innerHTML = template.replace(
  "{{__comments__}}",
  makeComment(newsContent.comments)
);
```

## 🔆 Commit 4 - 2021/10/10 17:55

---

### ❗️ KEY POINT

1. 읽은 글 표시하기
2. 읽은 글을 표시하기 위해서 store라는 객체에 feeds라는 빈 배열을 추가해주고 글 목록 페이지가 생성될 때 이 feeds를 가져와 데이터로 사용한다.
3. 그리고 모든 뉴스 Item을 돌면서 read라는 boolean형 속성을 추가해준다.
4. 이 read를 이용해 서로 다른 UI로 표현

## 🔆 Commit 5 - 2021/10/14 19:26

---

### ❗️ 바닐라 JS로 작성한 Hacker News App을 TS로 전환해보기

1. 변수의 타입 작성하기
2. 함수의 규격 작성하기

-
