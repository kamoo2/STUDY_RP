// Type Alias 방식
type Store = {
  currentPage: number;
  // NewsFeed 타입이 들어가는 배열
  feeds: NewsFeed[];
};

type News = {
  id: number;
  time_ago: string;
  user: string;
  title: string;
  url: string;
  content: string;
};

type NewsFeed = News & {
  comments_count: number;
  points: number;
  read?: boolean; //optional
};

type NewsDetail = News & {
  comments: NewsComment[];
};

type NewsComment = News & {
  comments: NewsComment[];
  level: number;
};

const container: HTMLElement | null = document.getElementById("root");
const ajax: XMLHttpRequest = new XMLHttpRequest();
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const store: Store = {
  currentPage: 1,
  feeds: [],
};

function getData<AjaxResponse>(url: string): AjaxResponse {
  // 개발자의 가장 중요한 일 중 하나가 바로 작명이다. 누구나 이해할 수 있도록 좋은 이름을 지정해주는게 좋다.
  // T -> AjaxResponse
  ajax.open("GET", url, false);
  ajax.send();
  // 제네릭 : 입력이 n개의 유형 일 때 출력도 n개의 유형인 것을 정의하는 것
  // 이 함수를 호출하는 쪽에서 유형을 전달해주면 그 유형을 받아서 반환 유형으로 사용하겠다.
  return JSON.parse(ajax.response);
}

function makeFeeds(feeds: NewsFeed[]): NewsFeed[] {
  // 타입 추론
  for (let i = 0; i < feeds.length; i++) {
    feeds[i].read = false;
  }
  return feeds;
}

// 타입 가드 함수
function updateView(html: string): void {
  if (container) {
    container.innerHTML = html;
  } else {
    // root를 id로 가지는 Element가 존재하지 않는 경우 이므로 에러 발생
    console.error("최상위 컨테이너가 없어 UI를 진행하지 못합니다.");
  }
}

// 글 목록 화면을 보여주는 함수
function newsFeed(): void {
  let newsFeed: NewsFeed[] = store.feeds;
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

  if (newsFeed.length === 0) {
    newsFeed = store.feeds = makeFeeds(getData<NewsFeed[]>(NEWS_URL));
  }

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
    <div class="${
      newsFeed[i].read ? "bg-red-500" : " bg-white"
    } mt-6 p-6 rounded-lg shadow-md duration-500 hover:bg-green-100">
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
    String(store.currentPage > 1 ? store.currentPage - 1 : 1)
  );
  template = template.replace(
    "{{__next_page__}}",
    String(store.currentPage < 3 ? store.currentPage + 1 : 3)
  );

  updateView(template);
}

// 글 디테일 화면을 보여주는 함수
function newsDetail(): void {
  const id = location.hash.substr(7); // substr은 문자열에서 배열은 0부터 시작하고 1을 적었기 때문에 0번째 문자는 짤리고 1~lastNum 까지의 문자열이 반환된다. 즉 #가 짤려나간다.
  const newsContent = getData<NewsDetail>(CONTENT_URL.replace("@id", id));
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

  for (let i = 0; i < store.feeds.length; i++) {
    if (store.feeds[i].id === Number(id)) {
      store.feeds[i].read = true;
      break;
    }
  }

  updateView(
    template.replace("{{__comments__}}", makeComment(newsContent.comments))
  );
}

function makeComment(comments: NewsComment[]): string {
  const commentString = [];

  for (let i = 0; i < comments.length; i++) {
    const comment: NewsComment = comments[i];
    commentString.push(`
      <div style="padding-left:${comment.level * 40}px;" class="mt-4">
        <div class="text-gray-400">
          <i class="fa fa-sort-up mr-2"></i>
          <strong>${comment.user}</strong> ${comment.time_ago}
        </div>
        <p class="text-gray-700">${comment.content}</p>
      </div>
    `);

    //재귀 호출
    if (comment.comments.length > 0) {
      commentString.push(makeComment(comment.comments));
    }
  }

  return commentString.join("");
}

// 화면을 중계해주는 함수 (화면 전환을 컨트롤 하는 함수)
function router(): void {
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
