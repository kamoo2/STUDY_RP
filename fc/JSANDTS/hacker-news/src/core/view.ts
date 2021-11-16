export default abstract class View {
  private template: string;
  private renderTemplate: string;
  private container: HTMLElement;
  private htmlList: string[];

  constructor(containerId: string, template: string) {
    const containerElement = document.getElementById(containerId);

    // getElementId는 HTMLElement | null을 반환하기 때문에 null인 경우를 따로 처리해줘야 에러가 사라집니다.
    if (!containerElement) {
      throw '최상위 컨테이너가 없어 UI를 진행하지 못합니다.';
    }

    this.container = containerElement;
    this.renderTemplate = template;
    this.template = template;
    this.htmlList = [];
  }

  // 서버와의 통신으로 데이터를 전달 받고 그 데이터를 이용해 변경된 template을 container안에 넣어줘 View를 업데이트 해준다.
  protected updateView(): void {
    this.container.innerHTML = this.renderTemplate;
    this.renderTemplate = this.template;
  }

  protected addHtml(htmlString: string): void {
    this.htmlList.push(htmlString);
  }

  protected getHtml(): string {
    const snapshot = this.htmlList.join('');
    this.clearHtmlList();
    return snapshot;
  }

  protected setTemplateData(key: string, value: string): void {
    this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value);
  }

  private clearHtmlList(): void {
    this.htmlList = [];
  }

  // 추상 메서드로써 View를 부모로 가지는 자식 클래스에서 반드시 해당 메서드를 구현해줘야 함을 명시해줍니다.
  // 추상 메서드는 반드시 클래스가 추상클래스 임을 명시해줘야 합니다.
  abstract render(): void;
}
