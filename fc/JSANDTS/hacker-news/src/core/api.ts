import { NewsFeed, NewsDetail } from './../types';
export class Api {
  ajax: XMLHttpRequest;
  url: string;
  constructor(url: string) {
    this.ajax = new XMLHttpRequest();
    this.url = url;
  }
  // getRequest 메서드는 자식 클래스에서 사용되어야 하는 메서드 이고 사용 되는 자식 클래스에 따라서 다른 객체 타입을 리턴하기 때문에 제네럴 타입을 사용해 줘야 한다.
  protected getRequest<AjaxResponse>(): AjaxResponse {
    this.ajax.open('GET', this.url, false);
    this.ajax.send();
    return JSON.parse(this.ajax.response);
  }
}

export class NewsFeedApi extends Api {
  getData(): NewsFeed[] {
    return this.getRequest<NewsFeed[]>();
  }
}

export class NewsDetailApi extends Api {
  getData(): NewsDetail {
    return this.getRequest<NewsDetail>();
  }
}
