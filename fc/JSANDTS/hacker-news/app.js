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
  let template = `
    <div class="bg-gray-600 min-h-screen">
      <div class="bg-white text-xl">
        <div class="mx-auto px-4">
          <div class="flex justify-between items-center py-6">
            <h1 class="text-3xl font-extrabold">Hacker News</h1>
            <div>
              <a href="#/page/{{__prev_page__}}" class="text-gray-500 mr-6">Previous</a>
              <a href="#/page/{{__next_page__}}" class="text-gray-500">Next</a>
            </div>
          </div>
        </div>
      </div>
      <div class="text-2xl p-4 text-gray-700">
        {{__news_feed__}}
      </div>
    </div>
  `;

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
    <div class="bg-white mt-6 p-6 rounded-lg shadow-md duration-500 hover:bg-green-100">
      <div class="flex">
        <div class="flex-auto">
          <a href="#/show/${newsFeed[i].id}">${newsFeed[i].title}</a>
        </div>
        <div class="text-center text-sm">
          <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">
            ${newsFeed[i].comments_count}
          </div>
        </div>
      </div>
      <div class="flex mt-3">
        <div class="grid grid-cols-3 text-sm text-gray-500">
          <div><i class="fas fa-user mr-1"></i>${newsFeed[i].user}</div>
          <div><i class="fas fa-heart mr-1"></i>${newsFeed[i].points}</div>
          <div><i class="fas fa-clock mr-1"></i>${newsFeed[i].time_ago}</div>
        </div>
      </div>
    </div>
    `);
  }
  template = template.replace("{{__news_feed__}}", newsList.join(""));
  template = template.replace(
    "{{__prev_page__}}",
    store.currentPage > 1 ? store.currentPage - 1 : 1
  );
  template = template.replace(
    "{{__next_page__}}",
    store.currentPage < 3 ? store.currentPage + 1 : 3
  );
  container.innerHTML = template;
}

// 글 디테일 화면을 보여주는 함수
function newsDetail() {
  const id = location.hash.substr(7); // substr은 문자열에서 배열은 0부터 시작하고 1을 적었기 때문에 0번째 문자는 짤리고 1~lastNum 까지의 문자열이 반환된다. 즉 #가 짤려나간다.
  const newsContent = getData(CONTENT_URL.replace("@id", id));
  let template = `
    <div class ="bg-gray-600 min-h-screen pb-8">
      <div class="bg-white text-xl">
        <div class="mx-auto px-4">
          <div class="flex justify-between items-center py-6">
            <div class="flex justify-start">
              <h1 class="font-extrabold">Hacker News</h1>
            </div>
            <div class="flex items-center justify-end">
              <a href="#/page/${store.currentPage}" class="text-gray-500">
                <i class="fa fa-times"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="h-full border rounded-xl bg-white m-6 p-4">
        <h2>${newsContent.title}</h2>
        <div class="text-gray-400 h-20">
          ${newsContent.content}
        </div>
        {{__comments__}}
      </div>
    </div>
  `;

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
