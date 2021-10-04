const container = document.querySelector("#root");
// let : 새로운 값을 넣을 수 있음 const : 새로운 값을 넣을 수 없음 (상수)
const ajax = new XMLHttpRequest();
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
// 여기서 @id는 마킹을 하는 하나의 방법으로 id부분은 연결된 a태그의 아이템에 따라 달라져야 하기 때문에 마킹을 걸어둔다.
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const store = {
  currentPage: 1,
};
function getData(url) {
  ajax.open("GET", url, false);
  ajax.send();
  return JSON.parse(ajax.response);
}

// 글 목록 화면을 보여주는 함수
function newsFeed() {
  const newsFeed = getData(NEWS_URL);
  const newsList = [];

  newsList.push("<ul>");

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
    <li><a href="#/show/${newsFeed[i].id}">${newsFeed[i].title} (${newsFeed[i].comments_count})</a></li>
    `);
  }

  newsList.push("</ul>");
  newsList.push(`
    <div>
      <a href="#/page/${
        store.currentPage === 1
          ? (store.currentPage = 1)
          : store.currentPage - 1
      }">이전 페이지</a>
      <a href="#/page/${
        store.currentPage === 3
          ? (store.currentPage = 3)
          : store.currentPage + 1
      }">다음 페이지</a>
    </div>
  `);
  container.innerHTML = newsList.join("");
}

// 글 디테일 화면을 보여주는 함수
function newsDetail() {
  const id = location.hash.substr(7); // substr은 문자열에서 배열은 0부터 시작하고 1을 적었기 때문에 0번째 문자는 짤리고 1~lastNum 까지의 문자열이 반환된다. 즉 #가 짤려나간다.

  const newsContent = getData(CONTENT_URL.replace("@id", id));
  container.innerHTML = `
      <h1>${newsContent.title}</h1>
      <div>
        <a href="#/page/${store.currentPage}">목록으로</a>
      </div>
    `;
}

// 화면을 중계해주는 함수 (화면 전환을 컨트롤 하는 함수)
function router() {
  const routePath = location.hash;
  // location.hash에 #만 들어있을 때는 빈값이 리턴된다. #이후에 어떠한 값이 들어있어야 #blabla 이러한 값이 리턴된다.
  if (routePath === "") {
    newsFeed();
  } else if (routePath.indexOf("#/page/") >= 0) {
    store.currentPage = Number(routePath.substr(7));
    newsFeed();
  } else {
    newsDetail();
  }
}

window.addEventListener("hashchange", router);

router();
// 자바스크립트 만으로는 현재 클릭이 되었는지 알 수가 없기 때문에 브라우저의 기능인 이벤트 기능을 사용한다.
