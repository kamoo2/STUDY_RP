const container = document.querySelector("#root");
// let : 새로운 값을 넣을 수 있음 const : 새로운 값을 넣을 수 없음 (상수)
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
// 여기서 @id는 마킹을 하는 하나의 방법으로 id부분은 연결된 a태그의 아이템에 따라 달라져야 하기 때문에 마킹을 걸어둔다.
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
ajax.open("GET", NEWS_URL, false);
ajax.send();

// response탭은 문자열로 나와있기 때문에 일렬로 나와있어 보기 불편
// preview탭을 보면 보기 훨씬 편한 것을 알 수 있다.
// 그리고 자바스크립트도 데이터를 사용할 때 preview탭과 같은 데이터 구조를 더 사용하기 편하다.

// JSON.parse : 문자열을 데이터를 json 형태로 변환
const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement("ul");
window.addEventListener("hashchange", function () {
  content.innerHTML = "";
  const id = location.hash.substr(1); // substr은 문자열에서 배열은 0부터 시작하고 1을 적었기 때문에 0번째 문자는 짤리고 1~lastNum 까지의 문자열이 반환된다. 즉 #가 짤려나간다.
  ajax.open("GET", CONTENT_URL.replace("@id", id), false); // replace를 이용해 마킹으로 해논 @id를 location으로 가져온 id로 교체해준다.
  ajax.send();

  const newsContent = JSON.parse(ajax.response);
  const title = document.createElement("h1");
  title.innerHTML = newsContent.title;
  content.appendChild(title);
});

for (let i = 0; i < 10; i++) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = `#${newsFeed[i].id}`;
  a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;
  li.appendChild(a);
  ul.appendChild(li);
}

// 여기서 container로 바꿔준 이유는 document.querySelector("#root")가 반복되기 때문에
// 기본적으로 코드는 반복되면 좋지 않다. 그 이유는 현재 #root를 나무라고 생각하고 그에 파생되는 코드들을 나뭇가지 라고 한다면
// #root를 #app이라던가 다른 이름으로 변경해주게 되면 그에 파생된 나뭇가지들이 많으면 많을수록 모든 코드를 다 바꿔줘야 하기 때문에 좋지 않다.
// 따라서 container를 만들어 줌으로써 이름을 변경해주게 되더라도 container의 #root만 바꿔줌으로써 어떠한 버그도 일어나지 않게 해준다.
// 즉 #root는 나무 container는 연결해주는 커넥터 그에 파생되는 코드는 나뭇가지 라고 보면 될 것 같다.
container.appendChild(ul);
container.appendChild(content);
// 자바스크립트 만으로는 현재 클릭이 되었는지 알 수가 없기 때문에 브라우저의 기능인 이벤트 기능을 사용한다.
